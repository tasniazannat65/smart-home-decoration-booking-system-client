import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Shared/Loading/Loading';
import Heading from '../../../../Components/Shared/Heading/Heading';
import { Link } from 'react-router';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaUserTie } from "react-icons/fa";


const BookingManagement = () => {

    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
          const limit = 5;
    const {data,  isLoading} = useQuery({
        queryKey: ['admin-bookings', page, limit],
        queryFn: async()=>{
            const res = await axiosSecure.get('/bookings/admin', {
                params: {
                    page, limit
                }
            });
            console.log('data', res.data)

            return res.data;


        }
    })
    const bookings = data?.bookings || [];
  const totalPages = data?.totalPages || 1;


   const getPaymentBadge = (status) => {
        return status === 'paid'
            ? "bg-green-100 text-green-700 border-green-200"
            : "bg-red-100 text-red-700 border-red-200";
    };

    const getStatusBadge = (status) => {
        const badges = {
            confirmed: "bg-blue-100 text-blue-700 border-blue-200",
            pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
            completed: "bg-green-100 text-green-700 border-green-200",
            cancelled: "bg-red-100 text-red-700 border-red-200"
        };
        return badges[status] || "bg-gray-100 text-gray-700 border-gray-200";
    };
    if(isLoading){
        return <Loading/>
    }

    return (
       <div className="min-h-screen space-y-6">
            <title>Laxius Decor || Booking Management</title>

            {/* Header Section */}
            <div className=" mb-8">
            <Heading title="Manage Bookings" center subtitle='Oversee all bookings, assign decorators, and track payment status'/>

            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-neutral font-medium">Total Bookings</p>
                            <p className="text-2xl font-bold text-accent mt-1">{bookings.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">📅</span>
                        </div>
                    </div>
                </div>
                <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-neutral font-medium">Paid</p>
                            <p className="text-2xl font-bold text-accent mt-1">
                                {bookings.filter(b => b.paymentStatus === 'paid').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                        </div>
                    </div>
                </div>
                <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-neutral font-medium">Assigned</p>
                            <p className="text-2xl font-bold text-accent mt-1">
                                {bookings.filter(b => b.decoratorId).length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">👨‍🎨</span>
                        </div>
                    </div>
                </div>
                <div className="bg-base-100 rounded-xl shadow-md p-5 border border-base-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-neutral font-medium">Pending</p>
                            <p className="text-2xl font-bold text-accent mt-1">
                                {bookings.filter(b => !b.decoratorId && b.paymentStatus === 'paid').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">⏳</span>
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
                                    User
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                                    Services
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                                    Payment
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                                    Decorator
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-bold text-primary uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-100">
                            {bookings.map((booking, index) => (
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
                                                <span className="text-primary text-xs font-semibold">
                                                    {booking.userEmail.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-sm text-neutral">
                                                {booking.userEmail}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-neutral">
                                            {booking.serviceName || 'No Services'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-neutral">
                                            {booking.price} BDT
                                        </span>
                                    </td>
                                   <td className="px-6 py-4">
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border 
    ${getPaymentBadge(booking.paymentStatus)}`}
  >
    {booking.paymentStatus === 'paid' ? <FaCheckCircle /> : <FaTimesCircle />}
    {booking.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
  </span>
</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadge(
                                                booking.status
                                            )}`}
                                        >
                                            {booking.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {booking.decoratorId ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                                    <FaCheckCircle />
                                                    Assigned
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
                                                    <FaExclamationTriangle />
                                                    Not Assigned
                                                </span>
                                            )}
                                            {booking.paymentStatus === 'paid' && !booking.decoratorId && (
                                                <Link to={`/dashboard/assign-decorators?bookingId=${booking._id}`}  className="flex items-center gap-1.5 px-3 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                                    
                                                     <FaUserTie />
                                                    Assign
                                                    
                                                   
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {bookings.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-neutral text-6xl mb-4">📋</div>
                        <h3 className="text-lg font-semibold text-accent mb-2">
                            No bookings found
                        </h3>
                        <p className="text-neutral text-sm">
                            Bookings will appear here once customers make reservations
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

export default BookingManagement;