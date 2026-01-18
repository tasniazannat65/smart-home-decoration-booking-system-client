import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaEnvelope, FaEye, FaEyeSlash, FaImage, FaLock, FaShieldAlt, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then((result) => {
        const formData = new FormData();
        formData.append("image", profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success("User created successfully!");
            }
          });
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };
          updateUserProfile(userProfile)
            .then(() => {
              toast.success("user profile updated");
              navigate(location.state || "/");
            })
            .catch((error) => {
              toast.error(error.message);
            });
        });
      })
      .catch((error) => {
        toast.error(error.message);

      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <title>Laxius Decor || Sign Up</title>
  <div className="absolute inset-0">
    <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>

  </div>
  <div className="w-full max-w-5xl relative z-10">
    <div className="grid lg:grid-cols-2 gap-0 bg-base-100 rounded-xl shadow-lg overflow-hidden border-2 border-base-300">
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary via-primary to-secondary p-12 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white/10 rounded-full"></div>
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6">
          <FaShieldAlt className="text-white text-2xl"/>

          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to <br /> Laxius Decor</h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Join out community and transform your spaces with professional decoration services 
          </p>

        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-white/20 rounded-full p-2 mt-1">
            <FaCheckCircle className="text-white text-sm"/>

            </div>
            <div>
              <h3 className="text-white font-semibold">Professional Decorators</h3>
              <p className="text-white/80 text-sm">Access to experienced professionals</p>
            </div>

          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white/20 rounded-full p-2 mt-1">
            <FaCheckCircle className="text-white text-sm"/>

            </div>
            <div>
              <h3 className="text-white font-semibold">Easy Booking</h3>
              <p className="text-white/80 text-sm">Simple online booking process</p>
            </div>

          </div>
           <div className="flex items-start gap-3">
            <div className="bg-white/20 rounded-full p-2 mt-1">
            <FaCheckCircle className="text-white text-sm"/>

            </div>
            <div>
              <h3 className="text-white font-semibold">Secure Platform</h3>
              <p className="text-white/80 text-sm">Your data is safe with us</p>
            </div>

          </div>

        </div>
       

       

      </div>
       <div className="p-8 md:py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-accent mb-2">Create Account</h2>
        <p className="text-neutral">Start your decoration journey today</p>
      </div>
  

         <form onSubmit={handleSubmit(handleRegistration)} className='space-y-4' >
                 <fieldset className="fieldset">
                  <div>
                      <label className=" text-sm font-semibold text-accent mb-2 flex items-center gap-2">
                        <FaUser className="text-primary"/>
                        Full Name
                        </label>
        <input type="text" {...register('name', {required: 'Name is required.', minLength: {value: 6, message: 'Name must be at least 6 characters.'}})} className="w-full px-4 py-3
         bg-base-200 border-2 border-base-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-accent placeholder:text-neutral/50 " placeholder="Enter your full name" />
         {
            errors.name && <p className='text-error text-xs mt-1'>{errors.name.message}</p>
          }

                  </div>
                  <div>
                      <label className=" text-sm font-semibold text-accent mb-2 flex items-center gap-2">
                        <FaImage className="text-primary"/>
                        Profile Photo 
                        </label>
        <input type="file" {...register('photo', {required: true})} className="w-full px-4 py-3
         bg-base-200 border-2 border-base-300 rounded-lg focus:border-primary  focus:outline-none transition-all text-accent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 placeholder:text-neutral/50 "/>
         {
            errors.photo?.type==='required' && <p className='text-error text-xs mt-1'>Photo is required.</p>
          }
                  </div>
                   <div>
                      <label className=" text-sm font-semibold text-accent mb-2 flex items-center gap-2">
                        <FaEnvelope  className="text-primary"/>
                        Email Address 
                        </label>
        <input type="email" {...register('email', {required: true})} className="w-full px-4 py-3
         bg-base-200 border-2 border-base-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-accent placeholder:text-neutral/50 " placeholder="example@gmail.com" />
       
            {
            errors.email?.type==='required' && <p className='text-error text-xs mt-1'>Email is required.</p>
          }

                  </div>

                  <div>
                      <label className=" text-sm font-semibold text-accent mb-2 flex items-center gap-2">
                        <FaLock  className="text-primary"/>
                        Password  
                        </label>
                         <div className='relative'>
          <input type={show ? 'text' : 'password'}
          
          {...register('password', {required: true, minLength: 6,
          pattern:  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).+$/


          })} className="w-full px-4 py-3
         bg-base-200 border-2 border-base-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-accent placeholder:text-neutral/50 " placeholder="*******" />
          <span className='absolute  right-4 top-1/2 -translate-y-1/2 text-neutral hover:text-primary transition-colors ' onClick={()=>setShow(!show)}>{show ? <FaEye size={18}/>  : <FaEyeSlash size={18}/>}</span>
        </div>

          {
            errors.password?.type==='required' && <p className='text-error text-xs mt-1'>Password is required.</p>
          }
          {
            errors.password?.type==='minLength' && <p className='text-error text-xs mt-1'>Password must be 6 characters or longer.</p>
          }
          {
            errors.password?.type==='pattern' && <p className='text-error text-xs mt-1'>Password must have one UpperCase, one LowerCase, one Number and one special character. </p>
          }

       

                  </div>



       
          <button className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-white mt-4 text-base ">Create Account</button>
          <p className='text-center text-sm text-neutral'>Already have an account?{" "} <Link to='/login' className='text-primary hover:text-secondary font-semibold transition-colors hover:underline '>Login Here</Link></p>
          <div className='flex items-center gap-3 '>
            <div className='flex-1 h-px bg-base-300'></div>
            <p className='text-xs text-neutral font-medium'>OR</p>

            <div className='flex-1 h-px bg-base-300'></div>
          </div>
          <GoogleLogin/>

     
        </fieldset>
            </form>  

    </div>

    </div>

   

  </div>

 </div>
  );
};

export default SignUp;



    