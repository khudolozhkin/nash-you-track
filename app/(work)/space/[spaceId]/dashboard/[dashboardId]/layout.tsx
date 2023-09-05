

export default function dashboardLayout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  )
}
