
import { Post } from '../types';

interface ManifestPost {
  filename: string;
  summary: string;
  date?: string;
}

interface ManifestCategory {
  name: string;
  posts: ManifestPost[];
}

interface BlogManifest {
  categories: ManifestCategory[];
}

/**
 * Fetches the manifest file to understand the current blog structure.
 */
async function getManifest(): Promise<BlogManifest> {
  try {
    const response = await fetch('./myBlog/manifest.json');
    if (!response.ok) throw new Error("Manifest not found");
    return await response.json();
  } catch (e) {
    console.error("Failed to load blog manifest:", e);
    return { categories: [] };
  }
}

/**
 * Returns metadata for all posts from the manifest.
 */
export async function fetchAllPosts(): Promise<Post[]> {
  const manifest = await getManifest();
  const allPosts: Post[] = [];

  manifest.categories.forEach(catGroup => {
    catGroup.posts.forEach(postItem => {
      // Convert hyphens to spaces for the displayed title
      const displayTitle = postItem.filename.replace(/-/g, ' ');
      
      allPosts.push({
        slug: postItem.filename,
        category: catGroup.name,
        title: displayTitle,
        date: postItem.date || "Archive Entry",
        tags: [],
        summary: postItem.summary,
        content: '',
        rawUrl: `./myBlog/${encodeURIComponent(catGroup.name)}/${encodeURIComponent(postItem.filename)}.md`,
        path: `${catGroup.name}/${postItem.filename}.md`
      });
    });
  });

  return allPosts;
}

/**
 * Fetches the full content of a specific post by its category and filename.
 */
export async function fetchPostContent(category: string, slug: string): Promise<Post | null> {
  try {
    const manifest = await getManifest();
    const catData = manifest.categories.find(c => c.name === category);
    const postData = catData?.posts.find(p => p.filename === slug);

    const encodedCategory = encodeURIComponent(category);
    const encodedSlug = encodeURIComponent(slug);
    const url = `./myBlog/${encodedCategory}/${encodedSlug}.md`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Markdown file not found at ${url}`);
    
    const content = await response.text();
    
    return {
      slug,
      category,
      title: slug.replace(/-/g, ' '),
      date: postData?.date || "Archive Entry",
      tags: [],
      summary: postData?.summary || "",
      content: content,
      rawUrl: url,
      path: `${category}/${slug}.md`
    };
  } catch (e) {
    console.error(`Error loading local post: ${category}/${slug}`, e);
    return null;
  }
}
