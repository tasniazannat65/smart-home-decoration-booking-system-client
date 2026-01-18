import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Shared/Loading/Loading";
import toast from "react-hot-toast";
import Heading from "../../../../Components/Shared/Heading/Heading";
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
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-6">
      <title>Laxius Decor || Assign Project</title>

      <Heading title="My Assigned Projects" center />
      {projects.length === 0 ? (
        <p className="text-center text-accent py-10">
          No assigned projects found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-box border-2 border-primary  bg-base-100 mt-5">
          <table className="table">
            {/* head */}
            <thead className="bg-base-200 ">
              <tr>
                <th className="text-primary font-bold text-lg">SL.</th>

                <th className="text-primary font-bold text-lg">Email</th>
                <th className="text-primary font-bold text-lg">Services</th>
                <th className="text-primary font-bold text-lg">Total Price</th>
                <th className="text-primary font-bold text-lg">Booking Date</th>
                <th className="text-primary font-bold text-lg">Location</th>
                <th className="text-primary font-bold text-lg"> Status</th>
                <th className="text-primary font-bold text-lg">
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((booking, index) => (
                <tr key={booking._id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 ">{booking.userEmail}</td>
                  <td className="p-2 ">
                    {booking.serviceName || "No Services"}
                  </td>
                  <td className="p-2 ">{booking.price} BDT</td>
                  <td className="p-2">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">{booking.location}</td>
                  <td className="p-2">
                    <span
                      className={`badge text-white ${
                        booking.status === "completed"
                          ? "bg-green-600"
                          : booking.status === "on_the_way"
                          ? "bg-blue-500"
                          : booking.status === "materials_ready"
                          ? "bg-yellow-500"
                          : booking.status === "planning"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {booking.status || "assigned"}
                    </span>
                  </td>
                  <td className="p-2">
                    <select
                      value={booking.status || "assigned"}
                      onChange={(e) =>
                        handleStatusChange(booking._id, e.target.value)
                      }
                      className="border px-2
                                             py-1 rounded"
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
      )}
    </div>
  );
};

export default AssignedProject;
