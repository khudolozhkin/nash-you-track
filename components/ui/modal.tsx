'use client'
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Icons } from './icons'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const close = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
         onDismiss()
      }
    },
    [onDismiss, overlay]
  )

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' || e.target === close.current) { 
        onDismiss() 
      }
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="
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
      will-change-[opacity,transform]
      animate-fadeBackground
      "
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="
        bg-brand-background
        dark:bg-brand-background-dark
        min-h-full
        rounded-sm
        ease-in duration-300
        md:min-h-[calc(100%-32px-env(safe-area-inset-top)-env(safe-area-inset-bottom))]
        overflow-hidden
        mt-[calc(16px+env(safe-area-inset-top))]
        mb-[calc(16px+env(safe-area-inset-bottom))]
        max-w-[1360px]
        w-full
        md:w-[calc(100%-64px)]
        will-change-[opacity,transform]
        animate-slideUpAndFade
        "
      >
        <Icons.close onClick={onKeyDown} ref={close} className="
          relative
          left-[calc(100%-30px)]
          top-[5px]
          cursor-pointer
        "
        />
        {children}
      </div>
    </div>
  )
}