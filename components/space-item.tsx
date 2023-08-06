import Link from "next/link"
import SpaceOperations from "./space-operations"

type SpaceItem = {
    spaceId: string;
    userId: string;
    accessLevel: number;
    space: {
        name: string;
        description: string | null;
    }
}

export default function SpaceItem({ spaceItem, dashboards }: {spaceItem: SpaceItem, dashboards: {id: string}[]}) {
  
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 dark:!border-border-dark">
        <div className="grid">
          <Link
            href={`/space/${spaceItem.spaceId}${(dashboards.length > 0 ) ? `/dashboard/${dashboards[0].id}` : ""}`}
            className="font-semibold text-lg md:text-xl text-primary decoration-1 dark:text-primary-dark hover:underline underline-offset-4 transition"
          >
            {spaceItem.space.name}
          </Link>
          <div>
            <p className="min-h-[20px] font-light text-secondary dark:text-secondary-dark">
              {spaceItem.space.description}
            </p>
          </div>
        </div>
        <SpaceOperations spaceItem={spaceItem}/>
      </div>
    </>
  )
}