"use client"
import { signIn } from "next-auth/react"

export default function UserAuthButton() {
  return (
    <>
      <button
        className="dark:text-red"
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