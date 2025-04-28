import { useAllUsersQuery } from "@/redux/features/user/userApi";
import { TUserDetail } from "@/types/user";

const Users = () => {
  const { data: users } = useAllUsersQuery("");

  return (
    <div
      style={{
        backgroundImage:
          "url(https://i.postimg.cc/3xhFNrF5/Screenshot-2025-04-27-061224.png)",
      }}
    >
      <div className="text-xl font-bold text-center py-6">
        <h2>Users</h2>
        <h2>Total Users: {users?.data?.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="">
            <tr className="bg-blue-950">
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user: TUserDetail) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={user.avatar} />
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>{user?.role}</td>
                <th>
                  <button
                    // onClick={() => handleDeleteUser(user)}
                    className="btn btn-outline btn-success"
                  >
                    add
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
