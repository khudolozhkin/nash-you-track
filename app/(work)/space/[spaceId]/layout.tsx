
export default function DashboardLayout(props: { children: React.ReactNode, params: {spaceId: string } }) {
  return (
    <>
      <h2>Current space {props.params.spaceId}</h2>
      {props.children}
    </>
  )
}

