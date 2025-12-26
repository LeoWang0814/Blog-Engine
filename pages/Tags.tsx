
import React, { useEffect, useState } from 'react';
// @ts-ignore - Fix for react-router-dom type mismatch in this environment
import { Link } from 'react-router-dom';
// Fix: Import fetchAllPosts from blogService instead of githubService
import { fetchAllPosts } from '../services/blogService';

const Tags: React.FC = () => {
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPosts().then(posts => {
      const tagMap: Record<string, number> = {};
      posts.forEach(p => {
        p.tags.forEach(t => {
          tagMap[t] = (tagMap[t] || 0) + 1;
        });
      });
      const tagList = Object.entries(tagMap).map(([name, count]) => ({ name, count }));
      setTags(tagList.sort((a, b) => b.count - a.count));
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="space-y-2">
        {/* Adjusted text color for visibility on light blueprint background */}
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Tag Index</h1>
        <p className="text-slate-400">Browse all topics mentioned across my articles.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          [1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-16 bg-white/50 animate-pulse rounded-xl border border-slate-200"></div>)
        ) : (
          tags.map(tag => (
            <Link 
              key={tag.name} 
              to={`/posts?q=${tag.name}`}
              className="glass-card group p-5 rounded-xl transition-all hover:bg-blue-600/10 flex flex-col gap-1 border border-slate-100 bg-white shadow-sm"
            >
              {/* Changed text-slate-200 to text-slate-700 for better visibility */}
              <span className="text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors capitalize">
                #{tag.name}
              </span>
              <span className="text-xs text-slate-500">
                {tag.count} {tag.count === 1 ? 'post' : 'posts'}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Tags;