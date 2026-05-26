import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0C4A6E] flex flex-col items-center justify-center p-8 py-16 border-t-8 border-black">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h3 className="font-pixel text-2xl text-white mb-6 uppercase tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          BALANGAY OF THE FORGOTTEN
        </h3>
        
        <p className="text-[#F0F9FF] font-serif text-center max-w-2xl italic text-lg mb-10 opacity-80">
          &quot;The past is not gone; it is merely waiting for the right wind to carry its echoes back to us.&quot;
        </p>
        
        <div className="flex gap-6 mb-12">
          <a 
            href="https://itch.io/e/36476865/psergio-published-balangay-of-the-forgotten" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-white flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              <img src="https://static.itch.io/images/itchio-textless-black.svg" alt="itch.io" className="w-8 h-8" />
            </div>
            <span className="font-pixel text-[8px] text-[#0EA5E9] uppercase group-hover:text-white transition-colors">Download</span>
          </a>
          
          <a 
            href="https://github.com/PSergio984/balangay-of-the-forgotten-website" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-white flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </div>
            <span className="font-pixel text-[8px] text-[#0EA5E9] uppercase group-hover:text-white transition-colors">Source Code</span>
          </a>
        </div>

        <div className="font-pixel text-[8px] text-slate-400 text-center leading-loose">
          <p>© 2026 BALANGAY OF THE FORGOTTEN • ALL RIGHTS RESERVED</p>
          <p className="mt-2 text-slate-500">PAMANTASAN LUNGSOD NG VALENZUELA</p>
        </div>
      </div>
    </footer>
  );
}
