"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { Prisma } from "@prisma/client"
import { toast } from "react-hot-toast"
import { ErrorToast, SuccessToast } from "./ui/toast"

import "@/styles/editor.css"

type EditorProps = {
  name: string;
  content: Prisma.JsonValue;
  column: {
      table: {
          dashboard: {
              spaceId: string;
          };
      };
  };
}

export function Editor({ card, cardId }: {card: EditorProps, cardId: string}) {
  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isMounted, setIsMounted] = React.useState<boolean>(false)
  let typeTimer

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const Checklist = require('@editorjs/checklist');

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Пиши здесь...",
        inlineToolbar: true,
        //@ts-ignore
        data: card.content,
        tools: {
          header: Header,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          checklist: Checklist
        },
      })
    }
  }, [card])

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function saveCardTimer(delay: number) {
    if (typeTimer == undefined) {
      typeTimer = setTimeout(saveCard, delay)
    } 
    else {
      await clearTimeout(typeTimer)
      typeTimer = setTimeout(saveCard, delay)
    }
  }

  async function saveCard() {
  
    const blocks = await ref.current?.save()
    
    let data = JSON.stringify({
      content: blocks
    })
    
    const response = await fetch(`/api/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data
    })

    if (response.status != 200) {
      
      toast.custom((t) => (
        <ErrorToast t={t} header={`Не удалось сохранить документ`}/>
      ))
    }

    if (response.status == 200) {
      let responseBody = await response.json()
    }
  }

  return (
      <div className="w-full">
        <div className="prose prose-stone dark:prose-invert max-w-[768px]">
          <div id="editor" onClick={(e) => {saveCardTimer(4000)}} onKeyUp={(e) => {saveCardTimer(1500)}} className="" />
          <p className="text-sm text-gray-500">
            Используйте{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            чтобы открыть командное меню.
          </p>
        </div>
      </div>
  )
}