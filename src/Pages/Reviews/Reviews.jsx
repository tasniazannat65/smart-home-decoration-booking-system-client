import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaQuoteLeft, FaStar } from 'react-icons/fa';
import Heading from '../../Components/Shared/Heading/Heading';

const Reviews = () => {
  const {serviceId} = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e)=> {
    e.preventDefault();
    if(!rating || !message) {
      toast.error('Rating and message required');
      return;
    }
    try {
      setLoading(true);
      await axiosSecure.post('/reviews', {
        serviceId,
        rating,
        message
      });
      toast.success('Review submitted successfully');
      navigate('/dashboard/my-booking')
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Review failed');
      
    }finally {
      setLoading(false);
    }
  }

  const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  return (
    <div className='min-h-screen bg-base-200 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <div className='bg-gradient-to-r from-primary to-secondary rounded-xl p-6 md:p-8 shadow-lg mb-6 text-center'>
          <div className='flex justify-center mb-4'>
            <div className='bg-white/20 backdrop-blur-sm p-4 rounded-full'>
            <FaQuoteLeft className='text-white text-3xl'/>

            </div>

          </div>
          <h1 className='text-2xl md:text-3xl font-bold text-white mb-2'>
            Share Your Experience
          </h1>
          <p className='text-white/90 text-sm md:text-base'>Your feedback helps us improve and serves other customers</p>

        </div>
        <div className='bg-base-100 rounded-xl shadow-lg overflow-hidden  border-b-2 border-base-300'>
          <div className='bg-base-200 px-6 md:px-8 py-4 border-b-2 border-base-300'>
          <Heading title="Leave a Review" center/>


          </div>
          <div className='p-6 md:p-8'>
          <div className='space-y-8'>
            <div>
              <label className='block text-center text-sm font-semibold text-neutral mb-4'>
                How would you rate your experience?
              </label>
              <div className='flex justify-center gap-3 mb-4'>
                {[...Array(5)].map((_, i)=> {
                  const value = i + 1;
                  return (
                    <button
                    type='button'
                    key={value}
                    className='transition-all duration-200 transform hover:scale-125 focus:outline-none'
                    onMouseEnter={()=> setHover(value)}
                    onMouseLeave={()=> setHover(null)}
                    onClick={()=> setRating(value)}

                    >
                      <FaStar size={36} className={`transition-all duration-200 ${
                        value <= (hover || rating)
                        ? 'text-warning drop-shadow-lg'
                        : 'text-base-300'
                      }`}/>

                    </button>
                  )
                })}

              </div>

              {
                (rating > 0 || hover> 0) && (
                  <div className='text-center'>
                    <div className='inline-block bg-warning/10 px-4 py-2 rounded-full border border-warning/30'>
                    <span className='text-warning font-bold text-sm'>
                      {ratingLabels[(hover || rating) - 1]}
                    </span>

                    </div>

                  </div>
                )
              }
            </div>
            <div className='h-px bg-gradient-to-r from-transparent via-base-300 to-transparent'>

            </div>

            <div>
              <label className='block text-sm font-semibold text-neutral mb-3'>
                Tell us about your experience
              </label>
              <textarea className='w-full px-4 py-3 bg-base-200 border-2 border-base-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all resize-none text-accent placeholder:text-neutral/50'
              placeholder='Share what you loved about our service, what could be improved, or any other feedback...'
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
              rows="6"
              ></textarea>
              <div className='flex justify-between items-center mt-2'>
                <span className='text-xs text-neutral'>
                  Minimum 10 characters
                </span>
                <span className='text-xs text-neutral'>
                  {message.length} characters
                </span>

              </div>
            </div>
            <div className='bg-success/10 border border-success/30 rounded-lg p-4 flex items-start gap-3'>
            <FaCheckCircle className='text-success text-xl mt-0.5 shrink-0'/>
            <div>
              <p className='text-sm font-semibold text-accent mb-1'>
                Your review will be public
              </p>
              <p className='text-xs text-neutral'>
                Help other customers make informed decisions by sharing your honest feedback
              </p>
            </div>

            </div>
            <button
            type='button'
            disabled={loading}
            onClick={handleSubmit}
            className='w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'

            >
              {
                loading ? (
                  <span className='flex items-center justify-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Review'
                )
              }

            </button>



          </div>

        </div>

        </div>
        

      </div>

      <div className='mt-6 text-center'>
        <p>
          Thank you for taking the time to share your feedback!🎉
        </p>

      </div>
      
    </div>
  );
};

export default Reviews;