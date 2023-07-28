'use client'

export default function Button({ children, onClick }: { children: React.ReactNode, onClick?: any }) {
  return (
    <button
        className="flex items-center hover:bg-hover-item dark:hover:bg-hover-item-dark leading-9 font-normal rounded-lg px-4 bg-brand-background text-primary dark:text-primary-dark dark:bg-brand-background-dark transition-colors"
        type="button"
        onClick={onClick}
    >
      {children}
    </button>
  )
}