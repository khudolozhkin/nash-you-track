import Avatar from "./ui/avatar"
import UserKick from "./user-kick";
import UserRole from "./user-role";

type UserItem = {
  userId: string;
  accessLevel: number;
  user: {
      name: string | null;
      email: string | null;
      image: string | null;
  };
}

export default function SpaceUserItem({ userItem, spaceId }: { userItem: UserItem, spaceId: string }) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 dark:!border-border-dark">
        <div className="flex items-center">
          <Avatar url={userItem.user.image} w={40} h={40}/>
          <div className="grid ml-2">
            <h2 className="font-semibold text-lg md:flex md:text-xl text-primary decoration-1 dark:text-primary-dark underline-offset-4 transition">
              {userItem.user.name} <UserRole spaceId={spaceId} userId={userItem.userId} changeable={(userItem.accessLevel < 7)} accessLevel={userItem.accessLevel}/>
            </h2>
            <div>
              <p className="min-h-[20px] font-light text-secondary dark:text-secondary-dark">
                {userItem.user.email}
              </p>
            </div>
          </div>
        </div>
        {(userItem.accessLevel < 7) ? <UserKick spaceId={spaceId} userId={userItem.userId} accessLevel={userItem.accessLevel}/> : <></>}
      </div>
    </>
  )
}