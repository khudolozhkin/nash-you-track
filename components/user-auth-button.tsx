"use client"
import { getCurrentUser } from "@/lib/session"
import { signIn } from "next-auth/react"

export default function UserAuthButton() {
  return (
    <>
      <button
        type="button"
        onClick={() => {
          signIn("google")
        }
        }
      >
        Google
      </button>
    </>
  )
}