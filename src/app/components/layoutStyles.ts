// Shared layout styles using Tailwind classes
export const layoutClasses = {
  container: "min-h-screen flex flex-col",
  
  header: "flex justify-between items-center px-6 py-4 bg-[var(--color-surface-secondary)] border-b-[var(--border-width)] border-solid border-[var(--color-border-default)] fixed top-0 left-0 right-0 z-[100] backdrop-blur-[8px] h-16",
  
  headerLeft: "flex items-center gap-4",
  
  headerRight: "flex items-center gap-6",
  
  menuButton: "hidden md:hidden bg-none border-none text-2xl cursor-pointer text-[var(--color-text-title)] p-2 rounded-[var(--border-radius)] transition-colors hover:bg-[var(--color-surface-subtle)] max-md:block",
  
  title: "font-[var(--font-family-brand)] text-xl no-underline text-[var(--color-text-title)] hover:text-[var(--color-brand-default)] max-md:text-lg",
  
  sidebar: "fixed top-16 left-0 bottom-0 w-[250px] bg-[var(--color-surface-secondary)] border-r-[var(--border-width)] border-solid border-[var(--color-border-default)] overflow-y-auto z-[90] transition-transform duration-300 max-md:-translate-x-full",
  
  sidebarOpen: "translate-x-0",
  
  nav: "py-6",
  
  navSection: "mb-6",
  
  navGroup: "px-6 py-2 text-xs font-bold uppercase tracking-wide text-[var(--color-text-body)] mb-2",
  
  navItem: "block w-full py-2 px-6 text-left bg-none border-none border-l-[3px] border-solid border-transparent text-sm text-[var(--color-text-body)] cursor-pointer transition-all font-sans no-underline hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-title)]",
  
  navItemActive: "bg-[var(--color-surface-brand)] text-[var(--color-brand-default)] border-l-[var(--color-brand-default)] font-semibold",
  
  overlay: "hidden max-md:block fixed top-16 left-0 right-0 bottom-0 bg-black/50 z-[85]",
  
  main: "flex-1 ml-[250px] pt-16 max-md:ml-0"
};
