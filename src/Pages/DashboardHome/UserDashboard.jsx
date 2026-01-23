import React from "react";
import useAuth from "../../Hooks/useAuth";
import { Link } from "react-router";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaDollarSign,
  FaTimesCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading/Loading";
import Card from "../../Components/Shared/UserDashboard/Card";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = {}, isLoading } = useQuery({
    queryKey: ["user-dashboard-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/dashboard-summary");
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  const {
    totalBookings = 0,
    pendingPayment = 0,
    completed = 0,
    cancelled = 0,

  } = data;
  return (
     <div className="min-h-screen">
                 <title>Laxius Decor || User Dashboard</title>

      <div className=" py-6 md:py-8 lg:py-10 space-y-8">
        {/* Header Section */}
        <div className="bg-base-100 rounded-xl shadow-md p-6 md:p-8 border border-base-100">
          <div className="flex flex-col md:flex-row lg:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-accent bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Hello, {user?.displayName || "User"}! 👋
              </h1>
              <p className="text-neutral text-sm md:text-base">
                Welcome back to your dashboard. Here's what's happening today.
              </p>
            </div>
            <button className="px-6 py-3 bg-primary rounded-lg text-white hover:bg-secondary shadow-md hover:shadow-lg transition-all duration-300 font-medium whitespace-nowrap hover:scale-105">
              <Link to={'/dashboard/profile'}>
              Edit Profile
              </Link>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div>
          <h2 className="text-xl font-semibold text-accent mb-4 px-1">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              icon={<FaCalendarAlt />}
              value={totalBookings}
              label="Total Bookings"
            />
            <Card
              icon={<FaDollarSign />}
              value={pendingPayment}
              label="Pending Payment"
            />
            <Card
              icon={<FaCheckCircle />}
              value={completed}
              label="Completed"
            />
            <Card
              icon={<FaTimesCircle />}
              value={cancelled}
              label="Cancelled"
            />
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-base-100 rounded-xl shadow-md p-6 border border-base-100">
          <h2 className="text-xl font-semibold text-accent mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors duration-300 text-left group">
              <div className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform inline-block">
                📅
              </div>
              <p className="font-semibold text-accent">New Booking</p>
              <p className="text-sm text-neutral">Create a new booking</p>
            </button>
            <button className="p-4 bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors duration-300 text-left group">
              <div className="text-2xl text-secondary mb-2 group-hover:scale-110 transition-transform inline-block">
                💳
              </div>
              <p className="font-semibold text-accent">Payment History</p>
              <p className="text-sm text-neutral">View all transactions</p>
            </button>
            <button className="p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors duration-300 text-left group">
              <div className="text-2xl text-primary mb-2 group-hover:scale-110 transition-transform inline-block">
                📞
              </div>
              <p className="font-semibold text-accent">Support</p>
              <p className="text-sm text-neutral">Get help & assistance</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
