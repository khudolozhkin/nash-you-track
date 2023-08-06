export default function Dashboard({ params }: { params: { spaceId: string } }) {

  return (
    <>
     <h1>Settings {params.spaceId}</h1>
    </>
  )
}
