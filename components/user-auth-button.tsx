"use client"
import { signIn } from "next-auth/react"
import Button from "./ui/button"

export default function UserAuthButton() {
  return (
    <>
      <Button onClick={() => {
          signIn("google")
          }
        }>
        Войти
      </Button>
    </>
  )
}