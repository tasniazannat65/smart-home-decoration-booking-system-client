import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useRole from "../../../../Hooks/useRole";
import Loading from "../../../../Components/Shared/Loading/Loading";

const Profile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <title>Laxius Decor || Profile</title>
      <div className="bg-base-200 shadow-lg rounded-xl border border-primary/30 w-full max-w-3xl p-6">
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-primary"
          />
          <p
            className={`mt-2 px-3 py-1 rounded-full text-white ${
              role === "admin"
                ? "bg-primary"
                : role === "decorator"
                ? "bg-secondary"
                : "bg-green-500"
            }`}
          >
            {role.toUpperCase()}
          </p>
        </div>
        <div className="mt-4 space-y-2 text-center">
          <p>
            <span className="font-semibold">Name: </span>
            {user?.displayName}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {user?.email}
          </p>
        </div>
        <div
          className={`mt-6 grid gap-2 ${
            role === "user"
              ? "grid-cols-2"
              : role === "decorator"
              ? "grid-cols-3"
              : "grid-cols-2"
          }`}
        >
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Update Profile
          </button>
          {(role === "user" || role === "decorator") && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Change Password
            </button>
          )}
          {role === "admin" && (
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Manage Users
            </button>
          )}
          {role === "decorator" && (
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              My services
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
