import React from 'react';
import { Link } from 'react-router';
import MyLink from './MyLink';
import Container from '../Container/Container';
import { FaHome, FaPhoneAlt, FaUsers } from 'react-icons/fa';
import { RiServiceFill } from 'react-icons/ri';
import Button from '../Button/Button';
import logoImg from '../../../assets/logo.png'

const Navbar = () => {
    const links = (
    <>
   
     <li>
         
        
          <MyLink to="/">
          <FaHome size={16}/>
          Home</MyLink>
        </li>
      <li>
        <MyLink to="/services">
        <RiServiceFill size={16} />
        
        Services</MyLink>
      </li>
       <li>
        <MyLink to="/about">
        <FaUsers size={16} />
        About Us</MyLink>
      </li>
      <li>
        <MyLink to="/contact">
        <FaPhoneAlt size={16} />
        Contact</MyLink>
      </li>
      
    
    </>
  );
    return (
         
     <Container className="bg-base-100 shadow-sm ">
         <div className="navbar py-3 sm:py-4 md:py-5 lg:py-6 ">
        
      
          <div className="navbar-start">
            
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
         <div className='flex items-center gap-1'>
           <img src={logoImg} alt="Brand Logo" className='w-20 h-20' />
           <div className='flex flex-col leading-tight'>
            <Link to="/">
            <p className=" font-bold text-[16px] sm:text-[17px] md:text-lg lg:text-2xl bg-gradient-to-r from-[#4F46E5] to-[#A78BFA] bg-clip-text text-transparent ">Laxius Decor</p>
            
          </Link>
            <p className='text-sm text-neutral font-medium -mt-1'>Design Beyond Ordinary</p>


           </div>
           
         </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end space-x-2">
         
           
         
            <Link
              to="/login"
            >
              <Button outline label="Login"/>
              
            </Link>
          

          <div className="flex items-center">
            <Link
              to="/sign-up"
            >
              <Button gradient label="Sign Up"/>
            </Link>
            
          </div>
          
        </div>
        
                
      </div>
     </Container>
    
    );
};

export default Navbar;