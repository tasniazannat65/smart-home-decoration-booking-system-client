import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaEdit, FaSort, FaTrashAlt } from "react-icons/fa";
import Loading from "../../../../Components/Shared/Loading/Loading";
import Heading from "../../../../Components/Shared/Heading/Heading";
import UpdateBookingModal from "../../../../Components/Modal/UpdateBookingModal";

const MyBooking = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editBooking, setEditBooking] = useState(null);
  const [sorted, setSorted] = useState("");
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myBooking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const sortedBookings = [...bookings].sort((a, b) => {
    if (sorted === "newDate") {
      return new Date(b.bookingDate) - new Date(a.bookingDate);
    }
    if (sorted === "oldDate") {
      return new Date(a.bookingDate) - new Date(b.bookingDate);
    }
    if (sorted === "statusAsc") {
      return (a.status || "").localeCompare(b.status || "");
    }
    if (sorted === "statusDesc") {
      return (b.status || "").localeCompare(a.status || "");
    }
    return 0;
  });

  const handlePayment = async (booking) => {
    const paymentInfo = {
      cost: booking.price,
      bookingId: booking._id,
      userEmail: booking.userEmail,
      serviceName: booking.serviceName,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );

    window.location.assign(res.data.url);
  };

  const handleBookingDelete = (id) => {
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
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your booking has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
 const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };


  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="py-8 md:py-10 lg:py-12 space-y-6">
              <title>Laxius Decor || Service Booking</title>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Heading title={'My Bookings'} subtitle="Manage and track all your service bookings
" />
         
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <FaSort className="text-white" />
            <select
              className="bg-transparent outline-none cursor-pointer appearance-none pr-2"
              value={sorted}
              onChange={(e) => setSorted(e.target.value)}
            >
              <option className="text-accent bg-base-100" value="">
                Sort By
              </option>
              <option className="text-accent bg-base-100" value="newDate">
                Date: Newest First
              </option>
              <option className="text-accent bg-base-100" value="oldDate">
                Date: Oldest First
              </option>
              <option className="text-accent bg-base-100" value="statusAsc">
                Status A→Z
              </option>
              <option className="text-accent bg-base-100" value="statusDesc">
                Status Z→A
              </option>
            </select>
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
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Review
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-100">
              {sortedBookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-base-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-accent font-medium">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-accent">
                      {booking.serviceName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral">
                      {booking.location}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-accent">
                      {booking.price}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-neutral">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {booking.paymentStatus === "paid" ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                        Paid
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePayment(booking)}
                        className="px-4 py-1.5 bg-secondary hover:bg-secondary/90 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === "completed" && !booking.reviewed ? (
                      <Link to={`/dashboard/review/${booking._id}`} className="btn  border-2 border-primary text-primary bg-base-100 hover:bg-primary hover:text-white text-xs font-semibold rounded-lg transition-all duration-200">
                        Give Review
                      </Link>
                    ) : booking.reviewed ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                        Reviewed
                      </span>
                    ) : (
                      <span className="text-xs text-neutral italic">
                        Not available
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditBooking(booking)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleBookingDelete(booking._id)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <FaTrashAlt />
                        Cancel
                      </button>
                        {editBooking && (
                      <UpdateBookingModal
                        booking={editBooking}
                        close={() => setEditBooking(null)}
                        refetch={refetch}
                      />
                    )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-neutral text-5xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-accent mb-2">
              No bookings yet
            </h3>
            <p className="text-neutral text-sm">
              Your booking history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
