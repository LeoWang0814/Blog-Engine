
export interface PostMetadata {
  title: string;
  date?: string;
  tags?: string[];
  summary?: string;
  cover?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  category: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  rawUrl: string;
  path: string;
}

export interface CategoryInfo {
  name: string;
  count: number;
}
