'use client'

import Button from "./ui/button"
import { Icons } from "./ui/icons"
import { useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { DialogTrigger, DialogOverlay, DialogContent } from "@/components/ui/dialog"

export default function SpaceCreateButton() {
  
  return (
    <Dialog.Root>
      <DialogTrigger>
        <Button><Icons.add className="mr-2" size={20}/> Создать</Button>
      </DialogTrigger>
      <Dialog.Portal>
        <DialogOverlay>
          <DialogContent>
            
          </DialogContent>
        </DialogOverlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}