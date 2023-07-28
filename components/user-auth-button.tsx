"use client"
import { signIn } from "next-auth/react"
import Button from "./ui/button"
import { useState } from "react"
import { Icons } from "./ui/icons"

export default function UserAuthButton() {
  const [login, setLogin] = useState<boolean>(false)
  
  return (
    <>
      <Button onClick={() => {
          setLogin(true)
          signIn("google")
          }
        }>
        {(login) ? <Icons.loader className="animate-spin mr-2" size={20}/> : <></>}
        Войти
      </Button>
    </>
  )
}