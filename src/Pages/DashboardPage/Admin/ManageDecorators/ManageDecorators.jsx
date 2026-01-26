import React from "react";
import Heading from "../../../../Components/Shared/Heading/Heading";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Shared/Loading/Loading";
import toast from "react-hot-toast";
import { useState } from "react";
import Swal from "sweetalert2";
import EditUserModal from "../../../../Components/Modal/EditUserModal";
import { FaBan, FaCheckCircle, FaEdit, FaSearch, FaTrashAlt, FaUserShield } from "react-icons/fa";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 5;
  const [editUser, setEditUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", page, limit, search],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: {
          page,
          limit,
          search,
        },
      });
      return res.data;
    },
  });
  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;
  const handleMakeDecorator = async (id) => {
    try {
      await axiosSecure.put(`users/${id}/make-decorator`);
      toast.success("Users promoted to decorator successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to make a decorator");
    }
  };
  const handleApprove = async (id) => {
    try {
      await axiosSecure.put(`users/${id}/approve`);
      toast.success("Decorator approved!");
      refetch();
    } catch (error) {
      toast.error("Failed to approve decorator");
    }
  };
  const handleDisable = async (id) => {
    try {
      await axiosSecure.put(`users/${id}/disable`);
      toast.success("Decorator disabled!");
      refetch();
    } catch (error) {
      toast.error("Failed to disable decorator");
    }
  };
  const handleEdit = async (id, updatedData) => {
    try {
      await axiosSecure.put(`/users/${id}`, updatedData);
      toast.success("User info updated!");
      refetch();
      setEditUser(null);
    } catch (error) {
      toast.error("Failed to update user info");
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
   const getRoleBadge = (role) => {
    const badges = {
      admin: "bg-purple-100 text-purple-700 border-purple-200",
      decorator: "bg-blue-100 text-blue-700 border-blue-200",
      user: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return badges[role] || badges.user;
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: "bg-green-100 text-green-700 border-green-200",
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      disabled: "bg-red-100 text-red-700 border-red-200",
    };
    return badges[status] || "bg-gray-100 text-gray-500 border-gray-200";
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen space-y-6">
            <title>Laxius Decor || Manage Decorators</title> 

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
                  <Heading title="Manage Decorators" subtitle='Manage user roles, approve decorators, and control access' center />

         
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-neutral" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-11 pr-4 py-3 border border-base-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral font-medium">Total Users</p>
              <p className="text-2xl font-bold text-accent mt-1">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral font-medium">Decorators</p>
              <p className="text-2xl font-bold text-accent mt-1">
                {users.filter(u => u.role === "decorator").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral font-medium">Pending</p>
              <p className="text-2xl font-bold text-accent mt-1">
                {users.filter(u => u.status === "pending").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral font-medium">Approved</p>
              <p className="text-2xl font-bold text-accent mt-1">
                {users.filter(u => u.status === "approved").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden border border-base-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b-2 border-primary/20">
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  SL.
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-100">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-accent font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <img
                        src={user?.photoURL}
                        alt={user?.displayName}
                        className="h-12 w-12 rounded-full object-cover border-2 border-base-200 shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-base-100 rounded-full"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-neutral">
                      {user.displayName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getRoleBadge(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadge(
                        user.status
                      )}`}
                    >
                      {user.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {user.role === "user" && (
                        <button
                          onClick={() => handleMakeDecorator(user._id)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-secondary text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <FaUserShield />
                          Make Decorator
                        </button>
                      )}
                      {user.role === "decorator" && user.status === "pending" && (
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <FaCheckCircle />
                          Approve
                        </button>
                      )}
                      {user.role === "decorator" && user.status === "approved" && (
                        <button
                          onClick={() => handleDisable(user._id)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <FaBan />
                          Disable
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setEditUser(user);
                          setIsOpen(true);
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <FaEdit />
                        Edit
                      </button>
                       {isOpen && editUser && (
                    <EditUserModal
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      user={editUser}
                      onSubmit={handleEdit}
                    />
                  )}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <FaTrashAlt />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-16">
            <div className="text-neutral text-6xl mb-4">👤</div>
            <h3 className="text-lg font-semibold text-accent mb-2">
              No users found
            </h3>
            <p className="text-neutral text-sm">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex gap-2 justify-center items-center bg-base-100 rounded-xl shadow-md p-4 border border-base-100">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <div className="flex gap-1">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-4 py-2 font-semibold rounded-lg transition-all duration-200 ${
                page === num + 1
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-neutral hover:bg-gray-200"
              }`}
            >
              {num + 1}
            </button>
          ))}
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageDecorators;
