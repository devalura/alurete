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
      '24': 'w-6 h-6 text-xs leading-4 tracking-normal',
      '32': 'w-8 h-8 text-sm leading-[18px] tracking-normal',
      '40': 'w-10 h-10 text-base leading-5 tracking-normal',
      '110': 'w-[110px] h-[110px] text-5xl leading-[60px] tracking-[-0.02em]',
    };
    
    const baseClasses = 'relative flex items-center justify-center rounded-full overflow-hidden font-[var(--font-family-display)] font-bold';
    const bgClass = !src ? 'bg-[var(--color-blue-100)]' : '';

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
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-[var(--color-brand-default)]">
            {initials}
          </span>
        )}
        {size === '110' && src && (
          <div className="absolute inset-[-0.5px] rounded-full shadow-[0_0_16px_8px_rgba(0,0,0,0.3)] pointer-events-none" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
