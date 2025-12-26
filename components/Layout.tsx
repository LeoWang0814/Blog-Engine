
import React, { useState, useEffect } from 'react';
// @ts-ignore - Fix for react-router-dom type mismatch in this environment
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import BlueprintBackground from './BlueprintBackground';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    const params = new URLSearchParams(location.search);
    if (val.trim()) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    navigate(`/posts?${params.toString()}`, { replace: true });
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) => 
    `relative py-2 text-[11px] font-black transition-all duration-300 uppercase tracking-[0.2em] ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`;

  const activeLine = (isActive: boolean) => 
    isActive ? 'absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full' : 'absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all group-hover:w-full';

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-blue-100 selection:text-blue-900">
      <BlueprintBackground />
      
      <header className="sticky top-0 z-50 glass-header px-6 py-4">
        {/* 统一使用 max-w-6xl 并居中 */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-4 group shrink-0">
            <div className="relative">
              <div className="w-9 h-9 border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 z-10 relative bg-white text-sm">
                LW
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 border border-blue-500 opacity-40 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-slate-900 uppercase leading-none">Leo Wang</span>
              <span className="text-[8px] text-blue-600 uppercase font-black tracking-[0.3em] mt-1">Operational Archive</span>
            </div>
          </Link>

          <nav className="flex items-center gap-8">
            <NavLink to="/" className={navItemClass}>
              {({isActive}: any) => (
                <span className="relative">Home<span className={activeLine(isActive)}></span></span>
              )}
            </NavLink>
            <NavLink to="/posts" className={navItemClass}>
              {({isActive}: any) => (
                <span className="relative">Archive<span className={activeLine(isActive)}></span></span>
              )}
            </NavLink>
            <NavLink to="/about" className={navItemClass}>
              {({isActive}: any) => (
                <span className="relative">About<span className={activeLine(isActive)}></span></span>
              )}
            </NavLink>
          </nav>

          <div className="relative group w-full md:w-56">
            <input 
              type="text" 
              placeholder="Search data..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-full px-5 py-2 text-xs focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-bold"
            />
          </div>
        </div>
      </header>

      <main className="flex-grow w-full py-16">
        <div className="max-w-6xl mx-auto px-6">
           {children}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-black text-xs">LW</div>
                <span className="font-black text-lg text-slate-900 uppercase tracking-tighter">Leo Wang</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Systematic documentation of engineering breakthroughs and theoretical exploration in high-performance computing and physics.
              </p>
            </div>

            <div className="md:col-span-5 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">Access</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors">Home</Link></li>
                  <li><Link to="/posts" className="text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors">Archive</Link></li>
                  <li><Link to="/about" className="text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors">Personnel</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">Protocol</h4>
                <ul className="space-y-2">
                  <li><a href="https://github.com/LeoWang0814" className="text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors">GitHub</a></li>
                  <li><a href="mailto:leowang@blueberryowo.me" className="text-xs text-slate-500 hover:text-blue-600 font-bold transition-colors">Secure Mail</a></li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-3 md:text-right space-y-4">
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600">Archive Status</h4>
              <p className="text-[10px] text-slate-400 font-black tracking-widest leading-loose">
                REDACTED &copy; {new Date().getFullYear()}<br />
                ENGINEERING V2.5.0
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
