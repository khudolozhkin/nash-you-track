export default function WorkspaceLayout({
  children,
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