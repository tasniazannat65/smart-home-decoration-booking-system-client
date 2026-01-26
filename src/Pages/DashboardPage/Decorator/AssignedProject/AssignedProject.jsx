import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Shared/Loading/Loading";
import toast from "react-hot-toast";
import Heading from "../../../../Components/Shared/Heading/Heading";
import { FaCalendarAlt, FaClipboardList, FaDollarSign, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
const statusOptions = [
  "assigned",
  "planning",
  "materials_ready",
  "on_the_way",
  "completed",
];
const AssignedProject = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: projects = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-projects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/assigned-projects");
      return res.data;
    },
  });
  const handleStatusChange = async (bookingId, status) => {
    try {
      await axiosSecure.patch(`/decorator/project/${bookingId}/status`, {
        status,
      });
      toast.success("Status updated successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };
  const getStatusConfig = (status) => {
    const configs = {
      completed: {
        color: "bg-green-100 text-green-700 border-green-200",
        label: "Completed",
      },
      on_the_way: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        label: "On The Way",
      },
      materials_ready: {
        color: "bg-yellow-100 text-yellow-700 border-yellow-200",
        label: "Materials Ready",
      },
      planning: {
        color: "bg-purple-100 text-purple-700 border-purple-200",
        label: "Planning",
      },
      assigned: {
        color: "bg-gray-100 text-gray-700 border-gray-200",
        label: "Assigned",
      },
    };
    return configs[status] || configs.assigned;
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
  <div className="p-6 space-y-6">
            <title>Laxius Decor || Assign Project</title>

      {/* Header Section */}
      <div className="mb-8">
               <Heading title="My Assigned Projects" subtitle=' Track and manage all your assigned decoration projects' center />

        
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral font-medium">Total Projects</p>
              <p className="text-2xl font-bold text-accent mt-1">{projects.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral font-medium">Planning</p>
              <p className="text-2xl font-bold text-accent mt-1">
                {projects.filter(p => p.status === "planning").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral font-medium">In Progress</p>
              <p className="text-2xl font-bold text-accent mt-1">
                {projects.filter(p => ["materials_ready", "on_the_way"].includes(p.status)).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral font-medium">Completed</p>
              <p className="text-2xl font-bold text-accent mt-1">
                {projects.filter(p => p.status === "completed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="bg-base-100 rounded-xl shadow-lg p-16 text-center border border-base-100">
          <div className="text-neutral text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-accent mb-2">
            No assigned projects found
          </h3>
          <p className="text-neutral text-sm">
            Your assigned projects will appear here
          </p>
        </div>
      ) : (
        <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden border border-base-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b-2 border-primary/20">
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    SL.
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                    Update Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-100">
                {projects.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-neutral font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <FaEnvelope className="text-primary text-xs" />
                        </div>
                        <span className="text-sm text-neutral">
                          {booking.userEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaClipboardList className="text-neutral" />
                        <span className="text-sm font-semibold text-neutral">
                          {booking.serviceName || "No Services"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <FaDollarSign className="text-green-600" />
                        <span className="text-sm font-bold text-neutral">
                          {booking.price} BDT
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" />
                        <span className="text-sm text-neutral">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="text-sm text-neutral">
                          {booking.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
                          getStatusConfig(booking.status).color
                        }`}
                      >
                        {getStatusConfig(booking.status).label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={booking.status || "assigned"}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        className="px-3 py-2 border-2 text-accent hover:text-primary border-base-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 text-sm font-medium cursor-pointer hover:border-primary/50"
                      >
                        {statusOptions.map((o) => (
                          <option key={o} value={o}>
                            {o.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      
      
    </div>
  );
};

export default AssignedProject;
