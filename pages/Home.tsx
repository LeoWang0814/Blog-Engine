
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';
import { fetchAllPosts, fetchBlogManifest, BlogManifest } from '../services/blogService';
import { Post } from '../types';
import PostCard from '../components/PostCard';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [manifest, setManifest] = useState<BlogManifest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAllPosts(), fetchBlogManifest()]).then(([postsData, manifestData]) => {
      setPosts(postsData.slice(0, 4));
      const uniqueCats = Array.from(new Set(postsData.map(p => p.category)));
      setCategories(uniqueCats);
      setManifest(manifestData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 border-b border-slate-100 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-3 text-blue-600">
               <span className="w-10 h-[2px] bg-blue-600"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.5em]">BUILD • LEARN • DEPLOY</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] uppercase">
              Engineering<br />
              <span className="text-blue-600">PROJECTS & NOTES.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl font-medium">
              Documenting my projects, problem-solving journeys, and underlying reflections: 
              turning creative visions into practical, scalable reality.
            </p>

            <div className="flex flex-wrap gap-5 pt-4">
              <Link to="/posts" className="px-10 py-4 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-slate-900/10 flex items-center gap-3 group text-sm uppercase tracking-widest">
                Read My Articles
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
              <a href="https://github.com/LeoWang0814/" target="_blank" className="px-10 py-4 bg-white border border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-700 font-bold rounded-full transition-all text-sm uppercase tracking-widest">
                View My GitHub
              </a>
            </div>
          </div>
          
          {/* 头像区域 */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
             <div className="relative group">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105">
                   <img 
                     src="https://www.helloimg.com/i/2025/12/28/695137b020f5b.jpg" 
                     alt="Leo Wang" 
                     className="w-full h-full object-cover"
                   />
                </div>
                {/* 测绘装饰线 */}
                <div className="absolute inset-0 border border-blue-500 rounded-full scale-110 opacity-20 group-hover:scale-125 transition-transform duration-700"></div>
                <div className="absolute top-1/2 left-[-40px] w-20 h-[1px] bg-blue-600/20"></div>
                <div className="absolute top-1/2 right-[-40px] w-20 h-[1px] bg-blue-600/20"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Now Section (Dynamic Cards) */}
      <section className="space-y-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-black rounded-lg text-xs">NOW</div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Operational Status</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { key: 'building', label: 'Now Building' },
            { key: 'learning', label: 'Now Learning' },
            { key: 'writing', label: 'Now Writing' }
          ].map((item) => {
            const data = manifest?.status[item.key as keyof typeof manifest.status];
            return (
              <div key={item.key} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 hover:border-blue-500/30 transition-all">
                <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em]">{item.label}</p>
                <h4 className="text-lg font-black text-slate-900 tracking-tight">{data?.title || 'Loading...'}</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{data?.detail || 'Connecting to data source...'}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        {/* Latest Content */}
        <div className="lg:col-span-8 space-y-12">
          <div className="flex items-center justify-between border-b border-slate-100 pb-6">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
              Recent Logs
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            </h2>
            <Link to="/posts" className="text-[10px] text-blue-600 hover:underline font-black uppercase tracking-widest">View All Articles &rarr;</Link>
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
            <div className="absolute top-0 right-0 p-6 opacity-20">
               {/* 邮件图标装饰 */}
               <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                 <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                 <rect width="20" height="16" x="2" y="4" rx="2"></rect>
               </svg>
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-blue-400">Contact Me</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              If you have any questions about my articles or wish to collaborate on research topics, feel free to reach out via email.
            </p>
            <a href="mailto:leowang@blueberryowo.me" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg">
              Send me an email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
