import { db } from "@/lib/db"
import { Icons } from "@/components/ui/icons"


export default async function Space({ params }: { params: { spaceId: string } }) {
  const space = await db.space.findFirst({
    where: {
      id: params.spaceId,
    },
    select: {
      name: true
    }
  })

  return (
    <>
      <div className="flex justify-center items-center w-full">
      <div className="flex min-h-[200px] h-[60%] min-w-[300px] max-w-[1000px] w-[60%] flex-col items-center justify-center rounded-md border border-border dark:border-border-dark p-8 text-center animate-in fade-in-50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-background dark:bg-brand-background-dark">
              <Icons.arrowLeft size={50} />
            </div>
            <h1 className="font-semibold text-xl md:text-2xl text-primary dark:text-primary-dark">Добро пожаловать в пространство {space?.name}</h1>
            <p className="mb-4 text-lg font-light text-secondary dark:text-secondary-dark">Используйте меню слева для его настройки и продолжения работы</p>
          </div>
      </div> 
    </>
  )
}
