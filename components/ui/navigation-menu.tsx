'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'

export function NavigationMenuContent({ children, align }: { children: React.ReactNode, align?: any }) {
  return (
    <NavigationMenu.Content className="left-[50%] mt-2 translate-x-[-50%] border border-border dark:border-border-dark max-w-[300px] bg-general-background dark:bg-brand-background-dark rounded-md p-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[state=open]:animate-scaleIn absolute">
      {children}
    </NavigationMenu.Content>
  )
}