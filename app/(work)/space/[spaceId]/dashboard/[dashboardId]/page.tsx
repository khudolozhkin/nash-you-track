"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'


export default function Dashboard({ params }: { params: { dashboardId: string } }) {
  const pathname = usePathname();

  return (
    <>
     <Link href={`${pathname}/card/dada`}>CardModal</Link>
    </>
  )
}
