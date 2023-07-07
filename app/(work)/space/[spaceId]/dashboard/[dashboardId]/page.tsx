"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'


export default function Dashboard({ params }: { params: { dashboardId: string } }) {
  const pathname = usePathname();

  return (
    <>
     <Link href={`http://localhost:3000/space/dada/dashboard/dada/card/dada`}>CardModal</Link>
    </>
  )
}
