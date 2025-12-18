import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import { FaCalendarAlt, FaCheckCircle, FaDollarSign, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading/Loading';
import Card from '../../Components/Shared/UserDashboard/Card';


const UserDashboard = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data = {}, isLoading} = useQuery({
        queryKey: ['user-dashboard-summary'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/user/dashboard-summary');
            return res.data
        }
    })
     if(isLoading){
        return <Loading/>
     }
      const {
        totalBookings = 0,
        pendingPayment = 0,
        completed = 0,
        cancelled = 0
      } = data;
    return (
        <div className='space-y-8 p-6 md:p-8 lg:p-10'>
            <div className='flex flex-col md:flex-row lg:flex-row justify-between items-center gap-4'>
                <div>
                    <h1 className='text-3xl font-bold text-accent'>Hello, {user?.displayName || 'User'}!</h1>
                    <p className='text-neutral'>Welcome back to your dashboard</p>

                </div>
                <Link to="/dashboard/profile" className='px-6 py-2 bg-primary rounded-md text-white hover:bg-secondary shadow'>Edit Profile</Link>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
                <Card icon={<FaCalendarAlt/>}
                value={totalBookings}
                label="Total Bookings"
                />
                <Card icon={<FaDollarSign/>}
                
                value={pendingPayment}
                label="Pending Payment"
                />
                <Card icon={<FaCheckCircle/>}
                
                value={completed}
                label="Completed"
                />
                <Card icon={<FaTimesCircle/>}
                
                value={cancelled}
                label="Cancelled"
                />
                
                
               

            </div>
            
        </div>
    );
};

export default UserDashboard;