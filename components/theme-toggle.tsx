"use client"

import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme } = useTheme()
  
  return (
    <>
      <button onClick={() => {setTheme("light")}}>
        Light
      </button>
      <button onClick={() => {setTheme("dark")}}>
        Dark
      </button>
      <button onClick={() => {setTheme("system")}}>
        System
      </button>
    </>
  )
}