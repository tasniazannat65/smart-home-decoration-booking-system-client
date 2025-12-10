import React from 'react';
import { Link, NavLink } from 'react-router';
import MyLink from './MyLink';
import Container from '../Container/Container';
import Button from '../Button/Button';
import logoImg from '../../../assets/logo.png'
import useAuth from '../../../Hooks/useAuth';
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const {user, signOutUser} = useAuth();
  
   
 
 
    return (
         
<div className='bg-base-200 shadow-sm'>
       <Container>
            <div className="navbar">
  <div className="flex-1">
  <div className='flex items-center gap-1'>
           <img src={logoImg} alt="Brand Logo" className='w-16 h-16' />
           <div className='flex flex-col leading-tight'>
            <Link to="/">
            <p className=" font-bold text-[16px] sm:text-[17px] md:text-lg lg:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ">Laxius Decor</p>
            
          </Link>
            <p className='text-sm text-neutral font-medium -mt-1'>Design Beyond Ordinary</p>


           </div>
           
         </div>  
         
         </div>
  <div className="flex items-center gap-1 lg:gap-2">
      {
            user ? (
       <div className=" dropdown dropdown-end  z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  referrerPolicy="no-referrer"
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className=" pb-3 border-b border-b-gray-200 space-y-2">
                <li className="text-sm font-bold text-primary text-center">{user.displayName}</li>
                <li className="text-xs text-gray-600 text-center">{user.email}</li>
              </div>
             
           <ul >
              <li className=' text-gray-700 font-semibold text-xl'>
                <Link to="/dashboard">
                
                  Dashboard
                </Link>
              </li>
             
             
           

           </ul>
          
             

             
              <li>

              <button onClick={signOutUser} className='btn bg-white border-2 text-[16px] font-medium border-secondary text-secondary'>
                <BiLogOut/>
                Log Out</button>             
 </li>
            </ul>
        
     
          </div>
          
        
    )  :   <Link
              to="/login"
            >
              <Button outline label="Login"/>
              
            </Link>
          }
         
           
         
          
          

          <div className="flex items-center">
            <Link
              to="/sign-up"
            >
              <Button label="Sign Up"/>
            </Link>
            
          </div>
  </div>
</div>
</Container>
</div>
    
    );
};

export default Navbar;