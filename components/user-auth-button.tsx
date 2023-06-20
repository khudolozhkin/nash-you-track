"use client"
import { signIn } from "next-auth/react"

export default function UserAuthButton() {
  return (
    <>
      <button
        className="text-black dark:text-white"
        type="button"
        onClick={() => {
          signIn("google")
        }
        }
      >
        Войти
      </button>
    </>
  )
}