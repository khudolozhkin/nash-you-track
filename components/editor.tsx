"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import EditorJS from "@editorjs/editorjs"
import { Prisma } from "@prisma/client"

// import "@/styles/editor.css"

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

export function Editor({ card }: {card: EditorProps}) {
  const ref = React.useRef<EditorJS>()
  const router = useRouter()
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

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

  

  return (
      <div className="w-full">
        <div className="prose prose-stone dark:prose-invert">
          <div id="editor" className="min-h-[300px] !max-w-[768px]" />
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