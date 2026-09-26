import React from 'react';
import { AMENITIES } from '../data/amenities';
import { SectionHeading } from '../components/SectionHeading';
import { OptimizedImage } from '../components/OptimizedImage';
import {
  Waves,
  Sparkles,
  Dumbbell,
  Briefcase,
  SunDim,
  ShieldCheck,
  Car,
  Wifi,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Waves,
  Sparkles,
  Dumbbell,
  Briefcase,
  SunDim,
  ShieldCheck,
  Car,
  Wifi,
};

export const Amenities: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-20 sm:pb-24 bg-[#F8F6F1] dark:bg-[#0E0E11] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeading
          subtitle="Hospitality & Leisure"
          title="Curated Lifestyle Amenities"
          description="Designed to support restorative wellness, effortless connectivity, and serene leisure across 24 floors of architectural excellence in Islamabad."
        />

        {/* Featured Hero Visual for Amenities */}
        <div className="relative border border-[#E5E0D8] dark:border-[#2C2A26] overflow-hidden mb-12 sm:mb-16 shadow-xl max-h-[460px]">
          <OptimizedImage
            src="/src/assets/images/amenity_rooftop_pool_1790449648998.jpg"
            alt="Aurelia Grand Rooftop Infinity Pool"
            aspectRatio="16/9"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-5 sm:p-10 pointer-events-none">
            <div className="text-white space-y-1.5 sm:space-y-2 max-w-xl">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                Level 22 Wellness
              </span>
              <h3 className="text-xl sm:text-3xl font-serif-luxury font-normal leading-tight">
                Rooftop Horizon Pool & Margalla Sunset Sanctuary
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light line-clamp-2 sm:line-clamp-none">
                Temperature-regulated waters framed against the Margalla hills, complete with daybeds and twilight cocktail service.
              </p>
            </div>
          </div>
        </div>

        {/* Amenities Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {AMENITIES.map((amenity) => {
            const IconComponent = iconMap[amenity.icon] || Sparkles;
            return (
              <div
                key={amenity.id}
                className="bg-white dark:bg-[#16161A] border border-[#E5E0D8] dark:border-[#2C2A26] p-5 sm:p-8 flex flex-col justify-between space-y-4 sm:space-y-6 hover:border-[#A67C52]/60 dark:hover:border-[#C5A880]/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#F8F6F1] dark:bg-[#111114] border border-[#E5E0D8] dark:border-[#2C2A26] text-[#A67C52] dark:text-[#C5A880] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 sm:w-6 h-5 sm:h-6" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-stone-400 dark:text-stone-500">
                      {amenity.location}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A67C52] dark:text-[#C5A880] font-semibold block">
                      {amenity.subtitle}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif-luxury text-[#171717] dark:text-[#FAF8F5] mt-1">
                      {amenity.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A39E93] font-light leading-relaxed">
                    {amenity.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="pt-2 sm:pt-3 border-t border-[#E5E0D8]/60 dark:border-[#2C2A26] space-y-1 sm:space-y-1.5">
                    {amenity.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[#E5E0D8] dark:border-[#2C2A26] flex items-center gap-2 text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#A67C52] dark:text-[#C5A880] shrink-0" />
                  <span>{amenity.hours}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
