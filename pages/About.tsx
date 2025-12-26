
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-20">
      <header className="space-y-6">
        <div className="inline-flex items-center gap-3 text-blue-600">
           <span className="w-12 h-[3px] bg-blue-600"></span>
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Researcher</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">LEO WANG.</h1>
        <p className="text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">
          Bridging the gap between complex engineering systems and intuitive human experiences.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col justify-between">
           <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Biography</h2>
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                <p>
                  I am a passionate technologist and researcher focused on high-performance web systems and the theoretical foundations of physics.
                </p>
                <p>
                  My work is driven by the belief that any complex idea, when documented with enough precision and care, can be transformed into actionable knowledge. This blog is my public workbench.
                </p>
              </div>
           </div>
           
           <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-400 italic">"Engineering is the art of organizing complexity."</p>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-12 rounded-[3rem] text-white space-y-8 h-full">
              <h3 className="text-xs font-black text-blue-400 uppercase tracking-[0.3em]">Direct Communication</h3>
              <div className="space-y-6">
                 <div className="group">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Official Site</p>
                    <a href="https://blueberryowo.me" className="text-xl font-bold hover:text-blue-400 transition-colors">blueberryowo.me &rarr;</a>
                 </div>
                 <div className="group">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Electronic Mail</p>
                    <a href="mailto:leowang@blueberryowo.me" className="text-xl font-bold hover:text-blue-400 transition-colors">leowang@blueberryowo.me</a>
                 </div>
                 <div className="group">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">GitHub Profile</p>
                    <a href="https://github.com/LeoWang0814" target="_blank" className="text-xl font-bold hover:text-blue-400 transition-colors">github.com/LeoWang0814</a>
                 </div>
              </div>

              <div className="pt-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                   <p className="text-xs font-bold text-blue-300">Open for collaboration on:</p>
                   <ul className="text-sm text-slate-400 space-y-1">
                      <li>• Physics-based simulations</li>
                      <li>• Modern React architecture</li>
                      <li>• Technical writing projects</li>
                   </ul>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
