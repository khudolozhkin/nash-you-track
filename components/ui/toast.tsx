import { Icons } from "./icons"


export function SuccessToast({t, header, p} : {t: any, header: string, p?: string}) {
  
  return (
    <>
      <div
          className={`${
            t.visible ? 'animate-toasterIn' : 'animate-toasterOut'
          }
          ${
            t.visible ? 'opacity-1' : 'opacity-0'
          }
          max-w-md bg-brand-background dark:bg-brand-background-dark shadow-lg rounded-md pointer-events-auto flex border border-border dark:border-dark`}
        >
          <div className="flex-1 w-fit p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Icons.success />  
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-primary dark:text-primary-dark">
                  {header}
                </p>
                <p className="mt-1 text-sm text-secondary dark:secondary-dark">
                  {p}
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export function ErrorToast({t, header, p} : {t: any, header: string, p?: string}) {
  
  return (
    <>
      <div
          className={`${
            t.visible ? 'animate-toasterIn' : 'animate-toasterOut'
          }
          ${
            t.visible ? 'opacity-1' : 'opacity-0'
          }
          max-w-md bg-delete dark:bg-delete-dark shadow-lg rounded-md pointer-events-auto flex border border-border dark:border-dark`}
        >
          <div className="flex-1 w-fit p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <Icons.error className="text-primary-dark"/>  
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-primary-dark">
                  {header}
                </p>
                <p className="mt-1 text-sm text-primary-dark">
                  {p}
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}