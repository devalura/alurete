import React, { useState, createContext, useContext, ReactNode } from 'react';
import styles from './Tabs.module.css';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

export interface TabsProps {
  /**
   * Valor da tab ativa
   */
  value?: string;
  
  /**
   * Valor padrão da tab ativa (não controlado)
   */
  defaultValue?: string;
  
  /**
   * Callback chamado quando a tab ativa muda
   */
  onValueChange?: (value: string) => void;
  
  /**
   * Conteúdo das tabs
   */
  children: ReactNode;
  
  /**
   * Classe CSS adicional
   */
  className?: string;
}

export interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export interface TabsTriggerProps {
  /**
   * Valor único da tab
   */
  value: string;
  
  /**
   * Ícone à esquerda
   */
  leftIcon?: ReactNode;
  
  /**
   * Ícone à direita
   */
  rightIcon?: ReactNode;
  
  /**
   * Conteúdo da tab
   */
  children: ReactNode;
  
  /**
   * Desabilitar a tab
   */
  disabled?: boolean;
  
  className?: string;
}

export interface TabsContentProps {
  /**
   * Valor da tab que exibe este conteúdo
   */
  value: string;
  
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  const isControlled = controlledValue !== undefined;
  const activeTab = isControlled ? controlledValue : internalValue;
  
  const setActiveTab = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`${styles.root} ${className || ''}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div className={`${styles.list} ${className || ''}`} role="tablist">
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;
  
  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };
  
  const triggerClasses = [
    styles.trigger,
    isActive && styles.triggerActive,
    disabled && styles.triggerDisabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  
  return (
    <button
      className={triggerClasses}
      onClick={handleClick}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span className={styles.label}>{children}</span>
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const { activeTab } = useTabsContext();
  
  if (activeTab !== value) {
    return null;
  }
  
  return (
    <div className={`${styles.content} ${className || ''}`} role="tabpanel">
      {children}
    </div>
  );
};

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
