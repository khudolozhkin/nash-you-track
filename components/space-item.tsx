import Link from "next/link"
import SpaceOperations from "./space-operations"

type SpaceItem = {
  spaceItem: {
    spaceId: string;
    userId: string;
    accessLevel: number;
    space: {
        name: string;
        description: string | null;
    }
  }
}

export default function SpaceItem({ spaceItem }: SpaceItem) {
  
  return (
    <>
      <div className="flex items-center justify-between p-4 dark:!border-border-dark">
        <div className="grid gap-1">
          <Link
            href={`/space/${spaceItem.spaceId}`}
            className="font-semibold text-lg md:text-xl text-primary decoration-1 dark:text-primary-dark hover:underline underline-offset-4 transition"
          >
            {spaceItem.space.name}
          </Link>
          <div>
            <p className="md:text-lg min-h-[28px] font-light text-secondary dark:text-secondary-dark">
              {spaceItem.space.description}
            </p>
          </div>
        </div>
        <SpaceOperations />
      </div>
    </>
  )
}