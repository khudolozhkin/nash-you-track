

export default async function Card({ params }: { params: { cardId: string } }) {
  
  return (
    <>
     <h2>Current card {params.cardId}</h2>
    </>
  )
}
