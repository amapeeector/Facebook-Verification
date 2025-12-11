
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI } from "@google/genai";
import { RepoFileTree, Citation, ModelType, BackgroundType } from "../types";

const getAiClient = () => {
  // Use bracket notation to safely access the API key. 
  // This prevents build tools from injecting the key as an unquoted identifier
  // which causes ReferenceErrors (e.g., "AIza... is not defined").
  const apiKey = process.env['API_KEY'];
  return new GoogleGenAI({ apiKey: apiKey });
};

export async function generateMarketingCopy(
  brandName: string,
  niche: string,
  type: 'bio' | 'caption' | 'ad'
): Promise<string> {
  const ai = getAiClient();
  
  let prompt = "";
  if (type === 'bio') {
    prompt = `Write a professional, high-converting Instagram bio for a brand called "${brandName}" in the "${niche}" niche. Include line breaks, relevant emojis, and a strong call to action. Keep it under 150 characters.`;
  } else if (type === 'caption') {
    prompt = `Write a viral, engaging Instagram caption for "${brandName}" (${niche}) announcing a new service launch. Use a hook, value proposition, and call to action.`;
  } else {
    prompt = `Write a short, punchy Facebook ad headline and primary text for "${brandName}" focusing on "${niche}".`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate copy.";
  } catch (error) {
    console.error("Gemini copy generation failed:", error);
    return "Generation failed. Please ensure you have selected a valid API Key.";
  }
}

export async function generateArticleInfographic(
    url: string,
    style: string,
    onProgress: (stage: string) => void,
    language: string
): Promise<{ imageData: string; citations: Citation[] }> {
    const ai = getAiClient();
    onProgress('SEARCHING_AND_ANALYZING');

    const model = 'gemini-3-pro-image-preview';
    const prompt = `
      Analyze the content from this URL: ${url}.
      Create a comprehensive infographic that summarizes the key information.
      Style: ${style}.
      Language: ${language}.
      Ensure the infographic is visually structured and easy to read.
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                imageConfig: {
                    aspectRatio: "3:4",
                    imageSize: "1K"
                }
            }
        });

        let imageData = "";
        let citations: Citation[] = [];

        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    imageData = part.inlineData.data;
                }
            }
        }

        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks) {
            citations = chunks
                .filter((c: any) => c.web)
                .map((c: any) => ({ uri: c.web.uri, title: c.web.title }));
        }

        if (!imageData) {
            throw new Error("Failed to generate infographic. The model might have refused the request or failed to access the URL.");
        }

        return { imageData, citations };
    } catch (error) {
        console.error("Gemini Article Infographic failed:", error);
        throw error;
    }
}

export async function generateInfographic(
    repoName: string,
    fileTree: RepoFileTree[],
    style: string,
    is3D: boolean,
    language: string
): Promise<string> {
    const ai = getAiClient();
    const model = 'gemini-3-pro-image-preview';

    // Summarize structure to fit context efficiently
    const structure = fileTree.slice(0, 150).map(f => f.path).join('\n');
    
    const prompt = `
        Generate a ${is3D ? '3D holographic' : '2D technical'} infographic/diagram for the codebase structure of "${repoName}".
        Files (partial list):
        ${structure}
        
        Style: ${style}.
        Language: ${language}.
        Visualize the modules, data flow, and architecture.
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                imageConfig: {
                    aspectRatio: is3D ? "16:9" : "4:3",
                    imageSize: "1K"
                }
            }
        });

        let imageData = "";
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    imageData = part.inlineData.data;
                }
            }
        }

        if (!imageData) throw new Error("Failed to generate image.");
        return imageData;
    } catch (error) {
        console.error("Gemini Repo Infographic failed:", error);
        throw error;
    }
}

export async function editImageWithGemini(
    imageData: string,
    mimeType: string,
    prompt: string
): Promise<string> {
    const ai = getAiClient();
    const model = 'gemini-2.5-flash-image';

    try {
        const response = await ai.models.generateContent({
            model,
            contents: {
                parts: [
                    { inlineData: { mimeType, data: imageData } },
                    { text: prompt }
                ]
            }
        });

        let resultData = "";
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    resultData = part.inlineData.data;
                }
            }
        }
        
        if (!resultData) throw new Error("Failed to edit image.");
        return resultData;
    } catch (error) {
        console.error("Gemini Image Edit failed:", error);
        throw error;
    }
}

export async function askNodeSpecificQuestion(
    nodeLabel: string,
    question: string,
    context: RepoFileTree[]
): Promise<string> {
    const ai = getAiClient();
    const model = 'gemini-3-pro-preview';
    
    const contextStr = context.slice(0, 200).map(f => f.path).join('\n');
    const prompt = `
        Codebase Context (Files):
        ${contextStr}
        
        The user is asking about a specific component or node labeled: "${nodeLabel}".
        Question: ${question}
        
        Provide a concise, expert technical answer.
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        return response.text || "No response generated.";
    } catch (error) {
        console.error("Gemini Q&A failed:", error);
        return "Sorry, I encountered an error processing your request.";
    }
}

// --- Fashion Studio Functions ---

export async function generateVirtualTryOn(
    productImageBase64: string,
    modelType: ModelType,
    background: BackgroundType,
    isUltra: boolean
): Promise<string> {
    const ai = getAiClient();
    // Use Pro Image Preview for high fidelity fashion rendering
    const model = 'gemini-3-pro-image-preview'; 

    const prompt = `
        Professional Fashion Photography.
        Task: Create a hyper-realistic Virtual Try-On image.
        
        Input: I have provided an image of a clothing item.
        Action: Generate a full-body shot of a professional ${modelType} fashion model wearing this exact clothing item.
        
        Requirements:
        1. The clothing must retain its exact color, texture, and pattern from the input.
        2. Fit: The clothing should fit the model naturally and realistically.
        3. Background: ${background}. High-end commercial lighting.
        4. Quality: 4k resolution, editorial fashion magazine style.
        ${isUltra ? '5. Ultra-High detail on fabric physics and lighting reflections.' : ''}
    `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: productImageBase64 } },
                    { text: prompt }
                ]
            },
            config: {
                imageConfig: {
                    aspectRatio: "3:4", // Portrait for fashion
                    imageSize: isUltra ? "2K" : "1K"
                }
            }
        });

        let imageData = "";
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData && part.inlineData.data) {
                    imageData = part.inlineData.data;
                }
            }
        }
        
        if (!imageData) throw new Error("Failed to generate fashion image.");
        return imageData;

    } catch (error) {
        console.error("Fashion VTO failed:", error);
        throw error;
    }
}

export async function generateFashionVideo(
    modelImageBase64: string,
    isUltra: boolean
): Promise<string> {
    const ai = getAiClient();
    // Use VEO model
    const modelName = isUltra ? 'veo-3.1-generate-preview' : 'veo-3.1-fast-generate-preview';
    const prompt = "Cinematic fashion runway shot. The model is walking confidently towards the camera. High fashion, slow motion, fabric flowing naturally. Commercial lighting.";

    try {
        // Veo requires base64 of the starting image
        let operation = await ai.models.generateVideos({
            model: modelName,
            prompt: prompt,
            image: {
                imageBytes: modelImageBase64,
                mimeType: 'image/png' // Assuming the generated image is PNG-compatible
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '9:16' // Vertical video for social media
            }
        });

        // Poll for completion
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
            operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!videoUri) throw new Error("Video generation completed but returned no URI.");

        // Append key for frontend access if needed, though usually fetched via proxy or direct link
        // Note: In a browser environment, we return the URI. The frontend might need to proxy this or fetch with header.
        // For this demo, we assume the URI is accessible with the key appended or via the client context.
        return `${videoUri}&key=${process.env['API_KEY']}`;

    } catch (error) {
        console.error("Fashion Video generation failed:", error);
        throw error;
    }
}
