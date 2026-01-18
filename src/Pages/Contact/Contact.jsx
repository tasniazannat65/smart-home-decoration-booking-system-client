import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Container from '../../Components/Shared/Container/Container';
import { FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkedAlt, FaPaperPlane, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const handleSubmit = (e)=> {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({name: '', email: '', message: ''});
  }
  const handleChange = (e)=> {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    })
  }
  return (
    <div className='bg-base-200'>
      <div className='bg-gradient-to-r from-primary to-secondary py-12 md:py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3'>Let's Work Together</h1>
            <p className='text-white/90 text-base md:text-lg'>
              Have a project in mind? We'd love to hear about it. Drop us a message and we'll respond as soon as possible.
            </p>

          </div>

        </div>

      </div>
     <Container>
      <div className='py-12 md:py-16 lg:py-20'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-5 gap-8 lg:gap-16'>
            <div className='lg:col-span-2 space-y-6'>
              <div>
                <h2 className='text-2xl md:text-3xl font-bold text-accent mb-2'>Get in Touch</h2>
                <div className='w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6'></div>
                <p className='text-neutral leading-relaxed'>
                  Ready to transform your space? Reach out to us and let's create something beautiful together.
                </p>
              </div>
              <div className='space-y-4'>
                <div className='bg-base-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow'>
                  <div className='flex items-center gap-4'>
                    <div className='bg-gradient-to-br from-primary to-secondary p-3 rounded-lg'>
                      <FaPhoneAlt className='text-white text-lg'/>

                    </div>
                    <div>
                         <h4 className='font-semibold text-accent text-sm mb-1'>Phone</h4>
                  <p className='text-neutral text-sm'>+880 1234 876520</p>
                  <p className='text-neutral text-sm'>+880 1234 876566</p>
                    </div>

                  </div>

               

                </div>
                <div className='bg-base-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow'>
                  <div className='flex items-center gap-4'>
                    <div className='bg-gradient-to-br from-primary to-secondary p-3 rounded-lg'>
                      <FaEnvelope className='text-white text-lg'/>

                    </div>
                    <div>
                         <h4 className='font-semibold text-accent text-sm mb-1'>Email</h4>
                  <p className='text-neutral text-sm'>info@laxiusdecor.com</p>
                  <p className='text-neutral text-sm'>support@laxiusdecor.com</p>
                    </div>

                  </div>

               

                </div>
                <div className='bg-base-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow'>
                  <div className='flex items-center gap-4'>
                    <div className='bg-gradient-to-br from-primary to-secondary p-3 rounded-lg'>
                      <FaMapMarkedAlt className='text-white text-lg'/>

                    </div>
                    <div>
                         <h4 className='font-semibold text-accent text-sm mb-1'>Location</h4>
                  <p className='text-neutral text-sm'>2000, Mirpur</p>
                  <p className='text-neutral text-sm'>Dhaka, Bangladesh</p>
                    </div>

                  </div>

               

                </div>
                <div className='bg-base-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow'>
                  <div className='flex items-center gap-4'>
                    <div className='bg-gradient-to-br from-primary to-secondary p-3 rounded-lg'>
                      <FaClock className='text-white text-lg'/>

                    </div>
                    <div>
                         <h4 className='font-semibold text-accent text-sm mb-1'>Working Hours</h4>
                  <p className='text-neutral text-sm'>Mon - Fri: 09:00 AM - 08:00 PM</p>
                  <p className='text-neutral text-sm'>Sat - Sun: 10:00 AM - 06:00 PM</p>
                    </div>

                  </div>

               

                </div>




              </div>
              <div className='bg-gradient-to-r from-primary to-secondary rounded-lg p-5 shadow-md'>
                <h4 className='font-bold text-white mb-3'>Connect With Us</h4>
                <div className='flex gap-3'>
                  <button className='bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all transform hover:scale-110'>
                  <FaFacebookF className='text-white text-lg'/>

                  </button>
                  <button className='bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all transform hover:scale-110'>
                  <FaInstagram className='text-white text-lg'/>

                  </button>
                  <button className='bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all transform hover:scale-110'>
                  <FaLinkedinIn className='text-white text-lg'/>

                  </button>

                </div>

              </div>

            </div>

            <div className='lg:col-span-3'>
              <div className='grid md:grid-cols-2 gap-5'>
                <div>
                  <label className='block text-sm font-medium text-neutral mb-2'>
                    Your Name
                  </label>
                  <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='John Deo' className='w-full px-4 py-2.5 bg-base-100 border border-base-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-accent placeholder:text-neutral/50' />
                </div>

                <div>
                  <label className='block text-sm font-medium text-neutral mb-2'>
                    Email Address
                  </label>
                  <input type="text" name='email' value={formData.email} onChange={handleChange} placeholder='john@example.com'
                  className='w-full px-4 py-2.5 bg-base-100 border border-base-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-accent placeholder:text-neutral/50'
                  />
                </div>


              </div>

              <div>
                <label className='block text-sm font-medium text-neutral mb-2'>
                  Your Message 
                </label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="6" placeholder='Tell us about yor project and requirements...'
                className='w-full px-4 py-2.5 bg-base-100 border border-base-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-accent placeholder:text-neutral/50'
                ></textarea>
              </div>

              <button onClick={handleSubmit}
              className='w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2'
              >
                <span>Send Message</span>
                <FaPaperPlane className='text-sm'/>

              </button>
              
            <div className='mt-6 pt-6 border-t border-base-300'>
              <div className='flex items-center gap-3 text-sm'>
                <div className='w-2 h-2 bg-success rounded-full animate-pulse'></div>
                <p className='text-neutral'>
                  We typically respond within <span className='font-semibold text-accent'>24 hours</span>
                </p>

              </div>

            </div>
            <div className='grid md:grid-cols-3 gap-4 mt-6'>
            <div className='bg-base-100 rounded-lg p-4 shadow-md text-center'>
              <div className='text-2xl font-bold text-primary mb-1'>24/7</div>
              <p className='text-xs text-neutral'>Support Available</p>

            </div>
           <div className='bg-base-100 rounded-lg p-4 shadow-md text-center'>
              <div className='text-2xl font-bold text-primary mb-1'>500+</div>
              <p className='text-xs text-neutral'>Projects Completed</p>

            </div>
           <div className='bg-base-100 rounded-lg p-4 shadow-md text-center'>
              <div className='text-2xl font-bold text-primary mb-1'>98%</div>
              <p className='text-xs text-neutral'>Client Satisfaction</p>

            </div>

          </div>

            </div>




          </div>

          

        </div>

      </div>

     </Container>

      
    </div>
  );
};

export default Contact;