
import { Post } from '../types';

interface StatusItem {
  title: string;
  detail: string;
}

export interface BlogManifest {
  status: {
    building: StatusItem;
    learning: StatusItem;
    writing: StatusItem;
  };
  categories: {
    name: string;
    posts: {
      filename: string;
      summary: string;
      date?: string;
    }[];
  }[];
}

async function getManifest(): Promise<BlogManifest> {
  const paths = [
    '/myblog/manifest.json',
    'myblog/manifest.json',
    './myblog/manifest.json'
  ];

  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      continue;
    }
  }
  return { status: { building: { title: '', detail: '' }, learning: { title: '', detail: '' }, writing: { title: '', detail: '' } }, categories: [] };
}

export async function fetchBlogManifest(): Promise<BlogManifest> {
  return await getManifest();
}

export async function fetchAllPosts(): Promise<Post[]> {
  const manifest = await getManifest();
  const allPosts: Post[] = [];

  manifest.categories.forEach(catGroup => {
    catGroup.posts.forEach(postItem => {
      const displayTitle = postItem.filename.replace(/-/g, ' ');
      const categoryPath = encodeURIComponent(catGroup.name);
      const fileSlot = encodeURIComponent(postItem.filename);
      const rawUrl = `/myblog/${categoryPath}/${fileSlot}.md`;

      allPosts.push({
        slug: postItem.filename,
        category: catGroup.name,
        title: displayTitle,
        date: postItem.date || "Archive Entry",
        tags: [],
        summary: postItem.summary,
        content: '',
        rawUrl: rawUrl,
        path: `${catGroup.name}/${postItem.filename}.md`
      });
    });
  });

  return allPosts;
}

export async function fetchPostContent(category: string, slug: string): Promise<Post | null> {
  try {
    const manifest = await getManifest();
    const catData = manifest.categories.find(c => c.name === category);
    const postData = catData?.posts.find(p => p.filename === slug);

    const encodedCategory = encodeURIComponent(category);
    const encodedSlug = encodeURIComponent(slug);
    const primaryUrl = `/myblog/${encodedCategory}/${encodedSlug}.md`;
    
    const response = await fetch(primaryUrl);
    if (!response.ok) throw new Error("Not found");
    
    const content = await response.text();
    return {
      slug,
      category,
      title: slug.replace(/-/g, ' '),
      date: postData?.date || "Archive Entry",
      tags: [],
      summary: postData?.summary || "",
      content: content,
      rawUrl: primaryUrl,
      path: `${category}/${slug}.md`
    };
  } catch (e) {
    return null;
  }
}
