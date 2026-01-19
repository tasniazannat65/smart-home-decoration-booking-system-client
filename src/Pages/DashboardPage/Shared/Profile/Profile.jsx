import React, { useState } from 'react';
import useRole from '../../../../Hooks/useRole';
import Loading from '../../../../Components/Shared/Loading/Loading';
import { FaBriefcase, FaCheckCircle, FaCrown, FaEdit, FaEnvelope, FaPaintBrush, FaShieldAlt, FaUser, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router';
import UpdateProfileModal from '../../../../Components/Modal/UpdateProfileModal';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
  const {role, roleLoading} = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {data: user, refetch, isLoading} = useQuery({
    queryKey: ['profile'],
    queryFn: async()=> {
      const res = await axiosSecure.get('/users/profile');
      return res.data;
    }
  })
  const getRoleIcon = () => {
    if(role === 'admin') return <FaCrown className='text-white'/>
    if(role === 'decorator') return <FaPaintBrush className='text-white'/>
    return <FaUser className='text-white'/>

  }
  const getRoleColor = ()=> {
    if(role === 'admin') return 'from-primary to-primary/80';
    if(role === 'decorator') return 'from-secondary to-secondary/80';
    return 'from-success to-success/80'

  }
  if(roleLoading || isLoading) return <Loading/>
  return (
    <div className='min-h-screen bg-base-200 py-8 px-4 relative overflow-hidden'>
      <title>Laxius Decor || Profile</title>
      <div className='absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl'></div>
      <div className='max-w-4xl mx-auto relative z-10'>
        <div className='bg-base-100 rounded-xl shadow-lg overflow-hidden border-2 border-base-300'>
          <div className={`bg-gradient-to-r ${getRoleColor()} p-8 md:p-12 relative`}>
            <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
            <div className='flex flex-col items-center relative z-10'>
              <div className='relative group'>
                <div className='relative'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-full blur-lg group-hover:blur-xl transition-all'>

                  </div>
                  <img src={user?.photoURL || 'https://i.pravatar.cc/150?img=68'} alt="profile" className='relative w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover' />
                  <div className='absolute bottom-0 right-0 bg-success rounded-full p-2 border-4 border-white shadow-lg'>
                    <FaCheckCircle className='text-white text-lg'/>

                  </div>

                </div>

              </div>

              <div className='mt-4 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full flex items-center gap-2 border-2 border-white/30 shadow-lg'>
              {getRoleIcon()}
              <span className='text-white font-bold text-sm uppercase tracking-wider'>
                {role}
              </span>

              </div>
              <h2 className='mt-4 text-2xl md:text-3xl font-bold text-white'>
                {user?.displayName || 'User Name'}
              </h2>

            </div>

          </div>

          <div className='p-6 md:p-8'>
            <div className='grid md:grid-cols-2 gap-4 mb-8'>
              <div className='bg-base-200 rounded-xl p-5 border-2 border-base-300 hover:border-primary/50 transition-colors group'>
              <div className='flex items-start gap-4'>
                <div className='bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors'>
                <FaEnvelope className='text-primary text-xl'/>

                </div>
                <div className='flex-1'>
                   <p className='text-xs font-semibold text-neutral mb-1'>
                  Email Address
                </p>
                <p className='text-accent font-medium break-all'>
                  {user?.email || 'user@example.com'}
                </p>

                </div>
               

              </div>

              </div>
               <div className='bg-base-200 rounded-xl p-5 border-2 border-base-300 hover:border-secondary/50 transition-colors group'>
            <div className='flex items-start gap-4'>
              <div className='bg-secondary/10 p-3 rounded-lg group-hover:bg-secondary/20 transition-colors'>
              <FaShieldAlt className='text-secondary text-xl'/>

              </div>

              <div className='flex-1'>
                <p className='text-xs font-semibold text-neutral mb-1'>
                  Account Type
                </p>
                <p className='text-accent font-medium capitalize'>
                  {role} Account
                </p>

              </div>

            </div>

            </div>

            </div>
             <div className='space-y-3'>
            <p className='text-sm font-semibold text-neutral mb-4'>
              Quick Actions
            </p>
            <div className={`grid gap-3 ${
              role === 'user'
              ? 'grid-cols-1 md:grid-cols-2'
              : role === 'decorator'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2'
            }`}>
              <button
              onClick={()=> setIsOpen(true)}
              className='flex items-center justify-center gap-3 bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
              >
                <FaEdit className='text-lg'/>
                <span>Update Profile</span>

              </button>
              {
                role === 'admin' && (
                  <Link to={'/dashboard/manage-decorators'}>
                    <button
                    className='w-full flex items-center justify-center gap-3 bg-gradient-to-r from-error to-error/80 hover:from-error/90 hover:to-error/70 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
                    >
                      <FaUsers className='text-lg'/>
                      <span>Manage Users</span>

                    </button>
                  
                  </Link>
                )
              }

              {
                role === 'decorator' && (
                  <Link to={'/dashboard/assigned-projects'}>
                    <button
                    className='w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
                    >
                      <FaBriefcase className='text-lg'/>
                      <span>My Services</span>

                    </button>
                  
                  </Link>
                )
              }

            </div>

          </div>

           

          </div>

        </div>

      </div>
      <UpdateProfileModal isOpen={isOpen} closeModal={()=> setIsOpen(false)} user={user} refetch={refetch}/>
      
    </div>
  );
};

export default Profile;