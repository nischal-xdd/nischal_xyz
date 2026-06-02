import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, X, Sparkles, Youtube, CheckCircle2 } from 'lucide-react';
import { videoTestimonials } from '../data';
import { VideoTestimonial } from '../types';

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(15); // simulate dynamic seeking progress

  // Simulate progress when video is running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeVideo && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [activeVideo, isPlaying]);

  return (
    <section 
      id="testimonials" 
      className="w-full px-5 sm:px-8 lg:px-12 py-28 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8] block mb-3">
          Listen to My Partners
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-yellow mb-4" id="testimonials-video-title">
          Video Testimonials.
        </h2>
        <p className="text-sm sm:text-base text-text-secondary" id="testimonials-video-subtitle">
          Real response metrics from YouTube creators we've driven to the top of competitive topics. Click the play button to hear their success stories!
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="video-testimonials-grid">
        {videoTestimonials.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActiveVideo(item);
              setProgress(15);
              setIsPlaying(true);
            }}
            className="relative aspect-[9/16] bg-[#18181B] rounded-2xl overflow-hidden group cursor-pointer border border-white/5 hover:border-brand-yellow/30 shadow-2xl transition-all duration-500"
            id={`video-card-${item.id}`}
          >
            {/* Thumbnail */}
            <img
              src={item.thumbnailImg}
              alt={`${item.name} thumbnail`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />

            {/* Dark Mask overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />

            {/* Red Play Indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-16 h-16 bg-[#e11d48] rounded-full flex items-center justify-center text-white shadow-xl group-hover:shadow-[#e11d48]/40 transition-all duration-300"
              >
                <Play size={26} className="fill-current translate-x-0.5" />
              </motion.div>
            </div>

            {/* Duration Pill */}
            <div className="absolute bottom-16 right-4 font-mono text-[10px] bg-black/75 text-[#F8FAFC]/80 px-2.5 py-1 rounded-md border border-white/10 select-none">
              {item.videoDuration}
            </div>

            {/* Creator Labeled Header */}
            <div className="absolute top-4 left-4 right-4 flex items-center gap-2.5 bg-black/60 p-2 rounded-full border border-white/10 backdrop-blur-md">
              <img
                src={item.avatarImg}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border border-white/10 object-cover"
              />
              <div className="min-w-0 flex-1">
                <span className="text-white text-xs font-bold block truncate">
                  {item.name}
                </span>
                <span className="text-[#94A3B8] font-mono text-[9px] block truncate">
                  {item.channelName}
                </span>
              </div>
            </div>

            {/* Footer metric labels */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-brand-lime font-bold uppercase py-0.5 px-2 bg-brand-lime/10 border border-brand-lime/20 rounded">
                Verified
              </span>
              <span className="font-mono text-[10px] text-brand-yellow font-bold">
                {item.metrics}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILED HIGH-FIDELITY VIDEO TESTIMONIAL PLAYER MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#0e0e11] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              id="video-player-modal"
            >
              {/* Fake Player Monitor display window */}
              <div className="aspect-video w-full bg-black relative group overflow-hidden border-b border-white/5">
                {/* Active Backdrop frame */}
                <img
                  src={activeVideo.thumbnailImg}
                  alt={activeVideo.title}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover select-none transition-filter duration-700 ${
                    isPlaying ? 'blur-[1px] brightness-[0.7]' : 'blur-[5px] brightness-[0.4]'
                  }`}
                />

                {/* Simulated playback visual audio equalizer loop */}
                {isPlaying && (
                  <div className="absolute bottom-12 left-6 right-6 flex items-end gap-1 h-12 pointer-events-none opacity-40">
                    {Array.from({ length: 48 }).map((_, i) => {
                      const heights = [10, 35, 15, 60, 25, 45, 12, 70, 30, 50, 8, 40, 20, 55, 33, 18];
                      const height = heights[i % heights.length];
                      return (
                        <motion.div
                          key={`eq-bar-${i}`}
                          className="flex-1 bg-brand-yellow rounded-sm"
                          animate={{ height: isPlaying ? [5, height, 5] : 5 }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.8 + (i % 5) * 0.2,
                            ease: 'easeInOut',
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Big Center Play/Pause circle overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-brand-yellow text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all focus:outline-none"
                    aria-label={isPlaying ? "Pause testimonial audio" : "Play testimonial audio"}
                  >
                    {isPlaying ? <Pause size={30} className="fill-current" /> : <Play size={30} className="fill-current translate-x-1" />}
                  </button>
                </div>

                {/* Player top bar info */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-black/60 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-brand-lime" />
                    <span className="font-mono text-xs text-white">TESTIMONIAL AUDIO FEEDBACK: LIVE</span>
                  </div>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="text-text-secondary hover:text-white bg-white/10 hover:bg-white/20 p-1 rounded-full transition-colors focus:outline-none"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Integrated Player Control Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
                  {/* Seek timeline */}
                  <div className="w-full h-1 bg-white/15 rounded-full cursor-pointer relative overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-brand-yellow rounded-full" 
                      style={{ width: `${progress}%` }} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-brand-yellow transition-colors"
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </button>

                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:text-brand-yellow transition-colors"
                      >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>

                      <span className="font-mono text-[10px] text-text-secondary">
                        0:{progress < 10 ? `0${Math.floor(progress * 0.15)}` : Math.floor(progress * 0.15)} / 1:45
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/20">
                      <Sparkles size={10} />
                      {activeVideo.metrics}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Text Section */}
              <div className="p-6 sm:p-8 bg-[#111114]">
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src={activeVideo.avatarImg}
                    alt={activeVideo.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-white/10 shadow-lg"
                  />
                  <div>
                    <h4 className="font-display text-white text-lg font-bold">
                      {activeVideo.name}
                    </h4>
                    <span className="text-brand-yellow font-mono text-xs">
                      {activeVideo.channelName} • YouTube Partner
                    </span>
                  </div>
                </div>

                {/* Absolute Quotes */}
                <p className="text-[#F8FAFC] text-sm leading-relaxed bg-[#19191c]/80 p-5 rounded-2xl border border-white/5 whitespace-pre-wrap italic opacity-95">
                  "{activeVideo.quote}"
                </p>

                <div className="mt-6 flex justify-between items-center text-xs text-text-secondary border-t border-white/5 pt-4">
                  <span>Role: Multi-million views creator</span>
                  <span className="font-mono text-[10px] text-brand-lime">AUTHENTICATED STRATEGY CASE</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
