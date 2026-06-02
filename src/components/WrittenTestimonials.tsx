import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { writtenTestimonials } from '../data';

export default function WrittenTestimonials() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % writtenTestimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + writtenTestimonials.length) % writtenTestimonials.length);
  };

  return (
    <section 
      id="written-testimonials" 
      className="w-full px-5 sm:px-8 lg:px-12 py-24 bg-black border-t border-white/5 relative overflow-hidden"
    >
      {/* Background Decorative Accent Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-yellow mb-4" id="written-testimonials-title">
            Written Testimonials
          </h2>
          <p className="text-sm sm:text-base text-text-secondary" id="written-testimonials-subtitle">
            Unbiased feedback from top directors, musicians, and educational hosts. Long-term partners who rely on high click-velocities to maintain business growth.
          </p>
        </div>

        {/* Carousel Window */}
        <div className="relative min-h-[360px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full bg-[#111113] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl relative flex flex-col justify-between"
              id={`written-card-${writtenTestimonials[activeIndex].id}`}
            >
              {/* Giant quote icon */}
              <div className="absolute top-6 right-8 text-[#222226] select-none pointer-events-none">
                <Quote size={120} className="stroke-1 opacity-15" />
              </div>

              <div>
                {/* Stars feedback ratings */}
                <div className="flex gap-1 mb-6 text-brand-yellow">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={`star-${i}`} size={16} className="fill-current" />
                  ))}
                  <span className="font-mono text-xs text-brand-lime font-bold ml-2 flex items-center gap-1">
                    <ShieldCheck size={14} />
                    Verified Partner
                  </span>
                </div>

                <p className="text-[#F8FAFC] text-base sm:text-lg leading-relaxed mb-8 italic relative z-10 font-sans">
                  " {writtenTestimonials[activeIndex].text} "
                </p>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-4 mt-4 relative z-10">
                <img
                  src={writtenTestimonials[activeIndex].avatarImg}
                  alt={writtenTestimonials[activeIndex].name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover border border-brand-yellow/20"
                />
                <div>
                  <h4 className="font-display text-white text-base font-bold leading-none mb-1.5">
                    {writtenTestimonials[activeIndex].name}
                  </h4>
                  <span className="font-mono text-xs text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/15">
                    {writtenTestimonials[activeIndex].channel}
                  </span>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    {writtenTestimonials[activeIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left/Right Arrow Toggle Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-12 z-20">
            <button
              onClick={handlePrev}
              className="w-10 h-10 bg-[#18181B] hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/5 transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={18} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-12 z-20">
            <button
              onClick={handleNext}
              className="w-10 h-10 bg-[#18181B] hover:bg-white/10 text-white rounded-full flex items-center justify-center border border-white/5 transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center gap-2.5 mt-10">
          {writtenTestimonials.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                activeIndex === index ? 'w-8 bg-brand-yellow' : 'w-2 bg-white/15'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
