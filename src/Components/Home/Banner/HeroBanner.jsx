import React, { useState } from 'react';
import {motion} from "framer-motion"
import decor from '../../../assets/smart_decor.jpg'
import MyLink from '../../Shared/Navbar/MyLink';
import { HiX, HiMenu  } from "react-icons/hi";
import { Link } from 'react-router';



const HeroBanner = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const links = <>
    <MyLink onClick={()=>setMenuOpen(false)} to='/'>Home</MyLink>
    <MyLink onClick={()=>setMenuOpen(false)} to='/services'>Services</MyLink>
    <MyLink onClick={()=>setMenuOpen(false)} to='/about'>About Us</MyLink>
    <MyLink onClick={()=>setMenuOpen(false)} to='/contact'>Contact Us</MyLink>
    
    </>
    return (
        <div className='relative w-full h-screen'>
            <img src={decor} alt="decoration" className='absolute w-full h-full object-cover brightness-75' />
            <div className='absolute inset-0 bg-black/40'>

            </div>
     
               <div className='absolute top-4 right-16 z-20 hidden md:flex lg:flex gap-6'>
                {links}

            </div>
            <div className='absolute top-4 right-6 z-30 md:hidden lg:hidden'>
                <button onClick={()=>setMenuOpen(!menuOpen)} className='text-white text-3xl'>
                    {menuOpen ? <HiX/> : <HiMenu/>}
                </button>

            </div>
            {
                menuOpen && (
                    <div className='absolute top-16 right-6 bg-black/70 text-white flex flex-col gap-4 p-4 rounded-md md:hidden lg:hidden'>
                        {links}

                    </div>
                )
            }
            <motion.div 
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className='relative z-10 flex flex-col justify-center item-center h-full max-w-4xl mx-auto px-6 text-center text-white'
            
            >
                <motion.h1 
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2, duration: 0.7}}
                className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4'
                >
                    Make Your Space <span className='text-primary'>Elegant</span> & <span className='text-secondary'>Memorable</span>

                </motion.h1>
                <motion.p
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.4, duration: 0.7}}
                >
                    Premium decoration services for weddings, birthdays, corporate, events and smart homes.

                </motion.p>
                <motion.div
                className='flex justify-center gap-4 items-center mt-4'
                >
                    <Link to='/services'>
                    <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.97}}
                    transition={{type: 'spring', stiffness: 200}}
                    className='px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary shadow-lg'
                    >
                        Book Decoration Service

                    </motion.button>
                    </Link>
                    <Link to='/contact'>
                    <motion.button
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 0.97}}
                    transition={{type: 'spring', stiffness: 200}}
                    className='px-8 py-3 border border-white  text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 shadow-lg'
                    >
                        Get in Touch

                    </motion.button>
                    </Link>

                </motion.div>

            </motion.div>
    
            
        </div>
    );
};

export default HeroBanner;