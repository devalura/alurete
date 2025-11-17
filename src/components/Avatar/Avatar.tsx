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
      '24': 'w-6 h-6',
      '32': 'w-8 h-8',
      '40': 'w-10 h-10',
      '110': 'w-[110px] h-[110px]'
    };

    const initialsSizeClasses = {
      '24': 'text-xs leading-4',
      '32': 'text-sm leading-[18px]',
      '40': 'text-base leading-5',
      '110': 'text-[40px] leading-[44px]'
    };

    return (
      <div
        ref={ref}
        className={`relative inline-flex items-center justify-center rounded-full border-[0.5px] border-[var(--color-border-default)] overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${!src ? 'bg-[#e3f2fd]' : ''} ${className || ''}`}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || name} className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" />
        ) : (
          <span className={`font-sans font-medium text-[var(--color-brand-default)] text-center ${initialsSizeClasses[size]}`}>{initials}</span>
        )}
        {size === '110' && src && (
          <div className="absolute inset-[-0.5px] shadow-[inset_0_0_10px_7px_rgba(1,12,83,0.4)] pointer-events-none rounded-full" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
