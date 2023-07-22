import Image from "next/image"

export default function Avatar({ url }: { url?: string | null | undefined }) {
  console.log(url)
  return (
    <Image 
      src={(url != undefined) ? url : ""}
      width={35}
      height={35}
      alt="Avatar"
      className="object-cover rounded-full"
    />
  )
}