'use client'
import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
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
      className="fixed flex items-center justify-center z-1000 left-0 right-0 top-0 bottom-0 mx-auto backdrop-blur-sm bg-black/60"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="
        bg-white
        min-h-full
        md:min-h-[calc(100%-32px-env(safe-area-inset-top)-env(safe-area-inset-bottom))]
        overflow-hidden
        mt-[calc(16px+env(safe-area-inset-top))]
        mb-[calc(16px+env(safe-area-inset-bottom))]
        max-w-[1360px]
        w-full
        md:w-[calc(100%-64px)]
        rounded
        ease-in duration-300
        "
      >
        {children}
      </div>
    </div>
  )
}