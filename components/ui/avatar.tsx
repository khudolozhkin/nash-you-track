import Image from "next/image"

export default function Avatar({ url, w, h }: { url?: string | null | undefined, w: number, h: number }) {

  return (
    <Image 
      src={(url != undefined) ? url : ""}
      width={w}
      height={h}
      alt="Avatar"
      className={`object-cover object-fill rounded-full w-[${w}px] h-[${h}px] h-fit`}
    />
  )
}