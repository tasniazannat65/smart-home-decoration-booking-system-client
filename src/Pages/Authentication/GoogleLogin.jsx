import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const GoogleLogin = () => {
    const {googleSignIn} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result=>{
               const userInfo = {
                email: result.user.email,
                displayName: result.user.displayName,
              photoURL: result.user.photoURL

                }
                  axiosSecure.post('/users', userInfo)
                .then(res=>{

                    if(res.data.insertedId){
                        toast.success('Logged in user with Google successfully!')

                    }
                                             navigate(location.state || '/');

                })



        })
        .catch(error=>{
            toast.error(error.message)
        })
    }
    return (
       <button onClick={handleGoogleSignIn} className="w-full flex text-base items-center justify-center gap-3 bg-base-100 border-2 border-base-300 hover:border-primary text-accent py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">

        <FcGoogle size={16}/>

  Continue with Google
</button>
    );
};

export default GoogleLogin;