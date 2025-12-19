import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Components/Shared/Loading/Loading';
import Heading from '../../Components/Shared/Heading/Heading';
import DecoratorSpecialties from '../DashboardPage/Decorator/DecoratorSpecialties/DecoratorSpecialties';


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
        <div>
            <title>Laxius Decor || Decorator Dashboard</title>
            <Heading title="Decorator Dashboard"/>
           <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
             <div className='bg-base-100 shadow rounded-xl p-6'>
                <p className='text-neutral'>Total Completed Jobs</p>
                <h2 className='text-3xl font-bold text-secondary'>
                    {data.totalJobs}
                </h2>

            </div>
            <div className='bg-base-100 shadow rounded-xl p-6'>
                <p className='text-neutral'>Today's Schedule</p>
                <h2 className='text-3xl font-bold text-secondary'>
                    {data.todayJobs}
                </h2>

            </div>
            <div className='bg-base-100 shadow rounded-xl p-6'>
                <p className='text-neutral'>Total Earnings</p>
                <h2 className='text-3xl font-bold text-secondary'>
                    {data.totalEarnings} BDT
                </h2>

            </div>
            
       
           </div>
           <div className='mt-8 max-w-3xl mx-auto'>
                <DecoratorSpecialties current={data.specialties || []}
                rating = {data.rating || 0}
                />

            </div>
        
            
        </div>
    );
};

export default DecoratorDashboard;