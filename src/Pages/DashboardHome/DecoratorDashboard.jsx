import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Shared/Loading/Loading';
import Heading from '../../Components/Shared/Heading/Heading';
import DecoratorSpecialties from '../DashboardPage/Decorator/DecoratorSpecialties/DecoratorSpecialties';
import { FaBriefcase, FaCalendarDay, FaDollarSign } from 'react-icons/fa';


const DecoratorDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const {data = {}, isLoading} = useQuery({
        queryKey: ['decorator-summary'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/decorator/dashboard-summary');

            return res.data;
        }
    })
     if(isLoading){
        return <Loading/>
     }
 
    return (
        <div className="min-h-screen py-6 md:py-8 lg:py-10">
                  <title>Laxius Decor || Decorator Dashboard</title>
      <div className=" space-y-8">
        {/* Header Section */}
        <div className=" mb-8">
                    <Heading title="Decorator Dashboard" subtitle=' Welcome back! Here is your performance overview' center/>

         
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Completed Jobs */}
          <div className="group bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-base-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaBriefcase className="text-blue-600 text-2xl" />
                </div>
              </div>
              <p className="text-sm text-neutral font-medium mb-1">
                Total Completed Jobs
              </p>
              <h2 className="text-4xl font-bold text-accent">
                {data.totalJobs}
              </h2>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="group bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-base-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaCalendarDay className="text-purple-600 text-2xl" />
                </div>
              </div>
              <p className="text-sm text-neutral font-medium mb-1">
                Today's Schedule
              </p>
              <h2 className="text-4xl font-bold text-accent">
                {data.todayJobs}
              </h2>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="group bg-base-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-base-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FaDollarSign className="text-green-600 text-2xl" />
                </div>
              </div>
              <p className="text-sm text-neutral font-medium mb-1">
                Total Earnings
              </p>
              <h2 className="text-4xl font-bold text-accent">
                {data.totalEarnings.toLocaleString()} BDT
              </h2>
            </div>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="mt-8 max-w-3xl mx-auto">
          <DecoratorSpecialties
            current={data.specialties || []}
            rating={data.rating || 0}
          />
        </div>
      </div>
    </div>
    );
};

export default DecoratorDashboard;