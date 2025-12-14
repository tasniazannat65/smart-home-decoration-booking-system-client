import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router';
import { FaCalendarAlt, FaCheckCircle, FaDollarSign, FaTimesCircle } from "react-icons/fa";


const UserDashboard = () => {
    const {user} = useAuth();
    return (
        <div className='space-y-8 p-6 md:p-8 lg:p-10'>
            <div className='flex flex-col md:flex-row lg:flex-row justify-between items-center gap-4'>
                <div>
                    <h1 className='text-3xl font-bold text-accent'>Hello, {user.displayName || 'User'}!</h1>
                    <p className='text-neutral'>Welcome back to your dashboard</p>

                </div>
                <Link to="/dashboard/profile" className='px-6 py-2 bg-primary rounded-md text-white hover:bg-secondary shadow'>Edit Profile</Link>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
                <div className='bg-secondary/10 p-4 rounded-lg shadow-lg flex flex-col items-center'>
                    <FaCalendarAlt className='text-3xl text-primary mb-2'/>
                 <p className='text-xl font-bold'>totalBookings</p>
                 <p className='text-neutral text-sm'>Total Bookings</p>
                </div>
                <div className='bg-secondary/10 p-4 rounded-lg shadow-lg flex flex-col items-center'>
                    <FaDollarSign className='text-3xl text-primary mb-2'/>
                 <p className='text-xl font-bold'>pendingPayment</p>
                 <p className='text-neutral text-sm'>Pending Payment</p>
                </div>
                <div className='bg-secondary/10 p-4 rounded-lg shadow-lg flex flex-col items-center'>
                    <FaCheckCircle className='text-3xl text-primary mb-2'/>
                 <p className='text-xl font-bold'>completed</p>
                 <p className='text-neutral text-sm'>Completed</p>
                </div>
                <div className='bg-secondary/10 p-4 rounded-lg shadow-lg flex flex-col items-center'>
                    <FaTimesCircle className='text-3xl text-primary mb-2'/>
                 <p className='text-xl font-bold'>cancelled</p>
                 <p className='text-neutral text-sm'>Cancelled</p>
                </div>

            </div>
            
        </div>
    );
};

export default UserDashboard;