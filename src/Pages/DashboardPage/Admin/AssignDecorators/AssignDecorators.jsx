import React from "react";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Shared/Loading/Loading";

const AssignDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [selectedDecorator, setSelectedDecorator] = useState("");
  const {
    data: bookings = [],
    isLoading: bookingLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-to-assign-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/admin-to-assign");
      return res.data;
    },
  });
  const { data: decorators = [], isLoading: decoratorLoading } = useQuery({
    queryKey: ["approved-decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { role: "decorator", status: "approved" },
      });
      return res.data.users;
    },
  });
  if (bookingLoading || decoratorLoading) {
    return <Loading />;
  }
  const selectedBooking = bookings.find((b) => b._id === bookingId);

  const handleAssign = async () => {
    if (!bookingId || !selectedDecorator) {
      return toast.error("Select both booking & decorator");
    }
    try {
      await axiosSecure.patch(`/bookings/${bookingId}/assign-decorator`, {
        decoratorId: selectedDecorator,
      });
      toast.success("Decorator assigned successfully");
      await refetch();
      navigate("/dashboard/booking-management");
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign decorator");
    }
  };
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 shadow-xl rounded-2xl mt-20">
      <title>Laxius Decor || Assign Decorators</title>
      <h2 className="text-2xl text-primary font-bold mb-4">
        Assign Decorators
      </h2>

      {selectedBooking ? (
        <div className="mb-4 p-4 border rounded-lg bg-base-200">
          <p>
            <strong>User: </strong> {selectedBooking.userEmail}
          </p>
          <p>
            <strong>Services: </strong>{" "}
            {selectedBooking.serviceName || "No Services"}
          </p>
          <p>
            <strong>Total: </strong>
            {selectedBooking.price} BDT
          </p>
        </div>
      ) : (
        <p className="text-red-500">Booking not found</p>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Decorator</label>
        <select
          value={selectedDecorator}
          onChange={(e) => setSelectedDecorator(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Select Decorator</option>
          {decorators.map((d) => (
            <option key={d._id} value={d._id}>
              {d.displayName} (
              {Array.isArray(d.specialties) && d.specialties.length > 0
                ? d.specialties.join(", ")
                : "No specialties"}
              )
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md"
      >
        Assign Decorator
      </button>
    </div>
  );
};

export default AssignDecorators;
