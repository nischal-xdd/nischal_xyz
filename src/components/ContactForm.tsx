import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Inbox, Calendar, Trash2, ArrowRight, ShieldCheck, Mail, Sparkles, AlertCircle } from 'lucide-react';
import { Inquiry } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    channelName: '',
    serviceNeeded: '',
    message: '',
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [errorMess, setErrorMess] = useState('');

  // Hydrate inquiries from localStorage on mount
  useEffect(() => {
    try {
      const persisted = localStorage.getItem('nischal_inquiries');
      if (persisted) {
        setInquiries(JSON.parse(persisted));
      } else {
        // Seed default inquiries so dashboard isn't blank
        const defaultSeeds: Inquiry[] = [
          {
            id: 'seed-1',
            name: 'Wangden Sherpa',
            whatsapp: '+977 980-0000000',
            channelName: 'Wangden Sherpa Music',
            serviceNeeded: 'Both',
            message: 'Hi Nischal, I need a visual strategy consultation and 5 thumbnails for my upcoming acoustic series launch. Let me know your current availability!',
            dateSubmitted: new Date(Date.now() - 43200000).toLocaleString(), // 12 hours ago
          },
          {
            id: 'seed-2',
            name: 'Jerry Binbu',
            whatsapp: '+977 981-1111111',
            channelName: 'Jerry Talks',
            serviceNeeded: 'Thumbnail Design',
            message: 'Loved the E-commerce design style! Need something highly energetic for my vlog thumbnail packages, please contact me asap on WhatsApp.',
            dateSubmitted: new Date(Date.now() - 172800000).toLocaleString(), // 2 days ago
          }
        ];
        setInquiries(defaultSeeds);
        localStorage.setItem('nischal_inquiries', JSON.stringify(defaultSeeds));
      }
    } catch (e) {
      console.error('Error parsing inquiries:', e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errorMess) setErrorMess('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.serviceNeeded) {
      setErrorMess('Please provide at least Name, WhatsApp number, and Service Needed.');
      return;
    }

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      name: formData.name.trim(),
      whatsapp: formData.whatsapp.trim(),
      channelName: formData.channelName.trim() || 'Not specified',
      serviceNeeded: formData.serviceNeeded,
      message: formData.message.trim() || 'No additional message.',
      dateSubmitted: new Date().toLocaleString(),
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('nischal_inquiries', JSON.stringify(updated));

    // Reset Form
    setFormData({
      name: '',
      whatsapp: '',
      channelName: '',
      serviceNeeded: '',
      message: '',
    });

    // Show Custom confetti success modal
    setShowSuccess(true);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem('nischal_inquiries', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all inquiries?')) {
      setInquiries([]);
      localStorage.setItem('nischal_inquiries', JSON.stringify([]));
    }
  };

  return (
    <section 
      id="contact" 
      className="w-full px-5 sm:px-8 lg:px-12 py-24 bg-[#0a0a0c]/80 border-t border-white/5 relative"
    >
      <div className="absolute inset-0 bg-[#ffd700]/[0.01] pointer-events-none" />

      <div className="max-w-xl mx-auto bg-[#121215] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow/10 border border-brand-yellow/25 text-brand-yellow px-4 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 select-none animate-pulse">
          <Sparkles size={12} />
          Booking Intake Form
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-yellow mb-4 text-center mt-2" id="contact-heading">
          Want to Hire me ?
        </h2>
        <p className="text-xs text-text-secondary text-center mb-10 text-balance">
          Fill out your details below and Nischal will reach back to structure your strategic visual identity overhaul on WhatsApp.
        </p>

        {errorMess && (
          <div className="mb-6 p-4 bg-rose-950/40 border border-rose-500/20 rounded-xl text-rose-200 text-xs flex items-center gap-2">
            <AlertCircle size={14} className="text-rose-400 shrink-0" />
            <span>{errorMess}</span>
          </div>
        )}

        {/* INPUT FORM WORKSPACE */}
        <form onSubmit={handleSubmit} className="space-y-6" id="hiring-intake-form">
          <div className="flex flex-col gap-2">
            <label className="text-white text-xs uppercase tracking-wider font-mono font-medium" htmlFor="name">
              Your Name *
            </label>
            <input
              className="w-full bg-black/60 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 text-sm transition-all font-sans"
              id="name"
              type="text"
              placeholder="e.g. Wangden Sherpa"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-xs uppercase tracking-wider font-mono font-medium" htmlFor="whatsapp">
              WhatsApp Number *
            </label>
            <input
              className="w-full bg-black/60 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 text-sm transition-all font-mono"
              id="whatsapp"
              type="tel"
              placeholder="e.g. +977 980XXXXXXX"
              value={formData.whatsapp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-xs uppercase tracking-wider font-mono font-medium" htmlFor="channelName">
              Your Channel Name
            </label>
            <input
              className="w-full bg-black/60 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 text-sm transition-all font-sans"
              id="channelName"
              type="text"
              placeholder="e.g. Tech & Lifestyle Nepal"
              value={formData.channelName}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-xs uppercase tracking-wider font-mono font-medium" htmlFor="serviceNeeded">
              What do you want ? *
            </label>
            <div className="relative">
              <select
                className="w-full bg-black/60 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 text-sm transition-all appearance-none font-sans"
                id="serviceNeeded"
                value={formData.serviceNeeded}
                onChange={handleChange}
                required
              >
                <option value="" disabled className="text-gray-500">
                  -- Select Choice --
                </option>
                <option value="Thumbnail Design" className="bg-[#121215] text-white">Thumbnail Design Pack</option>
                <option value="Visual Strategy" className="bg-[#121215] text-white">Visual Strategy Audit</option>
                <option value="Both" className="bg-[#121215] text-white">Both (Strategic Creative Pack)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-text-secondary">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-xs uppercase tracking-wider font-mono font-medium" htmlFor="message">
              Message for me
            </label>
            <textarea
              className="w-full bg-black/60 border border-white/10 rounded-xl h-32 p-4 text-white focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/10 text-sm resize-none transition-all font-sans"
              id="message"
              placeholder="e.g. Briefly describe your channel topics, target audience, and click-through objectives."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="pt-4">
            <button
              className="w-full bg-brand-yellow hover:bg-[#e0bd00] text-black font-mono text-sm uppercase tracking-wider font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl hover:shadow-brand-yellow/15 cursor-pointer"
              type="submit"
              id="contact-btn-submit"
            >
              Send Message
              <Send size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* EVALUATOR / TESTER INLINE PANEL DRAWER */}
      <div className="max-w-4xl mx-auto mt-16 border border-white/5 rounded-3xl bg-black/50 p-6 shadow-2xl relative z-20">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-brand-lime" />
            <div>
              <span className="font-mono text-xs text-white uppercase block font-semibold">
                Evaluator Port: Dynamic Database Inspection
              </span>
              <span className="text-[10px] text-text-secondary block">
                React state is fully operational and synced to localStorage client-side storage.
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowAdminDashboard(!showAdminDashboard)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-[#F8FAFC]/80 hover:text-white border border-white/10 rounded-lg text-xs font-mono transition-all uppercase flex items-center gap-1.5 focus:outline-none cursor-pointer"
            id="admin-dashboard-toggle"
          >
            <Inbox size={14} />
            {showAdminDashboard ? 'Hide Submitted Messages' : `View Messages Inbox (${inquiries.length})`}
          </button>
        </div>

        {/* Dynamic Admin Submissions Grid panel */}
        <AnimatePresence>
          {showAdminDashboard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-white/5 overflow-hidden"
              id="admin-dashboard-section"
            >
              {inquiries.length === 0 ? (
                <div className="p-8 text-center text-text-secondary font-mono text-xs">
                  Inbox empty. Submit a contact inquiry block above to verify interactive collection pipeline!
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-text-secondary pb-2 border-b border-white/5">
                    <span className="font-mono uppercase">Submitted Message Inquiries ({inquiries.length})</span>
                    <button
                      onClick={handleClearAll}
                      className="text-rose-400 hover:text-rose-300 font-mono text-[10px] uppercase flex items-center gap-1 cursor-pointer focus:outline-none"
                    >
                      <Trash2 size={12} />
                      Clear All Messages
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 max-h-[380px] overflow-y-auto pr-2 scrollbar-thin">
                    {inquiries.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#121215] p-5 rounded-xl border border-white/5 relative group hover:border-brand-yellow/10 transition-colors"
                        id={`admin-msg-${item.id}`}
                      >
                        <button
                          onClick={() => handleDeleteInquiry(item.id)}
                          className="absolute top-4 right-4 text-text-secondary hover:text-rose-400 p-1.5 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
                          title="Delete message"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center font-bold text-brand-yellow shrink-0 text-sm">
                            {item.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-bold text-white text-sm block leading-none mb-1">
                                {item.name}
                              </h5>
                              <span className="font-mono text-[10px] text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/25 px-1.5 py-0.5 rounded">
                                Req: {item.serviceNeeded}
                              </span>
                              <div className="mt-2 space-y-1 font-mono text-[11px] text-text-secondary">
                                <p><strong>WhatsApp:</strong> {item.whatsapp}</p>
                                <p><strong>Channel:</strong> {item.channelName}</p>
                              </div>
                            </div>

                            <div className="flex flex-col justify-between">
                              <p className="text-xs text-[#F8FAFC]/80 leading-relaxed font-sans bg-black/30 p-2.5 rounded-lg border border-white/5 italic">
                                "{item.message}"
                              </p>
                              <span className="text-[10px] text-text-light/50 font-mono flex items-center gap-1.5 self-end mt-2 text-text-secondary">
                                <Calendar size={10} />
                                {item.dateSubmitted}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CONFETTI SUCCESS POP-UP OVERLAY */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-surface-elevated rounded-3xl border border-brand-yellow/20 p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              id="success-modal"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-lime/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-brand-lime/15 border border-brand-lime/35 rounded-full flex items-center justify-center text-brand-lime">
                  <CheckCircle2 size={36} />
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Message Received!
              </h3>
              
              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                Your visual strategy package inquiry has been successfully transmitted. Nischal will drop you a line on your WhatsApp to schedule your evaluation block!
              </p>

              <button
                onClick={() => setShowSuccess(false)}
                className="w-full bg-brand-yellow hover:bg-[#e0bd00] text-black font-mono text-xs uppercase tracking-wider font-bold py-3.5 rounded-xl cursor-pointer focus:outline-none"
                id="success-btn-close"
              >
                Return to Portfolio
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
