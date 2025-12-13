import React from 'react';
import Container from '../Container/Container';
import logoImg from '../../../assets/logo.png'
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaLinkedinIn, FaPhoneFlip, FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';
import { IoIosMail } from 'react-icons/io';

const Footer = () => {
    return (
        <footer className='bg-gray-300 mt-10 pt-10 pb-6'>
            <Container>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-400 pb-6'>
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-1'>
                        <img src={logoImg} alt="Brand Logo" className='w-20 h-20' />
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Laxius Decor</h1>
                            <p className='text-sm mt-1 text-neutral'>Design Beyond Ordinary</p>

                        </div>

                    </div>
                    <div className='flex gap-4 mt-4 md:mt-0'>
                        <a href="#" className='w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:scale-110 transition-transform'>
                            <FaFacebookF/>
                        </a>
                        <a href="#" className='w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:scale-110 transition-transform'>
                            <FaXTwitter />
                        </a>
                        <a href="#" className='w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:scale-110 transition-transform'>
                            <FaInstagram/>
                        </a>
                        <a href="#" className='w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:scale-110 transition-transform'>
                         <FaLinkedinIn />
                        </a>

                    </div>

                </div>
                <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8'>
                    <div>
                        <h3 className='text-primary font-semibold mb-3'>Quick Links</h3>
                        <ul className='space-y-2 text-accent'>
                            <li><Link to='/' className='hover:text-secondary hover:underline'>Home</Link></li>
                            <li><Link to='/services' className='hover:text-secondary hover:underline'>Services</Link></li>
                            <li><Link to='/about' className='hover:text-secondary hover:underline'>About Us</Link></li>
                            <li><Link to='/contact' className='hover:text-secondary hover:underline'>Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-primary font-semibold mb-3'>Our Services</h3>
                        <ul className='space-y-2 text-accent'>
                            <li>Home Decoration</li>
                            <li>Wedding Decoration</li>
                            <li>Event Planning</li>
                            <li>Corporate Ceremonies</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-primary font-semibold mb-3'>Contact</h3>
                        <ul className='space-y-2 text-accent'>
                            <li className='flex items-center gap-1'><FaPhoneFlip />

                                +880 1234 876520</li>
                            <li className='flex items-center gap-1'><IoIosMail />
                                support@laxiusdecor.com</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-primary font-semibold mb-3'>Working Hours</h3>
                        <ul className='space-y-2 text-accent'>
                            <li>Mon - Fri: 09:00 AM - 08:00 PM</li>
                            <li>Sat - Sun: 10:00 AM - 06:00 PM</li>
                        </ul>
                    </div>

                </div>
                <div className='mt-10 text-center text-gray-600 text-md border-t border-gray-400 '>
<p className='mt-5'>                    © 2025 Laxius Decor. All Rights Reserved.
</p>
                </div>
            </Container>

        </footer>
    );
};

export default Footer;