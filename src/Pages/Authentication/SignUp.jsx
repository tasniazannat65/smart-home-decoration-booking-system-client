import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import GoogleLogin from './GoogleLogin';

const SignUp = () => {
        const {register, handleSubmit, formState: {errors}} = useForm();
        const [show, setShow] = useState(false);
        const {createUser, updateUserProfile} = useAuth();
        const location = useLocation();
        const navigate = useNavigate();
        const axiosSecure = useAxiosSecure();

        const handleRegistration = (data)=>{
          console.log(data)

          const profileImg = data.photo[0];
          createUser(data.email, data.password)
          .then(result=>{
            console.log(result.user)
            const formData = new FormData();
            formData.append('image', profileImg);
            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
            axios.post(image_API_URL, formData)
            .then(res=>{
              const photoURL = res.data.data.url;
              const userInfo = {
                email: data.email,
                  displayName: data.name,
              photoURL: photoURL

              }
              axiosSecure.post('/users', userInfo)
              .then(res=> {
                if(res.data.insertedId){
                  toast.success('User created successfully!')
                }
              })
              const userProfile = {
                displayName: data.name,
                photoURL: photoURL
                
              }
              updateUserProfile(userProfile)
              .then(()=>{
                console.log('user profile updated')
                navigate(location.state || '/')
              })
              .catch(error=>{
                toast.error(error.message)
              })

            
            })
          })
          .catch(error=>{
            toast.error(error.message)
          })
        }

    return (
       <div className='flex justify-center items-center min-h-screen bg-white'>
         <div className='flex flex-col max-w-md p-6 rounded-md md:p-8 lg:p-10 bg-gray-100 text-gray-900'>

            <div className='mb-8 text-center'>
                <h2 className='font-bold my-3 text-4xl'>Create Your Account</h2>
            <p className='text-sm text-gray-400'>Get started with Laxius Decor</p>
            </div>
            <form onSubmit={handleSubmit(handleRegistration)} className='space-y-4' >
                 <fieldset className="fieldset">
               


          <label className="label text-[#0F172A] font-medium">Name</label>
        <input type="text" {...register('name', {required: 'Name is required.', minLength: {value: 6, message: 'Name must be at least 6 characters.'}})} className="input w-full" placeholder="Enter your name" />
         {
            errors.name && <p className='text-red-600 mt-1'>{errors.name.message}</p>
          }
                       <label className="label text-[#0F172A] font-medium">Photo</label>

                       
                       
        <input type="file" {...register('photo', {required: true})} className="file-input w-full" placeholder="Enter your photo" />
         {
            errors.photo?.type==='required' && <p className='text-red-600'>Photo is required.</p>
          }


          <label className="label text-[#0F172A] font-medium">Email</label>
          <input type="email" {...register('email', {required: true})} className="input w-full" placeholder="example@gmail.com" />

          {
            errors.email?.type==='required' && <p className='text-red-600'>Email is required.</p>
          }


        <div className='relative'>
              <label className="label text-[#0F172A] font-medium">Password</label>
          <input type={show ? 'text' : 'password'}
          
          {...register('password', {required: true, minLength: 6,
          pattern:  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/


          })} className="input w-full" placeholder="*******" />
          <span className='absolute bottom-3 right-3 z-50' onClick={()=>setShow(!show)}>{show ? <FaEye size={16}/>  : <FaEyeSlash size={16}/>}</span>
        </div>

          {
            errors.password?.type==='required' && <p className='text-red-600'>Password is required.</p>
          }
          {
            errors.password?.type==='minLength' && <p className='text-red-600'>Password must be 6 characters or longer.</p>
          }
          {
            errors.password?.type==='pattern' && <p className='text-red-600'>Password must have one UpperCase, one LowerCase, one Number and one special character. </p>
          }
          <button className="btn bg-gradient-to-r from-primary to-secondary text-white mt-4 font-medium">Register</button>
          <p className='text-[#71717A] text-[15px]'>Already have an account? <Link to='/login' className='text-secondary hover:text-primary hover:underline'>Login</Link></p>
          <div className='flex items-center gap-1'>
            <div className='border-t border-gray-400 w-full'></div>
            <p className='text-gray-500 text-center'>Or</p>

            <div className='border-t border-gray-400 w-full'></div>
          </div>
          <GoogleLogin/>

     
        </fieldset>
            </form>
            
        </div>
       </div>
    );
};

export default SignUp;