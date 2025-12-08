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
       <button onClick={handleGoogleSignIn} className="btn bg-gray-300 text-black border-[#e5e5e5]">
        <FcGoogle size={16}/>

  Login with Google
</button>
    );
};

export default GoogleLogin;