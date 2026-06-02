import { motion } from 'motion/react';
import { marqueeCreatorAvatars } from '../data';

export default function CreatorMarquee() {
  // Let's multiply the avatars list to make an endless continuous scrolling queue
  const displayAvatars = [
    ...marqueeCreatorAvatars,
    ...marqueeCreatorAvatars,
    ...marqueeCreatorAvatars,
  ];

  return (
    <section className="w-full py-10 bg-black/80 border-y border-white/5 overflow-hidden select-none relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 mb-4 flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-text-secondary select-none">
          Trusted by Top Creators Globally
        </span>
        <span className="font-mono text-xs text-brand-yellow font-bold uppercase select-none animate-pulse">
          • 400M+ COMBINED VIEWS
        </span>
      </div>

      <div className="relative">
        <div className="animate-marquee-left-slow flex gap-8 items-center py-2 hover:[animation-play-state:paused] cursor-pointer">
          {displayAvatars.map((url, idx) => (
            <motion.div
              key={`creator-avatar-${idx}`}
              whileHover={{ scale: 1.15, borderColor: '#FFD700' }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#18181B] shrink-0 border-2 border-white/10 overflow-hidden shadow-2xl transition-all duration-300 relative group"
            >
              <img
                src={url}
                alt="Partner content creator profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
