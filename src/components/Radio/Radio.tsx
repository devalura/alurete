import React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showInfo?: boolean;
  onInfoClick?: () => void;
  auxiliaryButton?: {
    text: string;
    onClick: () => void;
  };
}

export const Radio: React.FC<RadioProps> = ({
  label,
  showInfo = false,
  onInfoClick,
  auxiliaryButton,
  className,
  disabled,
  ...props
}) => {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <label className={`inline-flex items-center gap-2 cursor-pointer relative ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}>
        <input
          type="radio"
          className="absolute opacity-0 w-0 h-0 focus-visible:outline-2 focus-visible:outline-[var(--color-blue-400)] focus-visible:outline-offset-2"
          disabled={disabled}
          {...props}
        />
        <span className={`relative w-[22px] h-[22px] border border-solid border-[#c7d2fe] rounded-full bg-[var(--color-white)] transition-all flex-shrink-0 flex items-center justify-center ${!disabled ? 'hover:border-[var(--color-blue-400)]' : 'bg-[var(--color-gray-100)] border-[var(--color-gray-300)]'} [&:has(+input:checked)]:border-[var(--color-blue-400)]`}>
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-blue-400)] opacity-0 scale-0 transition-all [input:checked~span>&]:opacity-100 [input:checked~span>&]:scale-100"></span>
        </span>
        
        {label && (
          <span className="font-[var(--font-title)] text-base font-medium text-[var(--color-body)] select-none">
            {label}
          </span>
        )}
        
        {showInfo && !disabled && (
          <button
            type="button"
            className="inline-flex items-center justify-center bg-none border-none p-1 cursor-pointer text-[var(--color-body)] transition-colors hover:text-[var(--color-blue-400)]"
            onClick={onInfoClick}
            aria-label="More information"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="5" r="0.75" fill="currentColor" />
            </svg>
          </button>
        )}
      </label>
      
      {auxiliaryButton && !disabled && (
        <button
          type="button"
          className="font-[var(--font-title)] text-base font-medium text-[var(--color-blue-400)] bg-none border-none p-0 cursor-pointer transition-opacity hover:opacity-80"
          onClick={auxiliaryButton.onClick}
        >
          {auxiliaryButton.text}
        </button>
      )}
    </div>
  );
};
