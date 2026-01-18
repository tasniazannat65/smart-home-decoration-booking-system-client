import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaShieldAlt, FaUserCircle, FaUserShield } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        toast.success("Logged in successfully!");
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const fillDemoUser = () => {
    setValue('email', 'user@gmail.com');
    setValue('password', 'User!123');
  }
  
  const fillDemoAdmin = ()=> {
    setValue('email', 'admin@gmail.com');
    setValue('password', 'Admin!123');
  }

 

  return (
 <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 relative overflow-hidden">
  <title>Laxius Decor || Login</title>
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
          <h1 className="text-4xl font-bold text-white mb-4">Welcome Back!</h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Sign in to access your account and continue your decoration journey with us
          </p>

        </div>
        <div className="relative z-10 space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-white font-bold text-lg mb-4">Quick Access</h3>
          <div className="space-y-3">
            <div className="bg-white/10
           rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaUserShield className="text-white"/>
                <span className="text-white font-semibold text-sm">Demo Admin</span>

              </div>

            </div>
            <p className="text-xs text-white/70 mb-2">Email: user@gmail.com</p>
            <p className="text-xs text-white/70">Password:User!123</p>

          </div>
           <div className="bg-white/10
           rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FaUserShield className="text-white"/>
                <span className="text-white font-semibold text-sm">Demo Admin</span>

              </div>

            </div>
            <p className="text-xs text-white/70 mb-2">Email: admin@gmail.com</p>
            <p className="text-xs text-white/70">Password: Admin!123</p>

          </div>


          </div>
         
          </div>

        </div>

      </div>
       <div className="p-8 md:py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-accent mb-2">Sign In</h2>
        <p className="text-neutral">Enter your credentials to access your account</p>
      </div>
      <div className="lg:hidden bg-base-200 rounded-xl p-4 mb-6 border border-base-300">
        <p className="text-xs font-semibold text-accent mb-3">Demo Credentials</p>
        <div className="grid grid-cols-2 gap-2">
          <button
          type="button"
          onClick={fillDemoUser}
          className="flex items-center gap-2 bg-base-100 border border-base-300 hover:border-primary px-3 py-2 rounded-lg text-xs transition-all"

          >
            <FaUserCircle className="text-primary"/>
            <span className="text-accent font-medium">Fill User</span>

          </button>
          <button
          type="button"
          onClick={fillDemoAdmin}
          className="flex items-center gap-2 bg-base-100 border border-base-300 hover:border-primary px-3 py-2 rounded-lg text-xs transition-all"

          >
            <FaUserShield className="text-secondary"/>
            <span className="text-accent font-medium">Fill Admin</span>

          </button>

        </div>

      </div>

         <form onSubmit={handleSubmit(handleLogin)} className='space-y-4' >
                 <fieldset className="fieldset">
                 
                  
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
                  <div className="flex justify-end">
                    <div className="text-sm text-primary hover:text-secondary hover:underline transition-colors font-medium">
                      Forget password
                    </div>

                  </div>
                  <div className="hidden lg:grid grid-cols-2 gap-3">
                    <button
                    type="button"
                    onClick={fillDemoUser}
                    className="flex items-center justify-center gap-2 bg-base-200 border-2 border-base-300 hover:border-primary hover:bg-base-100 px-4 py-2 rounded-lg text-sm transition-all"

                    >
                      <FaUserCircle className="text-primary"/>
                      <span className="text-accent font-medium">Demo User</span>

                    </button>
                    <button
                    type="button"
                    onClick={fillDemoAdmin}
                    className="flex items-center justify-center gap-2 bg-base-200 border-2 border-base-300 hover:border-secondary hover:bg-base-100 px-4 py-2 rounded-lg text-sm transition-all"

                    >
                      <FaUserShield className="text-secondary"/>
                      <span className="text-accent font-medium">Demo Admin</span>

                    </button>

                  </div>


                  

                       
         
         

               


        


         

        


       
          <button className="w-full bg-gradient-to-r from-primary to-secondary py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-white mt-4 text-base ">Sign In</button>
          <p className='text-center text-sm text-neutral'>Don't have an account?{" "} <Link to='/sign-up' className='text-primary hover:text-secondary font-semibold transition-colors hover:underline '>Create Account</Link></p>
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

export default Login;
