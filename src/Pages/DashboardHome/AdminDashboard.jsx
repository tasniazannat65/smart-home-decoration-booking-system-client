import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading/Loading';
import Card from '../../Components/Shared/AdminDashboard/Card';
import { Link } from 'react-router';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const {data, isLoading} = useQuery({
        queryKey: ['admin-dashboard-summary'],
        queryFn: async()=> {
            const res = await axiosSecure.get('/admin/dashboard-summary');
            return res.data;
        }
    })
    if(isLoading){
        return <Loading/>

    }
    return (
        <div className='space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <Card title="Total Revenue" value={`BDT ${data.totalRevenue}`}/>
                <Card title="Total Bookings" value={ data.totalBookings}/>
                <Card title="Paid Bookings" value={data.paidBookings}/>
                <Card title="Pending Assignments" value={data.pendingAssignments}/>
                <Card title="Active Decorators" value={data.activeDecorators}/>
                <Card title="Total Services" value={data.totalServices}/>


            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
                <div className='bg-base-100 p-6 rounded-xl shadow flex flex-col justify-between '>
                    <div>
                        <h3 className='text-xl font-bold text-primary  mb-2'>
                           📈  Revenue Analytics

                        </h3>
                        <p className='text-neutral'>View revenue trends, daily income & total earnings</p>
                    </div>
                    <Link to='/dashboard/revenue' className='btn bg-primary hover:bg-secondary text-white mt-4'>
                    View Revenue
                    
                    </Link>

                </div>
                <div className='bg-base-100 p-6 rounded-xl shadow flex flex-col justify-between '>
                    <div>
                        <h3 className='text-xl font-bold text-primary mb-2'>
                           📊  Service Demand  Analytics

                        </h3>
                        <p className='text-neutral'>See most booked services & demand histogram</p>
                    </div>
                    <Link to='/dashboard/analytics' className='btn bg-primary text-white hover:bg-secondary mt-4'>
                    View Analytics
                    
                    </Link>

                </div>

            </div>

            
        </div>
    );
};

export default AdminDashboard;