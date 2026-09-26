import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-28 pb-24 bg-[#F8F6F1] px-4">
      <div className="max-w-md w-full bg-white border border-[#E5E0D8] p-8 text-center space-y-6 shadow-sm">
        <span className="text-xs uppercase tracking-[0.25em] text-[#A67C52] font-semibold block">
          404 Not Found
        </span>
        <h1 className="text-3xl font-serif-luxury text-[#171717]">
          Sanctuary Not Located
        </h1>
        <p className="text-xs sm:text-sm text-[#777777] font-light leading-relaxed">
          The requested page or room record is unavailable. Please return to our main hotel directory.
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] hover:bg-[#A67C52] text-white text-xs uppercase tracking-[0.16em] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
