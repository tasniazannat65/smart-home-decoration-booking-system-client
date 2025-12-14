import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const EditUserModal = ({isOpen, setIsOpen, user, onSubmit}) => {
const {register, handleSubmit, reset, control, formState: {errors}} = useForm();

useEffect(()=>{
    if(user){
        reset({
            displayName: user?.displayName,
            role: user?.role,
            status: user?.status || ''
        })
    }
},[user, reset])
const role = useWatch({control, name:'role'});
const closeModal = ()=>{
    reset();
    setIsOpen(false);
}
const HandleEditSubmit = (data)=>{
    onSubmit(user._id, data);
    closeModal();
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
                <div className='fixed inset-0 bg-black/40'/>

            </TransitionChild>
            <div className='fixed inset-0 flex items-center justify-center p-4'>
                <TransitionChild
                  as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
                
                
                >

                    <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <DialogTitle className="text-xl font-semibold mb-4">
                            Edit User
                        </DialogTitle>
                        <form onSubmit={handleSubmit(HandleEditSubmit)} className='space-y-4'>
                            <div>
                                <label className='label'>Name</label>
                                <input {...register('displayName', {required: true})} className='input w-full' />
                                {
                                    errors.displayName && (
                                        <p className='text-red-500 text-sm'>Name is required</p>
                                    )
                                }

                            </div>
                            <div>
                                <label className='label'>Email</label>
                                <input value={user?.email}  {...register('email', {required: true})} className='input w-full bg-gray-100' />
                                {
                                    errors.email && (
                                        <p className='text-red-500 text-sm'>Email is required</p>
                                    )
                                }

                            </div>
                            <div>
                                <label className='label'>Role</label>
                                <select {...register('role')} className='select w-full'>
                                    <option value="user">User</option>
                                    <option value="decorator">Decorator</option>
                                </select>

                            </div>
                            {
                                role === 'decorator' && (
                                    <div>
                                        <label className='label'>Status</label>
                                        <select {...register('status')} className='select w-full'>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="disabled">Disabled</option>
                                        </select>

                                    </div>
                                )
                            }
                            <div className='flex justify-end gap-3 mt-6'>
                                <button type='submit' className='btn btn-primary hover:btn-secondary text-white'>
                                    Save Changes
                                </button>
                                <button type='button' onClick={closeModal} className='btn bg-gray-600 hover:bg-gray-500 text-white'>
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </DialogPanel>

                </TransitionChild>

            </div>

        </Dialog>

      </Transition>
    );
};

export default EditUserModal;