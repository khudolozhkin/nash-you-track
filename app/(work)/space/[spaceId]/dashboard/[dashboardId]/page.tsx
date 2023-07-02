"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation'


export default async function Dashboard({ params }: { params: { dashboardId: string } }) {
  const pathname = usePathname();

  return (
    <>
     <h2>Current dashboard {params.dashboardId}</h2>
     <Link href={`${pathname}/card/dada`}>CardModal</Link>
    </>
  )
}
