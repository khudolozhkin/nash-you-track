'use client'

import * as Dialog from '@radix-ui/react-dialog';

export function DialogTrigger({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Trigger asChild>
      {children}
    </Dialog.Trigger>
  )
}

export function DialogOverlay({ children }: { children?: React.ReactNode }) {
  return (
    <Dialog.Overlay className="
    fixed
    z-50
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
    "> {children} </Dialog.Overlay>
  )
}

export function DialogClose({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Close asChild>
      {children}
    </Dialog.Close>
  )
}

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Content className="data-[state=open]:animate-slideUpAndFade 
    max-h-[85vh]
    max-w-[550px]
    rounded-md
    bg-brand-background
    dark:bg-brand-background-dark
    p-[25px]
    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
    focus:outline-none
    z-60
    items-center
    justify-center
    ">
      {children}
    </Dialog.Content>
  )
}