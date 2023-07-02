export const metadata = {
  title: 'Create App',
  description: 'Generated by create next app',
}

export default function WorkspaceLayout({
  children
}: {
  children: React.ReactNode
}) {
  
  
  return (
    <>
      <h1>Header</h1>
      {children}
    </>
  )
}