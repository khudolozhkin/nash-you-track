import CardTypeAdd from "./card-type-add"
import useSWRImmutable, { mutate } from 'swr'

type Card = {
  name: string;
  content: JSON;
  Type: {
    id: string;
    name: string;
    color: string;
  } | null;
  column: {
      table: {
          dashboard: {
              spaceId: string;
          };
      };
  };
} | null

const fetcher = (url) => fetch(url).then(res => res.json())

export default function CardType({card, spaceId, cardId}: {card: Card, spaceId: string, cardId: string}) {
  const { data, error, isValidating} = useSWRImmutable(`/api/cards/${cardId}/types`, fetcher)
  
  if (data) {
    
    return (
      <div className="w-full mt-1">
        <div className="text-lg font-medium flex items-center">Тип карточки:
          <div className="">
            <CardTypeAdd card={card} types={data} cardId={cardId}/>
          </div>
        </div>
      </div>
    )
  }
}