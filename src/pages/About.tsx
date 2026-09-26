import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { OptimizedImage } from '../components/OptimizedImage';
import { MapPin, Sparkles, Building, Compass, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-[#F8F6F1] dark:bg-[#0E0E11] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          subtitle="The Concept & Philosophy"
          title="A Sanctuary Above the Capital"
          description="Aurelia Grand is designed as a modern urban retreat combining contemporary architecture, calm interiors and thoughtful hospitality in the heart of Islamabad."
        />

        {/* Story Section with Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
              Architectural Concept
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] font-normal leading-tight">
              Crafted around tranquility, natural light and quiet proportions.
            </h2>
            <p className="text-xs sm:text-base text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              In a bustling federal capital surrounded by the timeless Margalla mountain ranges, Aurelia Grand was envisioned as a tranquil haven. The design philosophy embraces warm earth tones, tactile stone, brushed bronze, and acoustic calm.
            </p>
            <p className="text-xs sm:text-base text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Every space—from the light-dappled grand arrival foyer to the private corner suites—prioritizes spaciousness, uninterrupted sightlines, and genuine human care over superficial ornament.
            </p>

            <div className="p-5 sm:p-6 bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] space-y-2 transition-colors">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#A67C52] dark:text-[#C5A880] font-semibold">
                Design Ethos
              </span>
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic font-serif-luxury text-sm sm:text-base">
                "True hospitality is not loud; it is the quiet anticipation of what brings a traveler peace, ease, and renewal."
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-[#E5E0D8] dark:border-[#2C2A26] bg-white dark:bg-[#16161A] p-2 shadow-2xl transition-colors">
              <OptimizedImage
                src="/src/assets/images/hero_hotel_facade_1790449575779.jpg"
                alt="Aurelia Grand Hotel Architecture"
                aspectRatio="4/3"
                priority={true}
              />
              <div className="p-3 sm:p-4 bg-[#F8F6F1] dark:bg-[#111114] border-t border-[#E5E0D8] dark:border-[#2C2A26] text-center">
                <span className="text-xs font-serif-luxury text-[#171717] dark:text-[#FAF8F5] block">
                  Aurelia Grand Hotel · Islamabad, Pakistan
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#777777] dark:text-[#A39E93]">
                  Concept Design & Architecture Prototype
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Design Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-6 sm:p-8 space-y-3 sm:space-y-4 transition-colors">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-[#A67C52] dark:text-[#C5A880] flex items-center justify-center">
              <Building className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Contemporary Architecture</h3>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Clean geometric lines, expansive double-glazed curtain walls, and thermal stone that harmonizes with Islamabad’s verdant surroundings.
            </p>
          </div>

          <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-6 sm:p-8 space-y-3 sm:space-y-4 transition-colors">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-[#A67C52] dark:text-[#C5A880] flex items-center justify-center">
              <Sparkles className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Calm & Tactile Interiors</h3>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Organic bouclé textiles, solid walnut cabinetry, unpolished travertine, and soothing acoustic dampening for deep rest.
            </p>
          </div>

          <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-6 sm:p-8 space-y-3 sm:space-y-4 transition-colors">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-[#A67C52] dark:text-[#C5A880] flex items-center justify-center">
              <HeartHandshake className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">Thoughtful Hospitality</h3>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
              Attentive hosts, tailored dining experiences, and seamless digital booking engineered with frictionless elegance.
            </p>
          </div>
        </div>

        {/* Capital Location Section */}
        <div id="location" className="bg-[#171717] text-white p-6 sm:p-12 lg:p-16 border border-stone-800 shadow-xl mb-12 sm:mb-16">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Federal Capital Setting</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif-luxury">
              Located in the Diplomatic & Cultural Heart of Islamabad
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Situated within easy reach of the diplomatic quarter, Serena cultural gardens, and Margalla hiking trails, Aurelia Grand offers effortless access to both business headquarters and picturesque natural retreats.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 sm:pt-4 border-t border-stone-800 text-xs text-stone-400">
              <div>
                <strong className="text-stone-200 block mb-1">Airport Transit:</strong>
                <span>30 minutes via Srinagar Highway from Islamabad International Airport (ISB).</span>
              </div>
              <div>
                <strong className="text-stone-200 block mb-1">Attractions Nearby:</strong>
                <span>Faisal Mosque, Daman-e-Koh, Saidpur Heritage Village, Margalla Trail 3.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Showcase Disclaimer */}
        <div className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-6 sm:p-10 text-center space-y-4 max-w-3xl mx-auto transition-colors">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
            Portfolio Showcase
          </span>
          <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5]">
            Concept Project by SH Web Studio
          </h3>
          <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] leading-relaxed max-w-xl mx-auto">
            This website is a portfolio concept demonstration created by <strong>SH Web Studio</strong> to showcase high-tier web craftsmanship, modern React architecture, and responsive UX design for luxury hospitality clients.
          </p>
          <div className="pt-2">
            <Link
              to="/booking"
              className="inline-block px-7 sm:px-8 py-3 bg-[#171717] dark:bg-[#A67C52] hover:bg-[#A67C52] dark:hover:bg-[#8C653E] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
            >
              Test Demo Booking Flow
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
