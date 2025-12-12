
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  highlight?: boolean;
}

export interface PackageItem {
  id: string;
  title: string;
  price: number;
  turnaround: string;
  features: string[];
  platform: 'Instagram' | 'Facebook' | 'WhatsApp' | 'Bundle' | 'All';
  highlight?: boolean;
}

export interface VerificationFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  targetUrl: string;
  notes: string;
  packageId: string;
  bmId: string;
  isAdmin: boolean;
}

export interface AiCopyResult {
  text: string;
}

export enum ViewMode {
    HOME = 'HOME',
    TOOLS_DASHBOARD = 'TOOLS_DASHBOARD',
    REPO_ANALYZER = 'REPO_ANALYZER',
    ARTICLE_INFOGRAPHIC = 'ARTICLE_INFOGRAPHIC',
    DEV_STUDIO = 'DEV_STUDIO',
    IMAGE_EDITOR = 'IMAGE_EDITOR',
    FASHION_STUDIO = 'FASHION_STUDIO',
    ANALYTICS = 'ANALYTICS',
    TRENDS = 'TRENDS',
    ADMIN = 'ADMIN'
}

export interface RepoFileTree {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url: string;
}

export interface Citation {
    uri: string;
    title?: string;
}

export interface ArticleHistoryItem {
    id: string;
    title: string;
    url: string;
    imageData: string;
    citations: Citation[];
    date: Date;
}

export interface RepoHistoryItem {
    id: string;
    repoName: string;
    imageData: string;
    is3D: boolean;
    style: string;
    date: Date;
}

export interface D3Node {
  id: string;
  label: string;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;
  vx?: number;
  vy?: number;
}

export interface D3Link {
  source: string | D3Node;
  target: string | D3Node;
  value: number;
  index?: number;
}

export interface DataFlowGraph {
  nodes: D3Node[];
  links: D3Link[];
}

export interface DevStudioState {
    repoName: string;
    fileTree: RepoFileTree[];
    graphData: DataFlowGraph;
}

// Fashion Studio Types
export type FashionTier = 'Free' | 'Pro' | 'Ultra';
export type ModelType = 'Female' | 'Male' | 'Diverse' | 'Mannequin';
export type BackgroundType = 'Studio White' | 'Urban Street' | 'Luxury Interior' | 'Beach';

export interface FashionJob {
    id: string;
    originalImage: string;
    generatedImage?: string;
    generatedVideo?: string; // URL to video
    status: 'queue' | 'processing' | 'completed' | 'failed';
    type: 'image' | 'video';
}

export interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string[]; // Array of paragraphs
    category: string;
    date: string;
    author: string;
    tags: string[];
    image: string;
    type?: 'article' | 'voice';
    audioUrl?: string;
    views?: number;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}
