import Avatar from "./ui/avatar"
import UserRole from "./user-role"
import InviteDelete from "./invite-delete"

type InviteItem = {
  id: string,
  userId: string,
  accessLevel: number,
  active: boolean,
  user: {
      name: string | null;
      email: string | null;
      image: string | null;
  };
}

export default function SpaceInviteItem({ inviteItem, spaceId }: { inviteItem: InviteItem, spaceId: string }) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 dark:!border-border-dark">
        <div className="flex items-center">
          <Avatar url={inviteItem.user.image} w={40} h={40}/>
          <div className="grid ml-2">
            <h2 className="font-semibold text-lg md:flex md:text-xl text-primary decoration-1 dark:text-primary-dark underline-offset-4 transition">
              {inviteItem.user.name} {inviteItem.active ? <UserRole spaceId={spaceId} userId={inviteItem.userId} changeable={false} accessLevel={inviteItem.accessLevel}/> : <>
              <div
                className={`flex text-sm items-center font-base md:ml-4 rounded-lg px-1 max-h-[28px]`}
                style={{background: '#9b1f1f', color: '#ffb1b1'}}
              >
                Отказ
              </div>
              </>}
            </h2>
            <div>
              <p className="min-h-[20px] font-light text-secondary dark:text-secondary-dark">
                {inviteItem.user.email}
              </p>
            </div>
          </div>
        </div>
        {(inviteItem.accessLevel < 7) ? <InviteDelete inviteId={inviteItem.id} userId={inviteItem.userId} accessLevel={inviteItem.accessLevel}/> : <></>}
      </div>
    </>
  )
}