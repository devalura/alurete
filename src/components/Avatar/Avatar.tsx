import React, { forwardRef } from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: '24' | '32' | '40' | '110';
  src?: string;
  alt?: string;
  name?: string;
}

const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ size = '40', src, alt, name = '', className, ...props }, ref) => {
    const initials = !src && name ? getInitials(name) : '';
    
    const sizeClasses = {
      '24': 'size-[24px]',
      '32': 'size-[32px]',
      '40': 'size-[40px]',
      '110': 'size-[110px]',
    };

    const textClasses = {
      '24': 'text-[12px] leading-[16px] h-[18px] w-[24px] left-[12px] top-[3px]',
      '32': 'text-[14px] leading-[20px] h-[20px] w-[32px] left-[16px] top-[6px]',
      '40': 'text-[16px] leading-[24px] h-[24px] w-[40px] left-[20px] top-[8px]',
      '110': 'text-[48px] leading-[40px] h-[54px] w-[110px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center',
    };
    
    const baseClasses = 'relative rounded-[var(--radius-pill,9999px)] border-[0.5px] border-[var(--color-border-default,#c7d2fe)] border-solid';
    const bgClass = !src ? 'bg-[#e3f2fd]' : '';

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${bgClass} ${className || ''}`}
        {...props}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt || name} 
            className="absolute inset-0 max-w-none object-cover object-center pointer-events-none rounded-[var(--radius-pill,9999px)] size-full"
          />
        ) : (
          <p className={`absolute font-[family-name:var(--font-family-sans,'Open_Sans:Regular',sans-serif)] font-[var(--font-weight-font-medium,500)] text-[color:var(--color-brand-default,#1d4ed8)] text-center tracking-[var(--letter-spacing-tracking-normal,0px)] -translate-x-1/2 ${textClasses[size]}`}>
            {initials}
          </p>
        )}
        {size === '110' && src && (
          <div className="absolute inset-[-0.5px] shadow-[0px_0px_10px_7px_inset_rgba(1,12,83,0.4)] rounded-[var(--radius-pill,9999px)]" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
