import Modal from "@/components/ui/modal";

export default async function CardModal({ params }: { params: { cardId: string } }) {

  return (
    <Modal>
     <h1>{params.cardId}</h1>
    </Modal>
  )
}