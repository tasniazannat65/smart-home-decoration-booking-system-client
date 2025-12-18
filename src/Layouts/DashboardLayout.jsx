import React from 'react';
import useRole from '../Hooks/useRole';
import logoImg from '../assets/logo.png'
import { Link, NavLink, Outlet } from 'react-router';
import { CgProfile } from "react-icons/cg";
import { FiPackage } from "react-icons/fi";
import { FaBoxOpen, FaChartBar, FaChartLine, FaClipboardCheck, FaClipboardList,  FaRegCreditCard, FaTasks, FaUserPlus, FaUserTie } from 'react-icons/fa';
import {  MdOutlinePayment, MdPaid, MdSchedule } from "react-icons/md";
import Loading from '../Components/Shared/Loading/Loading';




const DashboardLayout = () => {
    const {role, roleLoading} = useRole();
    if(roleLoading){
      return <Loading/>
    }
    return (
      <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar w-full bg-base-300">
      <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
<p className=" font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent "> Dashboard</p>    </nav>
   <div className=' min-h-screen'>
    <div className='w-11/12 mx-auto py-10'>
   
      <Outlet />
    </div>
   </div>

    
    {/* Page content here */}
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-28 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
        <li>
            <Link to="/">
           <img src={logoImg} alt="Brand Logo" className='w-16 h-16' />
                       

                    </Link>
        </li>
        {/* List item */}
        <li>
          <Link to='/dashboard' className="is-drawer-close:tooltip hover:bg-secondary hover:text-white text-primary font-semibold text-lg is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-6"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </Link>
        </li>
        {/* user can access these page */}
        {
          role === 'user' && <>
          <li>
            <NavLink to='/dashboard/my-booking' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="My Booking"
            >
              <FiPackage size={24} />

              
              
              <span className="is-drawer-close:hidden">
              
              My Booking</span></NavLink>
        </li>
        <li>
            <NavLink to='/dashboard/payment-history' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Payment History"
            >
              <FaRegCreditCard size={24}/>
              
              
              <span className="is-drawer-close:hidden">
              
              Payment History</span></NavLink>
        </li>
       
          
          </>
        }
        
       {/* decorator can access these page */}

        {
          role === 'decorator' && <>
           <li>
            <NavLink to='/dashboard/assigned-projects' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Assigned Projects"
            >
              <FaTasks size={24}/>


              
              
              <span className="is-drawer-close:hidden">
              
              Assigned Projects</span></NavLink>
        </li>
          
           <li>
            <NavLink to='/dashboard/today-schedule' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Today's Schedule"
            >
              <MdSchedule size={24}/>

              
              
              <span className="is-drawer-close:hidden">
              Today's Schedule
              </span></NavLink>
        </li>
           <li>
            <NavLink to='/dashboard/earnings' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Earnings Summary"
            >
              <MdPaid size={24}/>

              
              
              <span className="is-drawer-close:hidden">
              Earnings Summary
              </span></NavLink>
        </li>
           <li>
            <NavLink to='/dashboard/earnings-history' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Payment History"
            >
              <MdOutlinePayment size={24}/>

              
              
              <span className="is-drawer-close:hidden">
              payment History
              </span></NavLink>
        </li>
          
          
          
          </>
        }

{/* admin can manage these page */}

        {
          role === 'admin' && <>
           <li>
            <NavLink to='/dashboard/manage-services' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Manage Services & Packages"
            >
              <FaBoxOpen size={24} />

              
              
              <span className="is-drawer-close:hidden">
              
              Manage Services & Packages</span></NavLink>
        </li>
           <li>
            <NavLink to='/dashboard/manage-decorators' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Manage Decorators"
            >
              <FaUserTie size={24} />

              
              
              <span className="is-drawer-close:hidden">
              
              Manage Decorators</span></NavLink>
        </li>
        <li>
            <NavLink to='/dashboard/booking-management' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Bookings"
            >
              <FaClipboardList size={24} />

              
              
              <span className="is-drawer-close:hidden">
              
              Bookings</span></NavLink>
        </li>
           
        
       
        <li>
            <NavLink to='/dashboard/revenue' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Revenue"
            >
              <FaChartLine size={24} />

              
              
              <span className="is-drawer-close:hidden">
              
              Revenue</span></NavLink>
        </li>
        <li>
            <NavLink to='/dashboard/analytics' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Analytics"
            >
              <FaChartBar size={24} />

              
              
              <span className="is-drawer-close:hidden">
              
              Analytics</span></NavLink>
        </li>
          
          </>
        }

         <li>
         <NavLink to='/dashboard/profile' 
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right hover:bg-secondary hover:text-white text-primary font-semibold text-lg " data-tip="Profile"
            >
              <CgProfile size={24}/>

              
              
              <span className="is-drawer-close:hidden">
              
              Profile</span></NavLink>

       </li>
       

       
      </ul>
    </div>
  </div>
</div>
    );
};

export default DashboardLayout;