import React, { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Shared/Loading/Loading';
import Heading from '../../../../Components/Shared/Heading/Heading';
import { Link } from 'react-router';

const BookingManagement = () => {
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
          const limit = 5;
    const {data,  isLoading} = useQuery({
        queryKey: ['admin-bookings', page, limit],
        queryFn: async()=>{
            const res = await axiosSecure.get('/bookings/admin', {
                params: {
                    page, limit
                }
            });
            return res.data;

        }
    })
    const bookings = data?.bookings || [];
  const totalPages = data?.totalPages || 1;
    if(isLoading){
        return <Loading/>
    }
    return (
        <div>
            <title>Laxius Decor || Booking Management</title>
            <Heading title="Manage Bookings" center/>
            <div className='overflow-x-auto rounded-box border-2 border-primary  bg-base-100 mt-5'>
                <table className='table'>
                    <thead  className="bg-base-200 ">
                        <tr>
                            <th className='text-primary font-bold text-lg'>SL.</th>
                            <th className="text-primary font-bold text-lg">User</th>
                            <th className="text-primary font-bold text-lg">Services</th>
                            <th className="text-primary font-bold text-lg">Total</th>
                            <th className="text-primary font-bold text-lg">Payment</th>
                            <th className="text-primary font-bold text-lg">Decorator</th>
                            <th className="text-primary font-bold text-lg">Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, index)=> (
                                <tr key={booking._id}>
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{booking.userEmail}</td>
                                    <td className="p-2">{booking.serviceName || 'No Services'}</td>
                                    <td className="p-2">{booking.totalPrice}BDT</td>
                                    <td className="p-2">{
                                        booking.paymentStatus === 'paid' ? (
                                            <span className='badge bg-success'>Paid</span>
                                        ) : (
                                            <span className='badge badge-error'>Unpaid</span>
                                        )
                                        
                                        }</td>
                                        <td className="p-2">

                                            <span className='badge badge-info'>
                                                {booking.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="p-2 flex items-center gap-2 flex-col lg:flex-row">
                                            {
                                                booking.decoratorId ? (
                                                    <span className='badge badge-success py-4 text-[9px] lg:text-sm text-center '>Assigned</span>
                                                ) : (
                                                    <span className='badge badge-warning py-4 text-[9px] lg:text-sm text-center'>Not Assigned</span>
                                                )
                                            }
                                             {
                                                booking.paymentStatus === 'paid' && !booking.decoratorId && (
                                                    <Link to={`/dashboard/assign-decorators?bookingId=${booking._id}`} 
                                                    className='btn btn-xs btn-primary'
                                                    >
                                                    Assign


                                                    </Link>
                                                )
                                            }
                                        </td>
                                       

                                </tr>
                            ))
                        }

                    </tbody>

                </table>
                {
                    bookings.length === 0 && (
                        <p className='text-center text-accent py-10'>No bookings found</p>
                    )
                }

            </div>

             <div className='flex gap-2 justify-center mt-4'>
                    <button
                    disabled={page === 1}
                    onClick={()=> setPage(page - 1)}
                    className='btn btn-sm bg-primary/20'
                    
                    >
                      Prev

                    </button>
                    {[
                      ...Array(totalPages).keys()
                    ].map(num => (
                      <button
                      key={num}
                      onClick={()=> setPage(num + 1)}
                      className={`btn btn=sm ${page === num + 1 ? 'btn-primary' : ''}`}
                      
                      >
                        {num + 1}

                      </button>
                    ))}
                    <button disabled={page === totalPages}
                    onClick={()=> setPage(page + 1)}
                    className='btn btn-sm bg-primary/20'
                    >
                      Next
                    </button>

                  </div>

            
        </div>
    );
};

export default BookingManagement;