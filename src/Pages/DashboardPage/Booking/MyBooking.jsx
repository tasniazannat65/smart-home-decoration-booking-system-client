import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loading from '../../../Components/Shared/Loading/Loading';
import Heading from '../../../Components/Shared/Heading/Heading';


const MyBooking = () => {
     const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
const {data: bookings = [], isLoading} = useQuery({
    queryKey: ['myBooking', user?.email],
    queryFn: async()=>{
        const res = await axiosSecure.get(`/bookings?email=${user.email}`);
        return res.data;

    }
})

const handlePayment = async(booking)=>{
  const paymentInfo = {
    cost: booking.price,
    bookingId: booking._id,
    userEmail: booking.userEmail,
    serviceName: booking.serviceName,

  }
  const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

        window.location.assign(res.data.url);



}

// const handleParcelDelete = (id)=>{
//     Swal.fire({
//   title: "Are you sure?",
//   text: "You won't be able to revert this!",
//   icon: "warning",
//   showCancelButton: true,
//   confirmButtonColor: "#a8df06",
//   cancelButtonColor: "#d33",
//   confirmButtonText: "Yes, delete it!"
// }).then((result) => {
//   if (result.isConfirmed) {
//     axiosSecure.delete(`/parcels/${id}`)
//     .then(res=>{
//         console.log(res.data)
//         if(res.data.deletedCount){
//             refetch();
//              Swal.fire({
//       title: "Deleted!",
//       text: "Your parcel request has been deleted.",
//       icon: "success"
//     });

//         }
//     })
   
//   }
// });

// }



if(isLoading){
  return <Loading/>
}
    return (
        <div>
            <Heading title="My Bookings" center/>

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-5">
  <table className="table">
    {/* head */}
    <thead className='bg-base-200'>
      <tr>
        <th></th>
        <th className='text-primary font-bold text-lg'>Service</th>
        <th className='text-primary font-bold text-lg'>Price</th>
        <th className='text-primary font-bold text-lg'>Date</th>
        <th className='text-primary font-bold text-lg'>Payment</th>
        <th className='text-primary font-bold text-lg'> Status</th>
        <th className='text-primary font-bold text-lg'>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        bookings.map((booking, index)=>  <tr key={booking._id}>
        <th className='p-2'>{index + 1}</th>
        <td className='p-2'>{booking.serviceName}</td>
        <td className='p-2'>{booking.price}</td>
       <td className='p-2'>{new Date(booking.bookingDate).toLocaleDateString()}</td>
       <td className='p-2'>
        {
          booking.paymentStatus === 'paid' ? <span className='text-primary font-semibold'>Paid</span> :
          <button onClick={()=> handlePayment(booking)} className='btn btn-sm bg-secondary text-white rounded-md font-semibold'>Pay</button>
        }
       </td>
       <td className='p-2 font-bold capitalize'>{booking.status}</td>
        
        <td className='space-x-3 p-2'>
            <button className='btn bg-primary hover:bg-secondary text-white font-semibold rounded-md'>
                <FaEdit />
                
                Edit</button>
            <button  className='btn bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md'>
                <FaTrashAlt />


                Delete</button>
        </td>
      </tr>)
      }
     
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyBooking;