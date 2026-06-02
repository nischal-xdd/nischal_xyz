import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#000000] border-t border-white/5 py-12 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-center md:text-left select-none">
        
        {/* Brand */}
        <div className="font-display text-2xl font-bold text-brand-yellow tracking-tighter">
          NA
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 font-mono text-xs uppercase tracking-wider text-text-secondary">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
            LinkedIn
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
            Instagram
          </a>
          <a href="mailto:arpitkaflee@gmail.com" className="hover:text-brand-yellow transition-colors">
            Email
          </a>
        </div>

        {/* Copyright notation */}
        <div className="font-sans text-xs text-text-secondary/75 md:text-right">
          © 2026 Nischal Adhikari. All rights reserved. 
        </div>
      </div>

      {/* Embedded back-to-top button */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-8 right-8 w-11 h-11 bg-brand-lime hover:bg-[#b0db00] text-black font-bold rounded-xl flex items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-brand-lime/15 z-40 focus:outline-none cursor-pointer hover:-translate-y-1 block"
        aria-label="Scroll back to top"
        id="scroll-to-top-btn"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
