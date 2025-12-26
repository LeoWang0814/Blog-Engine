
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
 * 更加稳健的 manifest 加载逻辑。
 * 在 Vercel 部署中，public 目录的内容被映射为根路径内容。
 */
async function getManifest(): Promise<BlogManifest> {
  const paths = [
    '/myblog/manifest.json', // 首选：绝对路径
    'myblog/manifest.json',  // 备选：相对路径
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

  console.error("Critical: Failed to load blog manifest. Ensure 'public/myblog/manifest.json' exists and is lowercase.");
  return { categories: [] };
}

/**
 * 获取所有文章元数据
 */
export async function fetchAllPosts(): Promise<Post[]> {
  const manifest = await getManifest();
  const allPosts: Post[] = [];

  manifest.categories.forEach(catGroup => {
    catGroup.posts.forEach(postItem => {
      const displayTitle = postItem.filename.replace(/-/g, ' ');
      const categoryPath = encodeURIComponent(catGroup.name);
      const fileSlot = encodeURIComponent(postItem.filename);
      
      // 使用小写 myblog 绝对路径
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

/**
 * 获取具体文章内容
 */
export async function fetchPostContent(category: string, slug: string): Promise<Post | null> {
  try {
    const manifest = await getManifest();
    const catData = manifest.categories.find(c => c.name === category);
    const postData = catData?.posts.find(p => p.filename === slug);

    const encodedCategory = encodeURIComponent(category);
    const encodedSlug = encodeURIComponent(slug);
    
    // 强制使用小写 myblog 路径
    const primaryUrl = `/myblog/${encodedCategory}/${encodedSlug}.md`;
    const fallbackUrl = `myblog/${encodedCategory}/${encodedSlug}.md`;
    
    let response: Response | null = null;

    for (const url of [primaryUrl, fallbackUrl]) {
      try {
        const r = await fetch(url);
        if (r.ok) {
          response = r;
          break;
        }
      } catch (e) {}
    }

    if (!response || !response.ok) {
      throw new Error(`Markdown not found: /myblog/${category}/${slug}.md`);
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
      rawUrl: primaryUrl,
      path: `${category}/${slug}.md`
    };
  } catch (e) {
    console.error(`Error loading content for post: ${category}/${slug}`, e);
    return null;
  }
}
