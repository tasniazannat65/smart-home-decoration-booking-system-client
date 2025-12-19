import React, { useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
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

  

  const sortedBookings = [...bookings].sort((a, b)=> {
    if(sorted === 'newDate'){
      return new Date(b.bookingDate) - new Date(a.bookingDate);

    }
    if(sorted === 'oldDate'){
      return new Date(a.bookingDate) - new Date(b.bookingDate);

    }
    if(sorted === 'statusAsc'){
      return (a.status || "").localeCompare(b.status || "")
    }
    if(sorted === 'statusDesc'){
            return (b.status || "").localeCompare(a.status || "")

    }
    return 0;
  })

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

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
       <title>Laxius Decor || Service Booking</title>
      <Heading title="My Bookings" center />
      <div className="flex md:justify-end lg:justify-end justify-center my-4">
    <div className="relative">
          <select  className="w-56 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-lg outline-none cursor-pointer hover:brightness-110 transition" value={sorted} onChange={(e)=> setSorted(e.target.value)}>
  <option className="text-accent" value="" >Sort By</option>
  <option className="text-accent" value="newDate">Date: Newest First</option>
  <option className="text-accent" value="oldDate">Date: Oldest First</option>
  <option className="text-accent" value="statusAsc">Status A-&gt; Z</option>
  <option className="text-accent" value="statusDesc">Status Z-&gt;A</option>
</select>
    </div>

      </div>

      <div className="overflow-x-auto rounded-box border-2 border-primary  bg-base-100 mt-5">
        <table className="table">
          {/* head */}
          <thead className="bg-base-200 ">
            <tr>
              <th className="text-primary font-bold text-lg">SL.</th>

              <th className="text-primary font-bold text-lg">Service</th>
              <th className="text-primary font-bold text-lg">Location</th>
              <th className="text-primary font-bold text-lg">Price</th>
              <th className="text-primary font-bold text-lg">Date</th>
              <th className="text-primary font-bold text-lg">Payment</th>
              <th className="text-primary font-bold text-lg"> Status</th>
              <th className="text-primary font-bold text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((booking, index) => (
              <tr key={booking._id}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2 ">{booking.serviceName}</td>
                <td className="p-2 ">{booking.location}</td>
                <td className="p-2 ">{booking.price}</td>
                <td className="p-2">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {booking.paymentStatus === "paid" ? (
                    <span className="text-primary font-semibold">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(booking)}
                      className="btn btn-sm bg-secondary text-white rounded-md font-semibold"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td className="p-2 font-bold capitalize">{booking.status}</td>

                <td className="flex items-center gap-2 flex-col md:flex-row lg:flex-row p-2">
                  <div>
                    <button
                      onClick={() => setEditBooking(booking)}
                      className="btn bg-primary hover:bg-secondary text-white font-semibold rounded-md"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    {editBooking && (
                      <UpdateBookingModal
                        booking={editBooking}
                        close={() => setEditBooking(null)}
                        refetch={refetch}
                      />
                    )}
                  </div>
                  <button
                    onClick={() => handleBookingDelete(booking._id)}
                    className="btn bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md"
                  >
                    <FaTrashAlt />
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
