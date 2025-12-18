import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddPackageModal = ({isOpen, setIsOpen, refetch, services}) => {

    const axiosSecure = useAxiosSecure();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const closeModal = ()=>{
        reset();
        setIsOpen(false);
    }
   const handleAddPackages = async(data)=>{
    try {
      const selectedServices = Object.entries(data.services || {})
      .filter(([, isChecked])=> isChecked)
      .map(([id])=> {
        const service = services.find(s=> s._id === id);
     return {
        serviceId: id,
        service_name: service?.service_name,
        cost: service?.cost
     }
      })
        const packageData = {
            package_name: data.package_name,
            category: data.category,
            services: selectedServices,
            price: Number(data.price),
            createdAt: new Date()
        };
        const res = await axiosSecure.post('/packages', packageData);
        if(res.data.insertedId){
            toast.success('Package added successfully');
            refetch();
            closeModal();
        }

        
    } catch (error) {
        console.error(error)
        toast.error('Failed to add package')
        
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
                                Add New Package 

                            </DialogTitle>
                            <form onSubmit={handleSubmit(handleAddPackages)} className='space-y-4'>
                                <div>
                                    <label className='label'>Package Name</label>
                                    <input {...register('package_name', {required: true})}
                                    className='input w-full' placeholder='Package Name'
                                    />
                                    {
                                        errors.package_name && (
                                            <p className='text-sm text-red-500'>Required</p>
                                        )
                                    }

                                </div>
                                <div>
                                    <label className='label'>Category</label>
                                    <select {...register('category', {required: true})}
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
                                    <p className='font-semibold mb-2'>Select Services</p>
                                    <div className='grid grid-cols-2  gap-2 overflow-y-auto border p-2 rounded max-h-60'>
                                        {
                                            services.map(service=> (
                                                <label key={service._id} className='flex gap-2'>
                                                    <input value={service._id} type="checkbox" {...register(`services.${service._id}`)} />
                                                    {service.service_name}
                                                </label>
                                            ))
                                        }

                                    </div>

                                </div>
                                                          <div>
                                    <label className='label'>Price (BDT)</label>
                                    <input type='number' {...register('price', {required: true})}
                                    className='input w-full' 
                                    />
                                   

                                </div>
         
                               
                                
                                <div className='flex justify-end gap-2 pt-4'>
                                    <button type='submit' className='btn bg-primary text-white hover:bg-secondary'>Add Package</button>
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

export default AddPackageModal;