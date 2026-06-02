import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, TrendingUp, X, Filter, Sparkles, ArrowRight } from 'lucide-react';
import { portfolioThumbnails } from '../data';
import { ThumbnailItem } from '../types';

export default function FeaturedThumbnails() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<ThumbnailItem | null>(null);

  const categories = ['All', 'Tech', 'Finance', 'Luxury', 'Strategy'];

  const filteredThumbnails = selectedCategory === 'All'
    ? portfolioThumbnails
    : portfolioThumbnails.filter(item => item.category === selectedCategory);

  const handleInquireStyle = (item: ThumbnailItem) => {
    setActiveItem(null);
    // Find the contact section and fields
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Prepopulate message after scroll
    setTimeout(() => {
      const messageField = document.getElementById('message') as HTMLTextAreaElement;
      const serviceField = document.getElementById('service') as HTMLSelectElement;
      if (messageField) {
        messageField.value = `Hi Nischal! I love the Style: "${item.title}" shown under your ${item.category} portfolio category. I'd love to chat about building something similar for my channel!`;
        messageField.focus();
      }
      if (serviceField) {
        serviceField.value = item.category === 'Strategy' ? 'strategy' : 'thumbnail';
      }
    }, 800);
  };

  return (
    <section 
      id="featured" 
      className="w-full px-5 sm:px-8 lg:px-12 py-28 bg-[#111111]/40 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/10 border border-brand-yellow/20 rounded-full mb-4"
          >
            <TrendingUp size={12} className="text-brand-yellow" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-brand-yellow">
              Portfolio Showroom
            </span>
          </motion.div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-yellow mb-4" id="featured-title">
            Featured Thumbnails
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] mb-8" id="featured-subtitle">
            I take absolute pride in combining high visual density and psychological tactics to craft designs that outperform industry averages. Click any thumbnail to view strategy details and metrics!
          </p>

          {/* Interactive Category Filter Pills */}
          <div 
            className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3" 
            id="category-filter-bar"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 border ${
                  selectedCategory === cat
                    ? 'bg-brand-yellow border-brand-yellow text-black font-semibold shadow-lg shadow-brand-yellow/10'
                    : 'bg-transparent border-white/10 hover:border-white/30 text-text-secondary hover:text-text-primary'
                }`}
                id={`filter-pill-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="featured-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredThumbnails.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveItem(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-black/60 border border-white/5 hover:border-brand-yellow/20 relative shadow-2xl transition-all duration-500"
                id={`thumbnail-card-${item.id}`}
              >
                {/* Thumb High Contrast Container */}
                <div className="aspect-[16/9] w-full overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="font-mono text-xs text-brand-yellow bg-black/80 px-3 py-1.5 rounded-md border border-brand-yellow/20 flex items-center gap-1.5 backdrop-blur-md">
                      <Eye size={12} />
                      View High Resolution Strategy
                    </span>
                  </div>
                </div>

                {/* Footer Labeled metrics info */}
                <div className="p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center gap-2 mb-3">
                    <span className="font-mono text-xs font-semibold text-brand-yellow uppercase tracking-widest bg-brand-yellow/10 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-brand-lime font-bold">
                      {item.ctrIncrease}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-[#F8FAFC] text-base group-hover:text-brand-yellow transition-colors font-medium tracking-tight truncate">
                    {item.title}
                  </h3>
                  
                  <span className="font-mono text-xs text-text-secondary mt-2">
                    Client: {item.clientName} • {item.views}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* LIGHTBOX / STRATEGY INSPECTOR MODAL */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-surface-elevated rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
              id="lightbox-modal"
            >
              {/* Image Section */}
              <div className="w-full md:w-3/5 aspect-[16/9] md:aspect-auto relative bg-black flex items-center justify-center">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain max-h-[450px]"
                />
              </div>

              {/* Strategy Details Column */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 bg-[#121214]">
                <div>
                  <div className="flex justify-between items-center gap-4 mb-4">
                    <span className="font-mono text-xs text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/20 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {activeItem.category} Packaging
                    </span>
                    <button 
                      onClick={() => setActiveItem(null)}
                      className="text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors focus:outline-none"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl text-white font-bold tracking-tight mb-4 leading-snug">
                    {activeItem.title}
                  </h3>

                  {/* Impact Stats Bento box */}
                  <div className="grid grid-cols-2 gap-3 mb-6 bg-black/40 p-4 rounded-xl border border-white/5">
                    <div>
                      <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
                        CTR Increase
                      </span>
                      <span className="font-display text-lg font-bold text-brand-lime">
                        {activeItem.ctrIncrease}
                      </span>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-text-secondary uppercase block mb-1">
                        Est. Views
                      </span>
                      <span className="font-display text-lg font-bold text-white">
                        {activeItem.views}
                      </span>
                    </div>
                  </div>

                  {/* Creative explanation */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-brand-yellow block">
                      Psychological Tactics
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {activeItem.description}
                    </p>
                    <p className="text-xs text-text-secondary">
                      <strong>Target Audience focus:</strong> Immediate curiosity triggers combined with high color-saturation contrast to outperform adjacent feed items.
                    </p>
                  </div>
                </div>

                {/* Bottom CTA Loop */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <button
                    onClick={() => handleInquireStyle(activeItem)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-brand-yellow hover:bg-[#e0bd00] text-black rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300"
                    id="lightbox-btn-inquire"
                  >
                    Inquire For This Style
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
