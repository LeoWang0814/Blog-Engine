
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
      
      // @ts-ignore
      if (window.Prism) { window.Prism.highlightAllUnder(contentRef.current); }

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

  // 内部链接拦截逻辑
  useEffect(() => {
    const handleInternalLinks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && (anchor.hash.startsWith('#fn') || anchor.hash.startsWith('#marker-'))) {
        e.preventDefault();
        const id = anchor.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.pageYOffset - 120,
            behavior: 'smooth'
          });
          element.classList.add('highlight-flash');
          setTimeout(() => element.classList.remove('highlight-flash'), 2000);
        }
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
      button.className = 'copy-btn p-1.5 rounded-md bg-slate-800 text-slate-400 hover:text-white transition-all text-[8px] font-black uppercase tracking-widest border border-slate-700/50 backdrop-blur-sm z-10';
      button.innerHTML = `<span>Copy</span>`;
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.innerText || '';
        try {
          await navigator.clipboard.writeText(code);
          button.innerText = 'Copied';
          setTimeout(() => { button.innerText = 'Copy'; }, 2000);
        } catch (err) { console.error(err); }
      });
      pre.appendChild(button);
    });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 120, behavior: 'smooth' });
    }
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

          {/* Outline - 限制宽度使其不至于横跨整个屏幕 */}
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
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`text-xs font-bold text-slate-500 hover:text-blue-600 transition-all py-1 flex items-center gap-3 border-b border-transparent hover:border-blue-100 truncate ${item.level === 3 ? 'pl-5 text-[10px] text-slate-400 font-medium' : ''}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600 opacity-30"></span>
                    <span className="truncate">{item.text}</span>
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Content Body - 核心阅读区：限制 max-w-4xl (约 900px) 以保证阅读舒适度 */}
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
