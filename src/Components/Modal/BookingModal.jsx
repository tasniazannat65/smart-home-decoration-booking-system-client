import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const BookingModal = ({service, user, close}) => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
const {register, handleSubmit,     formState: { errors, isSubmitting }
} = useForm();
const handleBookingDecoration = async(data)=>{
    const bookingInfo = {
        serviceId: service._id,
        serviceName: service.service_name,
        userName: user.displayName,
        userEmail: user.email,
        price: service.cost,
       
        bookingDate: new Date(data.date),
        createdAt: new Date(),
        location: data.location,
        status: 'pending'
    }
    try {
        const res = await axiosSecure.post('/bookings', bookingInfo)
        
        if(res.data.insertedId){
            toast.success('Booking Successfully!')
            close();
            navigate('/dashboard/my-booking');
            


        }
        
    } catch (error) {
        console.error(error);
        toast.error('Booking Failed!')
        
    }
}


    return (
        <Transition show={true} as={Fragment}>
            <Dialog as='div' className="relative z-50" onClose={close}>
                <TransitionChild as={Fragment} enter='ease-out duration-200' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-150' leaveFrom='opacity-100' leaveTo='opacity-0'>
                    <div className='fixed inset-0 bg-black/40'></div>

                </TransitionChild>
                <div className='fixed inset-0 flex items-center justify-center p-4'>
                    <TransitionChild as={Fragment}
                     enter='ease-out duration-200'
                     enterFrom='opacity-0 scale-90'
                     enterTo='opacity-100 scale-100'
                     leave='ease-in duration-150'
                      leaveFrom='opacity-100 scale-100'
                       leaveTo='opacity-0 scale-90'
                     
                     >
                        <DialogPanel className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
                            <DialogTitle className="text-xl font-semibold mb-4 text-primary">
                                Book {service.service_name}

                            </DialogTitle>
                            <form onSubmit={handleSubmit(handleBookingDecoration)} className='space-y-4'>
                                {/* user name */}
                                <div>
                                    <label className='text-sm font-semibold'>Name</label>
                                    <input type="text" defaultValue={user.displayName} {...register('name', {required: 'Name is required'})} className='w-full border px-3 py-2 rounded-md' />
                                    {errors.name && (<p className='text-red-500 text-sm'>{errors.name.message}</p>)}

                                </div>
                                {/* user email */}
                                <div>
                                    <label className='text-sm font-semibold'>Email</label>
                                    <input type="email" defaultValue={user.email} {...register('email', {required: 'Email is required'})} className='w-full border px-3 py-2 rounded-md' />
                                    {errors.email && (<p className='text-red-500 text-sm'>{errors.email.message}</p>)}

                                </div>
                                {/* booking date*/}
                                <div>
                                    <label className='text-sm font-semibold'>Booking Date</label>
                                    <input type="date" {...register('date', {required: 'Date is required'})} className='w-full border px-3 py-2 rounded-md' />
                                    {errors.date && (<p className='text-red-500 text-sm'>{errors.date.message}</p>)}

                                </div>
                                {/* location*/}
                                <div>
                                    <label className='text-sm font-semibold'>Your Location</label>
                                    <input type="text"  placeholder='Enter your location' {...register('location', {required: 'Location is required'})} className='w-full border px-3 py-2 rounded-md' />
                                    {errors.location && (<p className='text-red-500 text-sm'>{errors.location.message}</p>)}

                                </div>
                                <div className='flex items-center gap-2'>
                                    <button type='submit' disabled={isSubmitting} className='flex-1 bg-primary hover:bg-secondary btn text-white font-medium rounded-md'>
                                        {isSubmitting ? 'Booking' : 'Confirm Booking'}
                                    </button>
                                    <button type='button' onClick={close} className='flex-1 bg-gray-700 hover:bg-gray-500 btn text-white font-medium rounded-md'>Cancel</button>
                                </div>
                            </form>

                        </DialogPanel>

                    </TransitionChild>

                </div>

            </Dialog>

        </Transition>
      
    );
};

export default BookingModal;
    
              
               
              


               