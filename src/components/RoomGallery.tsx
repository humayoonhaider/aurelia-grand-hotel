import React, { useState, useEffect, useCallback } from 'react';
import { OptimizedImage } from './OptimizedImage';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface RoomGalleryProps {
  images: string[];
  roomName: string;
  initialIndex?: number;
}

export const RoomGallery: React.FC<RoomGalleryProps> = ({
  images,
  roomName,
  initialIndex = 0,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Safe fallback if images array is empty
  const activeList = images.length > 0 ? images : ['/images/hero_hotel_facade_1790449575779.jpg'];
  const currentImage = activeList[selectedIndex] || activeList[0];

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? activeList.length - 1 : prev - 1));
  }, [activeList.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === activeList.length - 1 ? 0 : prev + 1));
  }, [activeList.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  // Body scroll lock during lightbox
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Primary Display with Zoom Trigger & Blur-up */}
      <div className="relative border border-[#E5E0D8] dark:border-[#2C2A26] bg-white dark:bg-[#16161A] group overflow-hidden shadow-lg">
        <OptimizedImage
          src={currentImage}
          alt={`${roomName} - View ${selectedIndex + 1}`}
          aspectRatio="16/10"
          priority={true}
          className="transition-transform duration-500 group-hover:scale-102"
        />

        {/* Counter Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
          <span className="bg-[#171717]/85 backdrop-blur-sm text-stone-200 text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-1 font-mono">
            {selectedIndex + 1} / {activeList.length}
          </span>
        </div>

        {/* Lightbox Expand Button */}
        <button
          type="button"
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-[#171717]/80 hover:bg-[#171717] text-white p-2 backdrop-blur-sm transition-all duration-200 opacity-90 hover:opacity-100 hover:scale-105 shadow-md flex items-center gap-1.5 text-[11px] uppercase tracking-wider"
          title="Open Fullscreen Gallery"
          aria-label="Open Fullscreen Gallery"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px]">Fullscreen</span>
        </button>

        {/* Floating Prev/Next arrows on main view */}
        {activeList.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="pointer-events-auto bg-[#171717]/70 hover:bg-[#171717] text-white p-2 backdrop-blur-xs transition-transform hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="pointer-events-auto bg-[#171717]/70 hover:bg-[#171717] text-white p-2 backdrop-blur-xs transition-transform hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnail Reel with Blur-up Placeholders & Active State */}
      {activeList.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
          {activeList.map((img, idx) => {
            const isActive = selectedIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative border overflow-hidden transition-all duration-200 text-left ${
                  isActive
                    ? 'border-[#A67C52] ring-2 ring-[#A67C52]/50 shadow-sm'
                    : 'border-[#E5E0D8] dark:border-[#2C2A26] opacity-75 hover:opacity-100 hover:border-stone-400 dark:hover:border-stone-500'
                }`}
                aria-label={`Select photo ${idx + 1}`}
              >
                <OptimizedImage
                  src={img}
                  alt={`${roomName} thumbnail ${idx + 1}`}
                  aspectRatio="16/10"
                  className={isActive ? 'scale-105' : ''}
                />
                {isActive && (
                  <div className="absolute inset-0 border-2 border-[#A67C52] pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))',
            paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
            paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
            paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
          }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10 px-2 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-3 truncate">
              <span className="font-serif-luxury text-sm sm:text-xl text-stone-200 truncate">
                {roomName}
              </span>
              <span aria-hidden="true" className="text-stone-600">·</span>
              <span className="text-xs font-mono text-stone-400 shrink-0">
                {selectedIndex + 1} of {activeList.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 text-stone-400 hover:text-white bg-stone-900/80 hover:bg-stone-800 transition-colors shrink-0 min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Close lightbox"
            >
              <X className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>

          {/* Central Image Container */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <OptimizedImage
              src={currentImage}
              alt={`${roomName} large preview`}
              priority={true}
              containerClassName="max-h-[75vh] max-w-5xl w-full h-full flex items-center justify-center"
              className="max-h-[75vh] w-auto max-w-full object-contain mx-auto shadow-2xl"
            />

            {/* Lightbox Navigation Controls */}
            {activeList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-stone-900/80 hover:bg-[#A67C52] text-white p-3 sm:p-4 transition-all hover:scale-110 shadow-lg"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-stone-900/80 hover:bg-[#A67C52] text-white p-3 sm:p-4 transition-all hover:scale-110 shadow-lg"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails Strip */}
          {activeList.length > 1 && (
            <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto py-2 px-4 no-scrollbar">
              {activeList.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative w-16 sm:w-20 h-10 sm:h-14 shrink-0 overflow-hidden border transition-all ${
                    selectedIndex === idx
                      ? 'border-[#A67C52] ring-2 ring-[#A67C52]'
                      : 'border-stone-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <OptimizedImage
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    aspectRatio="16/10"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
