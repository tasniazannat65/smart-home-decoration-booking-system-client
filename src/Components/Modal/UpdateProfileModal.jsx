import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';

const UpdateProfileModal = ({isOpen, closeModal, user, refetch}) => {

    const axiosSecure = useAxiosSecure();
    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            name: user?.displayName || '',
        } 
    })
    useEffect(()=>{
      reset({
        name: user?.displayName || ''
      })
    },[user, reset])
    const handleProfileUpdate = async(data)=>{
      let photoURL = user?.photoURL;
      if(data.photo?.[0]){
            const profileImg = data.photo[0];
                    const formData = new FormData();
                            formData.append("image", profileImg);
                             const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        const res = await axios.post(image_API_URL, formData);
        photoURL = res.data.data.url;




      }
        try {
            await axiosSecure.patch('/users/profile',{
                displayName: data.name,
                photoURL,
            });
            toast.success('Profile updated successfully');
            closeModal();
            refetch();
           
        } catch (error) {
            toast.error('Profile update failed');
            
        }
    }
    return (
       <Transition appear show={isOpen} as={Fragment}>
             <Dialog as="div" className="relative z-50" onClose={closeModal}>
               <TransitionChild
                 as={Fragment}
                 enter="ease-out duration-200"
                 enterFrom="opacity-0"
                 enterTo="opacity-100"
                 leave="ease-in duration-150"
                 leaveFrom="opacity-100"
                 leaveTo="opacity-0"
               >
                 <div className="fixed inset-0 bg-black/40" />
               </TransitionChild>
               <div className="fixed inset-0 flex items-center justify-center p-4">
                 <TransitionChild
                   as={Fragment}
                   enter="ease-out duration-200"
                   enterFrom="opacity-0 scale-90"
                   enterTo="opacity-100 scale-100"
                   leave="ease-in duration-150"
                   leaveFrom="opacity-100 scale-100"
                   leaveTo="opacity-0 scale-90"
                 >
                   <DialogPanel className="w-full max-w-md bg-base-100 rounded-xl p-6 shadow-lg">
                     <DialogTitle className="text-lg font-semibold text-primary mb-4">
                       Update Profile 
                     </DialogTitle>
                     <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-4">
                       <div>
                         <label className="font-semibold text-sm">Name</label>
                         <input
                         type='text'
                           {...register("name")}
                           className="w-full border px-3 py-2 rounded-md"
                         />
                      
                       </div>
                       <div>
                         <label className="font-semibold text-sm">Profile Image</label>
     <input type="file" accept='image/*' {...register('photo')} className="w-full border px-3 py-2 rounded-md"/>
                        
                       </div>

                       <div className="flex justify-end gap-2 pt-4">
                         <button
                           type="submit"
                           className="btn bg-primary hover:bg-secondary text-white flex-1"
                         >
                          Update
                         </button>
                         <button
                           onClick={closeModal}
                           type="button"
                           className="btn bg-gray-700 hover:bg-gray-500  text-white flex-1"
                         >
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

export default UpdateProfileModal;