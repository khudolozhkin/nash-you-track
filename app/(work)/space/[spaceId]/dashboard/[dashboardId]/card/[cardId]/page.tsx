export default async function CardPage({ params }: { params: { cardId: string } }) {

  return (
    <>
     <h1>{params.cardId}</h1>
    </>
  )
}