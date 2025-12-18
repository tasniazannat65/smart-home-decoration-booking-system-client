import React from 'react';
import image from '../../assets/image.webp'
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';


const Contact = () => {
  return (
    
      <div className='md:bg-gray-300 lg:bg-gray-300 flex flex-col md:flex-row lg:flex-row min-h-[280px] w-full md:relative lg:relative py-10 md:py-0 lg:py-0'>
      <img src={image} alt="Person" className=' lg:absolute md:absolute lg:top-16 md:top-16 shadow-xl lg:left-[490px] md:left-60 lg:h-[500px] md:h-[300px]' />

        <div className='w-full p-6 md:p-12 lg:p-16 flex justify-center items-center md:absolute lg:absolute z-30 lg:top-36 md:top-28 lg:right-80 md:right-60'>
          <div className='bg-white w-[350px] lg:w-[500px] lg:h-[450px] shadow-2xl p-8'>
            <h2 className='text-3xl font-bold text-primary mb-6 text-center'>Contact Us</h2>
           <form className='space-y-4'>
            <input type="text" placeholder='Enter your Name' className='w-full border-b border-gray-400 px-2 py-2 focus:outline-none focus:border-primary transition' />
          
            <input type="email" placeholder='Enter a valid email address' className='w-full border-b border-gray-400 px-2 py-2 focus:outline-none focus:border-primary transition' />
            <textarea rows="4" placeholder='Enter your message' className='w-full border-b border-gray-400 px-2 py-2 focus:outline-none focus:border-primary transition'></textarea>
            <button className='w-full bg-primary text-white py-2 rounded-full font-semibold hover:bg-secondary transition'>Submit</button>

           </form>
          </div>

        </div>

      <section className='bg-gradient-to-r from-primary/90 to-secondary/80 text-white lg:py-8 py-5 md:absolute lg:absolute md:top-[560px] lg:top-[600px] lg:left-[600px] md:left-[130px] z-50 lg:px-10 px-6 shadow-xl'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row lg:flex-row justify-around items-center gap-6'>
        <div className='flex items-center gap-3 hover:scale-105 transition cursor-pointer'>
          <FaPhoneAlt size={20}/>
          <div className='font-bold'>
            <p>+880 1234 876520</p>
            <p>+880 1234 876566</p>

          </div>

        </div>
        <div className='flex items-center gap-3 hover:scale-105 transition cursor-pointer'>
          <FaMapMarkerAlt size={20}/>
          <div className='font-bold'>
            <p>2000, Mirpur,</p>
          <p>Dhaka</p>
          </div>

        </div>
        <div className='flex items-center gap-3 hover:scale-105 transition cursor-pointer'>
          <FaClock size={20}/>
          <div className='font-bold'>
                         <p>Mon - Fri: 09:00 AM - 08:00 PM</p>

              <p>Sat - Sun: 10:00 AM - 06:00 PM</p>
          </div>

        </div>


      </div>

      </section>


      
    </div>
    
  );
};

export default Contact;