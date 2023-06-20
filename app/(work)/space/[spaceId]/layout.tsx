

export default async function SpaceLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {
    spaceId: string
  }
}) {
  
  return (
    <>
     <h2>Current space {params.spaceId}</h2>
     {children}
    </>
  )
}
