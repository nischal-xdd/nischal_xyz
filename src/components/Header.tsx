import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, User, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'My Work', href: '#featured' },
  { name: 'About Me', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact Me', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll offset
      const offsets = navLinks.map(link => {
        const id = link.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return { id, top: Math.abs(rect.top), visible: rect.top < 300 && rect.bottom > 100 };
        }
        return { id, top: Infinity, visible: false };
      });

      const visible = offsets.find(o => o.visible);
      if (visible) {
        setActiveSection(visible.id);
      } else {
        // Fallback to closest
        const closest = [...offsets].sort((a, b) => a.top - b.top)[0];
        if (closest && closest.top < window.innerHeight) {
          setActiveSection(closest.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-header py-4 bg-black/90 shadow-2xl' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a 
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="font-display text-2xl font-bold tracking-tighter text-brand-yellow hover:scale-105 transition-transform"
          id="nav-logo"
        >
          NA
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isLinkActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`font-mono text-sm uppercase tracking-wider relative py-1 transition-colors duration-300 ${
                  isLinkActive ? 'text-brand-yellow font-semibold' : 'text-text-secondary hover:text-text-primary'
                }`}
                id={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
              >
                {link.name}
                {isLinkActive && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-yellow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Button / Admin Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
            className="font-mono text-xs uppercase tracking-widest px-5 py-2.5 bg-brand-yellow hover:bg-[#e0bd00] text-black font-semibold rounded-full hover:shadow-lg hover:shadow-brand-yellow/10 transition-all duration-300"
            id="nav-cta-hire"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-primary hover:text-brand-yellow transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
          id="nav-mobile-toggle"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-header w-full overflow-hidden absolute top-full left-0 z-40 bg-black/95 shadow-xl border-t border-white/5"
            id="nav-mobile-menu"
          >
            <div className="flex flex-col px-6 py-8 gap-5">
              {navLinks.map((link) => {
                const isLinkActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`font-mono text-base uppercase tracking-widest py-2 border-b border-white/5 flex justify-between items-center ${
                      isLinkActive ? 'text-brand-yellow font-bold' : 'text-text-secondary'
                    }`}
                    id={`nav-mobile-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <span>{link.name}</span>
                    {isLinkActive && (
                      <span className="w-2 h-2 rounded-full bg-brand-yellow" />
                    )}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={(e) => handleClick(e, '#contact')}
                className="w-full text-center mt-4 bg-brand-yellow hover:bg-[#e0bd00] text-black uppercase tracking-widest text-sm font-mono font-bold py-3.5 rounded-full shadow-lg transition-colors duration-300"
                id="nav-mobile-cta"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
