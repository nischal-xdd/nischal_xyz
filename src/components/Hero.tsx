import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Video } from 'lucide-react';
import { portfolioThumbnails } from '../data';

export default function Hero() {
  const marqueeFirstRow = [
    ...portfolioThumbnails,
    ...portfolioThumbnails,
    ...portfolioThumbnails,
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="home"
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Dynamic Background Sliding Marquee with Skew Transform */}
      <div className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none transform -skew-y-3 scale-110 flex flex-col gap-3 justify-center select-none overflow-hidden">
        {/* Row 1 - Direct Scroll Left */}
        <div className="animate-marquee-left-slow flex gap-3 whitespace-nowrap">
          {marqueeFirstRow.map((item, index) => (
            <img
              key={`row1-${item.id}-${index}`}
              src={item.imageUrl}
              alt="Background portfolio thumbnail highlight"
              referrerPolicy="no-referrer"
              className="w-[280px] h-[158px] sm:w-[320px] sm:h-[180px] object-cover rounded-xl shrink-0 grayscale hover:grayscale-0 transition-all duration-500 border border-white/5"
            />
          ))}
        </div>

        {/* Row 2 - Direct Scroll Right */}
        <div className="animate-marquee-right-fast flex gap-3 whitespace-nowrap">
          {marqueeFirstRow.map((item, index) => (
            <img
              key={`row2-${item.id}-${index}`}
              src={item.imageUrl}
              alt="Background portfolio thumbnail highlight"
              referrerPolicy="no-referrer"
              className="w-[280px] h-[158px] sm:w-[320px] sm:h-[180px] object-cover rounded-xl shrink-0 grayscale hover:grayscale-0 transition-all duration-500 border border-white/5"
            />
          ))}
        </div>

        {/* Row 3 - Direct Scroll Left Fast */}
        <div className="animate-marquee-left-fast flex gap-3 whitespace-nowrap">
          {marqueeFirstRow.slice().reverse().map((item, index) => (
            <img
              key={`row3-${item.id}-${index}`}
              src={item.imageUrl}
              alt="Background portfolio thumbnail highlight"
              referrerPolicy="no-referrer"
              className="w-[280px] h-[158px] sm:w-[320px] sm:h-[180px] object-cover rounded-xl shrink-0 grayscale hover:grayscale-0 transition-all duration-500 border border-white/5"
            />
          ))}
        </div>
      </div>

      {/* Radial Gradient Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black pointer-events-none z-1" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.06)_0%,transparent_70%)] pointer-events-none z-1" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 mb-8 select-none"
          id="hero-badge"
        >
          <Sparkles size={14} className="text-brand-yellow animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-yellow font-medium">
            Visual Strategist & Designer
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl md:text-[80px] font-bold text-brand-yellow leading-tight tracking-tighter max-w-4xl mb-6 select-none uppercase"
          id="hero-headline"
        >
          Creating Magic <br className="hidden sm:inline" />
          for Creators.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#F8FAFC] max-w-2xl leading-relaxed mb-12 font-sans opacity-95"
          id="hero-subtitle"
        >
          We Help You Grab Your Audience's Attention Towards Your Content and drive exponential CTR spikes.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5"
          id="hero-actions"
        >
          <button
            onClick={() => handleScrollTo('featured')}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-brand-yellow hover:bg-[#e0bd00] text-black rounded-full font-mono text-sm uppercase tracking-wider font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-brand-yellow/10"
            id="hero-btn-work"
          >
            My Works
            <ArrowRight size={16} />
          </button>
          
          <button
            onClick={() => handleScrollTo('contact')}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-transparent hover:bg-white/5 border-2 border-[#F8FAFC] text-[#F8FAFC] rounded-full font-mono text-sm uppercase tracking-wider font-bold transition-all duration-300 transform hover:scale-105"
            id="hero-btn-hire"
          >
            Hire Me
            <Video size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
