import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../../Components/Shared/Heading/Heading';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Loading from '../../../../Components/Shared/Loading/Loading';

const Analytics = () => {
    const axiosSecure = useAxiosSecure();
    const {data = [], isLoading} = useQuery({
        queryKey: ['service-demand'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/admin/service-demand');
            return res.data;

        }
    })
     if(isLoading){
        return <Loading/>
     }
    return (
        <div className='bg-white p-6
         rounded-xl shadow'>
            <title>Laxius Decor || Service Demand Analytics</title>
        <Heading title="Service Demand"/>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{top: 20, right: 30, left: 0, bottom: 5}}>
                <XAxis dataKey="service"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="count" fill='#5BB4EA'/>

            </BarChart>

        </ResponsiveContainer>

            
        </div>
    );
};

export default Analytics;