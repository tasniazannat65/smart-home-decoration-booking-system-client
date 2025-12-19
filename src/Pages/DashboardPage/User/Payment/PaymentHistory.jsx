import React from 'react';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Heading from '../../../../Components/Shared/Heading/Heading';
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: payments=[]} = useQuery({
        queryKey: ['payments', user.email],

        queryFn: async()=> {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        },
        staleTime: 0,
        cacheTime: 0,
        refetchOnWindowFocus: false,
        keepPreviousData: false

    })
    return (
        <div className='bg-white rounded-4xl p-6'>
          <title>Laxius Decor || Payment History</title>
      <Heading title="Payment History" center />

        <div className="overflow-x-auto rounded-box border-2 border-primary  bg-base-100 mt-5">
  <table className="table">
    {/* head */}
    <thead className='bg-base-200 
    '>
      <tr>
        <th className='text-primary font-bold text-lg'>SL.</th>
        <th className='text-primary font-bold text-lg'>Service</th>
        <th className='text-primary font-bold text-lg'>Amount</th>
        <th className='text-primary font-bold text-lg'>Payment Date</th>
        <th className='text-primary font-bold text-lg'>Status</th>
        <th className='text-primary font-bold text-lg'>Transaction ID</th>
        <th className='text-primary font-bold text-lg'>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        payments.map((payment, index)=>  <tr key={payment._id}>
        <th className="p-2">{index + 1}</th>
        <td className="p-2">{payment.serviceName}</td>
        <td className="p-2">${payment.price}</td>
        <td className="p-2">{new Date(payment.paidAt).toLocaleDateString()}</td>
        <td className={payment.paymentStatus === 'paid' ? 'text-primary font-bold p-2' : 'text-red-600 font-bold p-2'}>
            {payment.paymentStatus}
        </td>
        <td>{payment.transactionId}</td>
        <td className='p-2'>

            <button className=' btn bg-secondary text-white hover:bg-primary font-semibold flex items-center text-sm'>
                            <HiOutlineMagnifyingGlass size={15}/>

                View </button>
        </td>
      </tr> )
      }
     
      
    </tbody>
  </table>
</div>

        </div>
    );
};

export default PaymentHistory;