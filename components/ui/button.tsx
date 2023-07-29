'use client'

export default function Button({ children, onClick, className }: { children: React.ReactNode, onClick?: any, className?: any }) {
  return (
    <button
        className={`flex items-center hover:bg-hover-item dark:hover:bg-hover-item-dark leading-9 font-normal rounded-lg px-4 bg-brand-background text-primary dark:text-primary-dark dark:bg-brand-background-dark transition-colors ${className}`}
        type="button"
        onClick={onClick}
    >
      {children}
    </button>
  )
}

export function AlternativeButton({ children, onClick, className }: { children: React.ReactNode, onClick?: any, className?: any }) {
  return (
    <button
        className={`flex items-center hover:bg-primary-dark hover:text-primary dark:hover:bg-primary-dark dark:hover:text-primary leading-9 font-normal rounded-lg px-4 bg-primary text-primary-dark dark:text-primary-dark dark:bg-primary transition-colors ${className}`}
        type="button"
        onClick={onClick}
    >
      {children}
    </button>
  )
}