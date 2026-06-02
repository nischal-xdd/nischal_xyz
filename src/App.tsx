/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import CreatorMarquee from './components/CreatorMarquee';
import About from './components/About';
import FeaturedThumbnails from './components/FeaturedThumbnails';
import VideoTestimonials from './components/VideoTestimonials';
import WrittenTestimonials from './components/WrittenTestimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-[#F8FAFC] antialiased select-auto font-sans flex flex-col relative" id="portfolio-root">
      {/* Dynamic Labeled Top Navigation Frame */}
      <Header />

      {/* Main Container Viewport */}
      <main className="flex-1 w-full flex flex-col pt-[80px]">
        {/* Hero Interactive Marquee Stage */}
        <Hero />

        {/* Endless Partner Logotypes Row */}
        <CreatorMarquee />

        {/* Deep dive: Who am I & Why Nischal strategy highlights */}
        <About />

        {/* Grid: Selected thumbnails case studies list and lightbox */}
        <FeaturedThumbnails />

        {/* Frame: Videos feedback from client hosts */}
        <VideoTestimonials />

        {/* Carousel slide: Traditional written recommendations */}
        <WrittenTestimonials />

        {/* Contact direct Whatsapp pre-populator request block */}
        <ContactForm />
      </main>

      {/* Labeled footer credits block */}
      <Footer />
    </div>
  );
}
