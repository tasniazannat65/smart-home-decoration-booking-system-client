import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddServiceModal = ({isOpen, setIsOpen, refetch}) => {
    const axiosSecure = useAxiosSecure();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const closeModal = ()=>{
        reset();
        setIsOpen(false);
    }
    const handleAddService = async(data)=>{
        const serviceData = {
            ...data,
            cost: Number(data.cost),
            createdAt: new Date()
        }
        try {
            await axiosSecure.post('/services', serviceData);
            toast.success('Service added successfully!');
            refetch();
            closeModal();
            
        } catch (error) {
            console.log(error)
            toast.error('Failed to add service')
            
        }
    }
    return (
       <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className="relative z-50" onClose={closeModal}>
            <TransitionChild 
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            
            >
                <div className='fixed inset-0 bg-black/40'></div>

            </TransitionChild>
            <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <TransitionChild
                    as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale:95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
                    
                    
                    >
                        <DialogPanel className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                            <DialogTitle className="text-xl font-bold text-accent mb-4">
                                Add New Service 

                            </DialogTitle>
                            <form onSubmit={handleSubmit(handleAddService)} className='space-y-4'>
                                <div>
                                    <label className='label'>Service Name</label>
                                    <input {...register('service_name', {required: true})}
                                    className='input w-full' placeholder='Wedding Decoration'
                                    />
                                    {
                                        errors.service_name && (
                                            <p className='text-sm text-red-500'>Required</p>
                                        )
                                    }

                                </div>
                                <div>
                                    <label className='label'>Category</label>
                                    <select {...register('service_category', {required: true})}
                                    className='select w-full'
                                    >
                                        <option value="">Select Category</option>
                                        <option value="wedding">Wedding</option>
                                        <option value="home">Home</option>
                                        <option value="office">Office</option>
                                        <option value="corporate">Corporate</option>
                                        <option value="seminar">Seminar</option>


                                    </select>

                                </div>
                                                          <div>
                                    <label className='label'>Cost (BDT)</label>
                                    <input type='number' {...register('cost', {required: true})}
                                    className='input w-full' 
                                    />
                                   

                                </div>
                                                          <div>
                                    <label className='label'>Unit</label>
                                    <input {...register('unit', {required: true})}
                                    className='input w-full' placeholder='per event / per sqft'
                                    />
                                   

                                </div>
                                <div>
                                    <label className='label'>Service Image URL</label>
                                    <input {...register('image', {required: true})} 
                                    className='input w-full'
                                    placeholder='https://image-url.com/service.jpg'
                                    />

                                </div>
                                <div>
                                    <label className='label'>Description</label>
                                    <textarea {...register('description')} className='textarea w-full'></textarea>
                                </div>
                                <div className='flex justify-end gap-2 pt-4'>
                                    <button type='submit' className='btn bg-primary text-white hover:bg-secondary'>Add Service</button>
                                    <button type='button' onClick={closeModal} className='btn bg-gray-600 text-white hover:bg-gray-500'>Cancel</button>

                                </div>



                            </form>

                        </DialogPanel>

                    </TransitionChild>

                </div>

            </div>

        </Dialog>

       </Transition>
    );
};

export default AddServiceModal;