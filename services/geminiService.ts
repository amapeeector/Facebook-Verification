
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { RepoFileTree, Citation, ModelType, BackgroundType } from "../types";

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateMarketingCopy(
  brandName: string,
  niche: string,
  type: 'bio' | 'caption' | 'ad'
): Promise<string> {
  await delay(1500);
  if (type === 'bio') {
    return `🚀 Official ${brandName} | Leading ${niche} Authority\n✨ Verified & Trusted Services\n👇 Start Your Journey Here`;
  } else if (type === 'caption') {
    return `Big news coming soon! 🌟 ${brandName} is redefining the ${niche} landscape. Stay tuned for our latest updates. #Verified #${brandName} #Growth`;
  } else {
    return `Unlock Your Potential with ${brandName}. The premier solution for ${niche} professionals. Verified Results. Sign up today!`;
  }
}

export async function generateArticleInfographic(
    url: string,
    style: string,
    onProgress: (stage: string) => void,
    language: string
): Promise<{ imageData: string; citations: Citation[] }> {
    onProgress('CONNECTING_TO_SOURCE');
    await delay(1000);
    onProgress('ANALYZING_CONTENT_STRUCTURE');
    await delay(1500);
    onProgress('SYNTHESIZING_VISUALS');
    await delay(1000);

    // Return a high-quality abstract tech infographic from Unsplash
    const imageData = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80";
    
    const citations: Citation[] = [
        { uri: url, title: "Source Article Verification" },
        { uri: "https://meta.com/news", title: "Meta Official Newsroom" }
    ];

    return { imageData, citations };
}

export async function generateInfographic(
    repoName: string,
    fileTree: RepoFileTree[],
    style: string,
    is3D: boolean,
    language: string
): Promise<string> {
    await delay(3000); // Simulate processing time

    if (is3D) {
        // 3D/Holographic style image
        return "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80";
    }
    
    // 2D Diagram style image
    return "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=1200&q=80";
}

export async function editImageWithGemini(
    imageData: string,
    mimeType: string,
    prompt: string
): Promise<string> {
    await delay(2500);
    // Return a processed-looking cyberpunk/tech image
    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80";
}

export async function askNodeSpecificQuestion(
    nodeLabel: string,
    question: string,
    context: RepoFileTree[]
): Promise<string> {
    await delay(1000);
    return `Analysis of ${nodeLabel}: This component appears to be a core architectural module handling state management and data flow. Based on the file structure, it likely interfaces with the main service layer to retrieve asynchronous data. Optimization recommendation: Consider memoizing the data parsing logic to reduce re-render cycles.`;
}

// --- Fashion Studio Functions ---

export async function generateVirtualTryOn(
    productImageBase64: string,
    modelType: ModelType,
    background: BackgroundType,
    isUltra: boolean
): Promise<string> {
    await delay(3000);
    // Return a high-fashion model image
    return "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80";
}

export async function generateFashionVideo(
    modelImageBase64: string,
    isUltra: boolean
): Promise<string> {
    await delay(4000);
    // Return a sample fashion video URL (using a reliable placeholder video source)
    return "https://videos.pexels.com/video-files/5309381/5309381-hd_1080_1920_25fps.mp4";
}
