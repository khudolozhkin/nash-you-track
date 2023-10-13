import * as AlertDialog from '@radix-ui/react-alert-dialog';

export function AlertOverlay({ children }: { children?: React.ReactNode }) {
  return (
    <AlertDialog.Overlay className="
    fixed
    z-1111
    flex
    items-center
    justify-center
    left-0
    right-0
    top-0
    bottom-0
    mx-auto
    backdrop-blur-sm
    bg-general-background-dark/60
    dark:bg-general-background-dark/60
    data-[state=open]:animate-fadeBackground
    flex
    items-center   
    justify-center
    " style={{zIndex: 1111}}> {children} </AlertDialog.Overlay>
  )
}

export function AlertContent({ children }: { children: React.ReactNode }) {
  return (
    <AlertDialog.Content className="data-[state=open]:animate-scale
    max-h-[85vh]
    max-w-[550px]
    scale-[90%]
    md:scale-[100%]
    rounded-md
    bg-brand-background
    dark:bg-brand-background-dark
    p-[25px]
    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
    focus:outline-none
    z-60
    items-center
    justify-center
    border
    border-border
    dark:border-border-dark
    ">
      {children}
    </AlertDialog.Content>
  )
}