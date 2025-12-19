import React from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Shared/Loading/Loading';

const DecoratorPaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const {data: history = [], isLoading} = useQuery({
        queryKey: ['earnings-history'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/decorator/earning-history');
            return res.data;
        }
    })
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className='bg-base-100 shadow  rounded-xl mt-6 overflow-x-auto rounded-box border-2 border-primary'>
            <title>Laxius Decor || Decorator Payment History</title>
            <table className='table'>
                <thead className='bg-base-200'>
                    <tr>
                        <th  className="text-primary font-bold text-lg">SL.</th>
                        <th  className="text-primary font-bold text-lg">Amount</th>
                        <th  className="text-primary font-bold text-lg">Booking ID</th>
                        <th  className="text-primary font-bold text-lg">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map((p, index)=> (
                            <tr key={p._id}>
                                <td className='p-2'>{index + 1}</td>
                                <td className='font-semibold text-success p-2'>
                                    {p.price} BDT
                                </td>
                                <td className='p-2'>{p.bookingId?.toString() || 'N/A'}</td>
                                <td className='p-2'>
                                    {new Date(p.createdAt).toLocaleDateString()}
                                </td>

                            </tr>
                        ))
                    }
                </tbody>

            </table>
            {
                history.length === 0 && (
                    <p className='text-center py-6 text-accent'>No payment history found </p>
                
                )
            }
        </div>
    );
};

export default DecoratorPaymentHistory;