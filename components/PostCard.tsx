
import React from 'react';
// @ts-ignore - Fix for react-router-dom type mismatch in this environment
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link 
      to={`/post/${post.category}/${post.slug}`}
      className="glass-card group relative flex flex-col p-8 rounded-3xl h-full border border-slate-200 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white/80 backdrop-blur-sm"
    >
      {/* Blueprint Accent Corner */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
        <div className="absolute top-[-24px] right-[-24px] w-12 h-12 border-b border-l border-slate-100 group-hover:border-blue-200 rotate-45 transition-colors"></div>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            {post.category}
          </span>
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mono">
            {post.date}
          </span>
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tighter leading-tight">
          {post.title}
        </h3>
        
        <p className="text-slate-500 text-sm line-clamp-3 mb-8 leading-relaxed font-medium">
          {post.summary}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            View Full Article
          </span>
          
          <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            Read Entry
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;