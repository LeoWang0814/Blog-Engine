
import React, { useEffect, useState, useMemo } from 'react';
// @ts-ignore - Fix for react-router-dom type mismatch in this environment
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { fetchAllPosts } from '../services/blogService';
import { Post } from '../types';
import PostCard from '../components/PostCard';

const Posts: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('q') || '';
  const categoryParam = queryParams.get('category') || '';

  useEffect(() => {
    fetchAllPosts().then(data => {
      setAllPosts(data);
      setLoading(false);
    });
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesSearch = !searchParam || 
        post.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchParam.toLowerCase());
      const matchesCategory = !categoryParam || post.category === categoryParam;
      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchParam, categoryParam]);

  const categories: string[] = Array.from(new Set(allPosts.map(p => p.category)));

  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(location.search);
    if (cat === '') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    navigate(`/posts?${params.toString()}`);
  };

  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-16 border-b border-slate-100">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 text-blue-600">
             <span className="w-12 h-[2px] bg-blue-600"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Resource Library</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">The Archive.</h1>
          <p className="text-slate-400 font-medium max-w-xl text-base">
            Systematically organized engineering blueprints and technical research logs.
          </p>
        </div>
        
        {categoryParam && (
          <div className="flex items-center gap-3 bg-white p-2 pl-5 pr-2 rounded-full border border-slate-100 shadow-sm">
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Filter:</span>
            <div className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              {categoryParam}
              <button onClick={() => handleCategoryClick('')} className="hover:scale-125 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-32 space-y-12">
            <div className="space-y-6">
              <h3 className="text-[9px] font-black text-slate-900 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-4">Classification</h3>
              <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 no-scrollbar">
                <button 
                  onClick={() => handleCategoryClick('')}
                  className={`whitespace-nowrap text-left text-[10px] px-5 py-3 rounded-xl transition-all font-black uppercase tracking-widest ${!categoryParam ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' : 'text-slate-400 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-100'}`}
                >
                  All Records
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`whitespace-nowrap text-left text-[10px] px-5 py-3 rounded-xl transition-all font-black uppercase tracking-widest ${categoryParam === cat ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/10' : 'text-slate-400 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>

            <div className="hidden lg:block p-8 bg-white rounded-[2rem] border border-slate-50 space-y-5 shadow-sm">
              <h4 className="text-[8px] font-black text-slate-900 uppercase tracking-widest">Meta Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Documents</span>
                  <span className="text-[10px] font-black text-slate-900">{allPosts.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Visible</span>
                  <span className="text-[10px] font-black text-blue-600">{filteredPosts.length}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {[1,2,3,4].map(i => <div key={i} className="h-72 bg-white animate-pulse rounded-[2.5rem] border border-slate-100"></div>)}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {filteredPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] py-24 text-center border border-slate-50 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter uppercase">No Match</h2>
              <p className="text-slate-400 font-medium text-sm">Query returned zero matching entries.</p>
              <button 
                onClick={() => handleCategoryClick('')}
                className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all"
              >
                Reset Archive
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
