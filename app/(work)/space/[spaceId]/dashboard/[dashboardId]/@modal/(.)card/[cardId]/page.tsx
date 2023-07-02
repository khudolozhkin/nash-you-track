import Modal from "@/components/ui/modal"

export default function CardModal({ params }: { params: { cardId: string } }) {

  return (
    <Modal>
      <h1>Card: {params.cardId}</h1>
    </Modal>
  )
}