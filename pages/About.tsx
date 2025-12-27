
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col min-h-[60vh]">
      <div className="flex-grow space-y-12">
        {/* Header Section */}
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 text-blue-600">
             <span className="w-10 h-[2px] bg-blue-600"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">about me</span>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
              LEO WANG<span className="text-blue-600">.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-4xl leading-relaxed italic">
              Researching projects I am genuinely passionate about, and documenting the journey of transforming curiosity into tangible, impactful results.
            </p>
          </div>
        </header>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Biography (7/12) */}
          <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col justify-between">
             <div className="space-y-8">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
                  About Me
                  <span className="h-[1px] flex-grow bg-slate-100"></span>
                </h2>
                
                <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-base md:text-lg">
                  <p>
                    I am a Grade 11 AP Program student based in Shanghai. It brings me genuine joy if this blog or the projects shared here can be of any help to you.
                  </p>
                  <p>
                    On this platform, I dive into topics that truly captivate me, approaching each one with an engineering mindset. I focus not just on the final result, but on the entire process—from initial design and implementation to testing and final deployment.
                  </p>
                  <p>
                    This blog serves as both a record of my professional growth and an open engineering notebook.
                  </p>
                  <p>
                    Here, you'll find project documentations, tutorials, tools, and reflections—some nascent, but all authentic.
                  </p>
                </div>
             </div>
             
             {/* Quote - Centered or Aligned Right as requested */}
             <div className="mt-16 pt-8 border-t border-slate-50 text-right">
                <p className="text-sm font-bold text-slate-400 italic mb-1">
                  "The art of programming is the art of organizing complexity."
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  — Edsger W. Dijkstra
                </p>
             </div>
          </div>

          {/* Right Column: Channels & CTA (5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
             {/* Links Card */}
             <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white space-y-8 shadow-2xl shadow-slate-900/10 relative overflow-hidden flex flex-col justify-center">
                <h3 className="text-[9px] font-black text-blue-400 uppercase tracking-[0.4em] border-b border-white/5 pb-4">Digital Channels</h3>
                
                <div className="space-y-6">
                   <div className="group">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Primary Domain</p>
                      <a href="https://blueberryowo.me" className="text-xl font-bold hover:text-blue-400 transition-all flex items-center gap-2">
                        blueberryowo.me
                        <span className="text-xs opacity-0 group-hover:opacity-100 transition-all">&rarr;</span>
                      </a>
                   </div>
                   
                   <div className="group">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Messaging</p>
                      <a href="mailto:leowang@blueberryowo.me" className="text-xl font-bold hover:text-blue-400 transition-all truncate block">
                        leowang@blueberryowo.me
                      </a>
                   </div>

                   <div className="group">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Development Hub</p>
                      <a href="https://github.com/LeoWang0814" target="_blank" className="text-xl font-bold hover:text-blue-400 transition-all">
                        github.com/LeoWang0814
                      </a>
                   </div>
                </div>
             </div>

             {/* Contact CTA - Consistent Dark Theme */}
             <div className="flex-grow bg-slate-900 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl shadow-slate-900/10 border border-white/5 group">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-black text-white uppercase tracking-widest">Feel free to contact me.</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-[280px]">
                    I'm open to conversations, ideas, and potential collaborations that are technically interesting.
                  </p>
                </div>

                <a 
                  href="mailto:leowang@blueberryowo.me" 
                  className="px-8 py-3.5 bg-white text-slate-900 rounded-full font-black text-[9px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                >
                  Email me now
                </a>
             </div>
          </div>
        </section>
      </div>
      
      {/* Spacer to manage footer gap */}
      <div className="h-12"></div>
    </div>
  );
};

export default About;
