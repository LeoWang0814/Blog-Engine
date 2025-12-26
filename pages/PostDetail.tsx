
import React, { useEffect, useState, useRef } from 'react';
// @ts-ignore
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchPostContent } from '../services/blogService';
import { Post } from '../types';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const PostDetail: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 核心滚动函数：确保 Header 偏移量和视觉反馈一致
  // 移除了 pushState 以避免在特定沙盒环境下的 SecurityError
  const performSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // 统一 Header 偏移量 (110px)
    const top = element.getBoundingClientRect().top + window.pageYOffset - 110;
    
    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });

    // 视觉闪烁反馈
    element.classList.add('highlight-flash');
    setTimeout(() => {
      if (element) element.classList.remove('highlight-flash');
    }, 2000);
  };

  useEffect(() => {
    if (category && slug) {
      setLoading(true);
      fetchPostContent(category, slug).then(data => {
        setPost(data);
        setLoading(false);
      });
    }
  }, [category, slug]);

  useEffect(() => {
    if (post && !loading && contentRef.current) {
      contentRef.current.innerHTML = '';
      // @ts-ignore
      const marked = window.marked;
      // @ts-ignore
      const markedFootnote = window.markedFootnote;
      
      marked.setOptions({ gfm: true, breaks: true, headerIds: true, mangle: false });
      if (markedFootnote) { marked.use(markedFootnote()); }

      const htmlContent = marked.parse(post.content);
      contentRef.current.innerHTML = htmlContent;
      
      // 代码高亮
      // @ts-ignore
      if (window.Prism) { window.Prism.highlightAllUnder(contentRef.current); }

      // 提取目录
      const headings = contentRef.current.querySelectorAll('h2, h3');
      const items: TocItem[] = Array.from(headings).map((h: any, idx) => {
        const id = `marker-${idx}`;
        h.id = id;
        return { id, text: h.innerText, level: parseInt(h.tagName.substring(1)) };
      });
      setToc(items);
      addCopyButtons(contentRef.current);
    }
  }, [post, loading]);

  // 统一拦截正文内的所有 Hash 链接（含脚注）
  useEffect(() => {
    const handleInternalLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        // 兼容处理 ID 中包含冒号的情况（如 #fn:1）
        const id = decodeURIComponent(anchor.hash.slice(1));
        performSmoothScroll(id);
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener('click', handleInternalLinks);
    }
    return () => container?.removeEventListener('click', handleInternalLinks);
  }, [post, loading]);

  const addCopyButtons = (container: HTMLElement) => {
    const pres = container.querySelectorAll('pre');
    pres.forEach(pre => {
      if (pre.querySelector('.copy-btn')) return;
      const button = document.createElement('button');
      button.className = 'copy-btn p-1.5 px-2.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-[9px] font-black uppercase tracking-widest border border-slate-700/50 backdrop-blur-md z-10';
      
      const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      
      button.innerHTML = `${copyIcon}<span>Copy</span>`;
      
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.innerText || '';
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML = `${checkIcon}<span class="text-blue-400">Copied</span>`;
          button.classList.add('border-blue-500/50');
          setTimeout(() => { 
            button.innerHTML = `${copyIcon}<span>Copy</span>`;
            button.classList.remove('border-blue-500/50');
          }, 2000);
        } catch (err) { console.error(err); }
      });
      pre.appendChild(button);
    });
  };

  if (loading) {
    return (
      <div className="py-40 text-center">
        <div className="flex flex-col items-center gap-6">
           <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Deciphering Entry...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-40 text-center space-y-6">
        <h1 className="text-6xl font-black text-slate-200 uppercase tracking-tighter">NULL_DATA</h1>
        <button onClick={() => navigate('/posts')} className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold uppercase text-[10px] tracking-widest">Return to Archive</button>
      </div>
    );
  }

  return (
    <div className="relative pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-10 flex items-center justify-start gap-3 text-[9px] font-black uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-blue-600 transition-colors">Front</Link>
          <span>/</span>
          <Link to="/posts" className="hover:text-blue-600 transition-colors">Archive</Link>
          <span>/</span>
          <span className="text-blue-600 truncate opacity-60 italic">{post.title}</span>
        </nav>

        <article className="space-y-12">
          {/* Header Section */}
          <header className="space-y-8 text-left max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[9px] font-black uppercase rounded-md tracking-widest border border-blue-100">{post.category}</span>
              <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] mono">{post.date}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[1.05] uppercase">
              {post.title}
            </h1>
          </header>

          {/* Outline - 使用封装的滚动函数 */}
          {toc.length > 0 && (
            <div className="p-10 md:p-12 bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-slate-100 shadow-sm w-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[2px] bg-blue-600"></div>
                <h3 className="text-[9px] font-black text-slate-900 tracking-[0.4em] uppercase">Document Map</h3>
              </div>
              <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                {toc.map(item => (
                  <a 
                    key={item.id} 
                    href={`#${item.id}`} 
                    onClick={(e) => { e.preventDefault(); performSmoothScroll(item.id); }}
                    className={`text-xs font-bold text-slate-500 hover:text-blue-600 transition-all py-1 flex items-center gap-3 border-b border-transparent hover:border-blue-100 truncate ${item.level === 3 ? 'pl-5 text-[10px] text-slate-400 font-medium' : ''}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600 opacity-30"></span>
                    <span className="truncate">{item.text}</span>
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Content Body */}
          <div className="bg-white rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-2xl shadow-slate-200/50 border border-slate-50 relative w-full flex justify-center">
            <div ref={contentRef} className="prose-container max-w-4xl w-full" />
          </div>

          {/* Footer Navigation */}
          <div className="mt-16 p-10 md:p-12 bg-slate-900 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl">
            <div className="space-y-2">
              <p className="text-[8px] font-black text-blue-400 uppercase tracking-[0.4em]">Operational Status</p>
              <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight">Technical documentation sequence complete.</h4>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-full font-bold hover:bg-slate-700 transition-all text-[10px] uppercase tracking-widest"
              >
                Start Over
              </button>
              <Link to="/posts" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-xl uppercase tracking-widest text-[10px] font-black">
                Full Index &rarr;
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
