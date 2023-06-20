

export default async function Dashboard({ params }: { params: { cardId: string } }) {
  
  return (
    <>
     <h2>Current card {params.cardId}</h2>
    </>
  )
}
