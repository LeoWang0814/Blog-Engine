
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
 * Robust fetch for the manifest that tries multiple common path patterns
 * to handle different deployment environments (root vs sub-path).
 */
async function getManifest(): Promise<BlogManifest> {
  const paths = [
    'myBlog/manifest.json',
    './myBlog/manifest.json',
    '/myBlog/manifest.json'
  ];

  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      // Continue to next path if fetch fails
      continue;
    }
  }

  console.error("Critical: Failed to load blog manifest from any known path.");
  return { categories: [] };
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
      
      const categoryPath = encodeURIComponent(catGroup.name);
      const fileSlot = encodeURIComponent(postItem.filename);
      // Construct URL relative to the site root
      const rawUrl = `myBlog/${categoryPath}/${fileSlot}.md`;

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
    const relativeUrl = `myBlog/${encodedCategory}/${encodedSlug}.md`;
    
    // Try multiple path variants for the markdown file content
    const pathsToTry = [relativeUrl, `./${relativeUrl}`, `/${relativeUrl}`];
    let response: Response | null = null;

    for (const p of pathsToTry) {
      try {
        const r = await fetch(p);
        if (r.ok) {
          response = r;
          break;
        }
      } catch (e) {}
    }

    if (!response || !response.ok) {
      throw new Error(`Markdown file not found for: ${category}/${slug}`);
    }
    
    const content = await response.text();
    
    return {
      slug,
      category,
      title: slug.replace(/-/g, ' '),
      date: postData?.date || "Archive Entry",
      tags: [],
      summary: postData?.summary || "",
      content: content,
      rawUrl: relativeUrl,
      path: `${category}/${slug}.md`
    };
  } catch (e) {
    console.error(`Error loading content for post: ${category}/${slug}`, e);
    return null;
  }
}
