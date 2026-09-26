import React from 'react';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${className}`}>
      {subtitle && (
        <span
          className={`block text-xs uppercase tracking-[0.25em] font-medium mb-3 ${
            dark ? 'text-[#A67C52]' : 'text-[#A67C52]'
          }`}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight font-serif-luxury ${
          dark ? 'text-[#F8F6F1]' : 'text-[#171717] dark:text-[#FAF8F5]'
        }`}
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed font-light ${
            isCenter ? 'mx-auto' : ''
          } ${dark ? 'text-stone-300' : 'text-[#666666] dark:text-[#A39E93]'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
