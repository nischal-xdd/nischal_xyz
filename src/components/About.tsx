import { motion } from 'motion/react';
import { User, Award, Eye, Play } from 'lucide-react';

export default function About() {
  return (
    <section 
      id="about" 
      className="w-full px-5 sm:px-8 lg:px-12 py-32 max-w-7xl mx-auto overflow-hidden"
    >
      {/* SECTION 1: Who am I */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24 mb-40 relative">
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Section Marker */}
          <div className="flex items-center gap-2 mb-4">
            <User size={16} className="text-brand-yellow" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              Nischal Adhikari
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-8 tracking-tighter" id="about-who-title">
            Who am I ?
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#F8FAFC]/90 leading-relaxed font-sans font-normal" id="about-who-content">
            <p>
              Hey, I'm <strong className="text-white">Nischal Adhikari</strong>! I'm a 20-year-old{' '}
              <strong className="text-brand-yellow">Visual Strategist</strong> with over 3.5 years of 
              high-growth experience in this dynamic, fast-evolving YouTube economy.
            </p>
            <p>
              I’ve had the unique opportunity to work with some of the most prominent, household creators on YouTube. 
              Through meticulous optimization, I've mastered the deliberate science and visual psychology of crafting 
              strategically designed thumbnails that drive massive conversion rates.
            </p>
          </div>
        </div>

        {/* Nischal Portrait in Lime Circular Wrapper */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="portrait-circle bg-brand-lime"
            id="who-portrait-container"
          >
            {/* Large semi-transparent background letters */}
            <div className="absolute inset-0 flex items-center justify-center opacity-25 font-display text-[150px] font-bold text-black tracking-widest select-none pointer-events-none">
              NA
            </div>

            {/* Profile image that overflows slightly out of the circle */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdRFydfg6WDPQuFOT-VpJlWBXWBEvoko0RMkyPYL44xg0PWvYVMjepPoa1NV9FEB_vSnxhapHDef8F4JOR34dXMNtzP9Bsb64Hnrv8MpIfDx8yO-YoFW_fnGVZYqFMCO4_3XFtUkv8tfEHF2lp3hXbO2n2lbPJylmdFegIV4Mf8O8rq0lS9xGWRq60ePDH9TghCNxhIQnGSzhP1vl6icDJnb0ktOj9jIZ1IalPtuH2juZFPtk75o7xvCN4SFNJ-H18P_lSFaToXI8" 
              alt="Portrait of Nischal Adhikari" 
              referrerPolicy="no-referrer"
              className="relative z-10 w-[85%] h-auto md:w-[90%] object-contain select-none -translate-y-5 filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: Why me */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-24 relative">
        
        {/* Decorative Skewed Accent Box */}
        <div className="absolute -left-5 -bottom-16 w-1.5 h-32 bg-brand-yellow transform -skew-x-12 hidden md:block" />

        {/* Nischal Portrait in Purple Circular Wrapper */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="portrait-circle bg-brand-purple"
            id="why-portrait-container"
          >
            {/* Repeating "Creative" text backgrounds */}
            <div className="absolute inset-0 flex items-center justify-center opacity-15 font-display text-[35px] font-bold text-black tracking-widest leading-tight text-center break-words p-4 select-none pointer-events-none uppercase">
              Creative<br />Creative<br />Creative
            </div>

            {/* Profile image that overflows */}
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHuc44fNKyxEg6NOIazq4eY_bfBsswqNNZjXyJqiP_c_aYfFyP2rmXipmcVnuxO1jVpY-_ppuqxSOTHAoL_lnuE39FLSezh5s2PFI5pMc0dp5jkCncXe1UxQl-0McgGtykRtjNlI70Gnjfd_C_lnaMGxeRWLutkJS9bgXaOOZEQU7d5AwwGY_tkqhZrGzSKVmmOWeiBJnV9ZQwWmQO5_1d2vjJlod6tkx4Dhg1ttjUPNdTqnfSVt7ZAsFQvtbtUz75-Hof4Qaf_JQ" 
              alt="Nischal Adhikari Portfolio Work Pose" 
              referrerPolicy="no-referrer"
              className="relative z-10 w-[85%] h-auto md:w-[90%] object-contain select-none -translate-y-4 filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.55)]"
            />
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Section Marker */}
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-brand-yellow" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">
              Delivering Metrics
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-yellow mb-8 tracking-tighter" id="about-why-title">
            Why me ?
          </h2>

          <div className="space-y-6 text-base sm:text-lg text-[#F8FAFC]/90 leading-relaxed font-sans font-normal" id="about-why-content">
            <p>
              If you just want basic 'good-looking' graphics, thousands of freelance designers can do that. 
              But if you want <strong className="text-brand-yellow">purposeful packaging layout</strong> that actually hooks users, 
              sparks high curiosity quotients, and drives clicks to convert viewers: that is where my work shines.
            </p>
            <p className="border-l-2 border-brand-yellow pl-4 font-semibold text-white">
              I have strategically generated more than <span className="text-brand-yellow font-display text-2xl">400 million+ views</span> for channels globally in the last three years.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
