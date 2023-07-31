'use client'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownMenu = DropdownMenuPrimitive.Root

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuGroup = DropdownMenuPrimitive.Group

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal

export const DropdownMenuSub = DropdownMenuPrimitive.Sub

export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenuRadioTrigger = DropdownMenuPrimitive.Trigger

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenuPrimitive.Content className="m-1 max-w-[300px] bg-general-background dark:bg-brand-background-dark rounded-md p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade">
      {children}
    </DropdownMenuPrimitive.Content>
  )
}

export function DropdownMenuItem({ children, onSelect, asChild }: { children: React.ReactNode, onSelect?: any, asChild?: boolean }) {
  return (
    <DropdownMenuPrimitive.Item asChild={asChild} onSelect={onSelect} className="cursor-pointer relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors focus:bg-hover-item dark:focus:bg-hover-item-dark data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
      {children}
    </DropdownMenuPrimitive.Item>
  )
}

export function DropdownMenuSeparator() {
  return (
    <DropdownMenuPrimitive.Separator className="-mx-1 my-1 h-px bg-hover-item dark:bg-hover-item-dark" />
  )
}