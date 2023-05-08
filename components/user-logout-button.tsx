"use client"

import { signOut } from "next-auth/react"

export default function UserLogoutButton() {
  return (
    <>
      <button onClick={() => {
        signOut({
          callbackUrl: `${window.location.origin}/login`,
        })
      }}>Выйти</button>
    </>
  )
}