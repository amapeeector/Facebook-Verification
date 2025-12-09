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
}

export interface AiCopyResult {
  text: string;
}

export enum ViewMode {
    HOME = 'HOME',
    REPO_ANALYZER = 'REPO_ANALYZER',
    ARTICLE_INFOGRAPHIC = 'ARTICLE_INFOGRAPHIC',
    DEV_STUDIO = 'DEV_STUDIO',
    IMAGE_EDITOR = 'IMAGE_EDITOR'
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

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
  }
}