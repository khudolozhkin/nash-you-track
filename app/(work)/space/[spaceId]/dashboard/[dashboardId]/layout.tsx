

export const metadata = {
  title: 'Dada',
  description:
    'A sample Next.js app showing dynamic routing with modals as a route.',
  metadataBase: new URL('https://nextgram.vercel.app'),
}

export default function DashboardLayout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  )
}
