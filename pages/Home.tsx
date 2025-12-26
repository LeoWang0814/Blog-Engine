
import React, { useEffect, useState } from 'react';
// @ts-ignore - Fix for react-router-dom type mismatch in this environment
import { Link } from 'react-router-dom';
import { fetchAllPosts } from '../services/blogService';
import { Post } from '../types';
import PostCard from '../components/PostCard';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts().then(data => {
      setPosts(data.slice(0, 4));
      const uniqueCats = Array.from(new Set(data.map(p => p.category)));
      setCategories(uniqueCats);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-32">
      {/* Hero Section - 优化布局 */}
      <section className="relative pt-12 pb-24 border-b border-slate-100 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-3 text-blue-600">
               <span className="w-10 h-[2px] bg-blue-600"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.5em]">Central Intelligence Archive</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
              Engineering<br />
              <span className="text-blue-600">Insights.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
              A systematic repository documenting architectural patterns, 
              high-performance computing research, and theoretical software systems.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link to="/posts" className="px-10 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-slate-900/10 flex items-center gap-3 group text-sm uppercase tracking-widest">
                Access Archive
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
              <a href="https://blueberryowo.me" target="_blank" className="px-10 py-4 bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-bold rounded-full transition-all text-sm uppercase tracking-widest">
                Portfolio
              </a>
            </div>
          </div>
          
          {/* 装饰性测绘元素 - 提升视觉平衡感 */}
          <div className="hidden lg:flex lg:col-span-4 justify-end relative">
             <div className="w-64 h-64 border border-blue-100 rounded-full flex items-center justify-center relative animate-pulse">
                <div className="absolute inset-0 border border-blue-50/50 rounded-full scale-125"></div>
                <div className="absolute inset-0 border border-blue-50/30 rounded-full scale-150"></div>
                <div className="w-full h-[1px] bg-blue-100 absolute rotate-45"></div>
                <div className="w-full h-[1px] bg-blue-100 absolute -rotate-45"></div>
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black rounded-lg shadow-lg shadow-blue-500/30 z-10">LW</div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Latest Content */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
              Latest Records
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            </h2>
            <Link to="/posts" className="text-[10px] text-blue-600 hover:underline font-black uppercase tracking-widest">Global Index &rarr;</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1,2,3,4].map(i => <div key={i} className="h-72 bg-white animate-pulse rounded-3xl border border-slate-100"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
            <h3 className="text-[9px] font-black text-slate-900 uppercase tracking-[0.4em] border-l-4 border-blue-600 pl-4">Classifications</h3>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <Link 
                  key={cat} 
                  to={`/posts?category=${cat}`}
                  className="flex items-center justify-between group p-3.5 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100"
                >
                  <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600 uppercase tracking-widest">{cat}</span>
                  <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-[10px] text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">&rarr;</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-6 relative overflow-hidden group shadow-2xl shadow-slate-900/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <svg width="60" height="60" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" strokeDasharray="10 5" /></svg>
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-400">Collaborations</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Looking for research-focused technical contributions or system architectural review?
            </p>
            <a href="mailto:leowang@blueberryowo.me" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg">
              Open Channel
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
