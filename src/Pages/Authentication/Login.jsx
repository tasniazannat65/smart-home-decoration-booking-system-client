import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import GoogleLogin from './GoogleLogin';

const Login = () => {
     const {register, handleSubmit, formState: {errors}} = useForm();
            const [show, setShow] = useState(false);
            const {signInUser} = useAuth();
            const navigate = useNavigate();
            const location = useLocation();
            const handleLogin = (data)=>{
            signInUser(data.email, data.password)
            .then(result=>{
                // console.log(result.user)
                toast.success('Logged in successfully!')
                navigate(location.state || '/')
            })
            .catch(error=>{
                toast.error(error.message)
            })
        }

    return (
       <div className='flex justify-center items-center min-h-screen bg-white'>
         <div className='flex flex-col max-w-md p-6 rounded-md md:p-8 lg:p-10 bg-gray-100 text-gray-900'>

            <div className='mb-8 text-center'>
                <h2 className='font-bold my-3 text-4xl'>Welcome Back</h2>
            <p className='text-sm text-gray-400'>Login to continue your journey</p>
            </div>
            <form onSubmit={handleSubmit(handleLogin)} className='space-y-4' >
                 <fieldset className="fieldset">
                       
                       
        



          <label className="label text-[#0F172A] font-medium">Email</label>
          <input type="email" {...register('email', {required: true})} className="input w-full" placeholder="Email" />

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
                    <div><a className="link link-hover">Forgot password?</a></div>

          <button className="btn bg-gradient-to-r from-primary to-secondary text-white mt-4 font-medium">Login</button>
          <p className='text-[#71717A] text-[15px]'>Don’t have any account? <Link to='/sign-up' className='text-secondary hover:text-primary hover:underline'>Sign Up</Link></p>
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

export default Login;