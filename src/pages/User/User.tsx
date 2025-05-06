import { TUser } from "@/redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import EditProfile from "./component/EditProfile";
import UserSkeleton from "@/components/skeleton/UserSkeleton";

const User = () => {
  const loggedUser = useAppSelector((state) => state.auth.user) as TUser;
  const { data: userData, isLoading } = useGetUserByEmailQuery(
    loggedUser?.email
  );
  const user = userData?.data[0];

  if (isLoading) return <UserSkeleton />;

  return (
    <div className="card bg-black/80 text-white shadow-sm">
      <h2 className="text-center text-4xl font-bold p-6">user Info</h2>
      <div className="flex gap-6">
        <figure className="px-10 py-10">
          <img
            src={user?.avatar}
            alt="avatar"
            className="rounded-xl h-[400px]"
          />
        </figure>
        <div className="card-body  px-10 py-10">
          <div className="flex gap-6">
            <div className="py-2">
              <div>
                <label className="label-text text-2xl font-extrabold text-blue-500">
                  Name
                </label>
                <h3 className="text-xl font-bold ">{user?.name}</h3>
              </div>
              <div className="py-2">
                <label className="label-text text-2xl font-extrabold text-blue-500">
                  Phone
                </label>
                <h3 className="text-xl font-bold ">{user?.phone}</h3>
              </div>
              <div className="py-2">
                <label className="label-text text-2xl font-extrabold text-blue-500">
                  E-mail
                </label>
                <h3 className="text-xl font-bold ">{user?.email}</h3>
              </div>
              <div className="py-2">
                <label className="label-text text-2xl font-extrabold text-blue-500">
                  Address
                </label>
                <h3 className="text-xl font-bold ">{user?.address}</h3>
              </div>
            </div>
            <div>
              <EditProfile user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
