"use client"

import { signOut } from "next-auth/react"
import Button from "./ui/button"

export default function UserLogoutButton() {
  return (
    <>
      <Button onClick={() => {
        signOut({
          callbackUrl: `${window.location.origin}/login`,
        })
      }}>Выйти</Button>
    </>
  )
}