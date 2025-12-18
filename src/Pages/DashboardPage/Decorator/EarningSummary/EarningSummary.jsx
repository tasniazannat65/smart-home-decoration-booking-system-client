import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Shared/Loading/Loading';

const EarningSummary = () => {
    const axiosSecure = useAxiosSecure();
    const {data ={}, isLoading} = useQuery({
        queryKey: ['decorator-earning-summary'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/decorator/earning-summary');
            return res.data;
        }
    })
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
            <div className='bg-base-100 shadow rounded-xl p-6'>
                <p className='text-neutral'>Total Earnings</p>
                <h2 className='text-3xl font-bold text-primary'>
                    {data.totalEarnings} BDT
                </h2>

            </div>
            <div className='bg-base-100 shadow rounded-xl p-6'>
                <p className='text-accent'>Completed Jobs</p>
                <h2 className='text-3xl font-bold text-primary'>
                    {
                        data.totalJobs
                    }
                </h2>

            </div>
        </div>
    );
};

export default EarningSummary;