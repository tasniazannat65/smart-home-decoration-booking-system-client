import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import successPayment from '../../../assets/success.json';
import Confetti from "react-confetti";
import Lottie from 'lottie-react';

const PaymentSuccess = () => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState({});
        const [searchParams] = useSearchParams();
     const sessionId = searchParams.get('session_id');
     const axiosSecure = useAxiosSecure();
      useEffect(()=>{
        if(sessionId){
           axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
           .then(res=>{
            console.log(res.data)
            setPaymentInfo({
                transactionId: res.data.transactionId,
            })
           })
        }

    },[sessionId, axiosSecure])
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShowConfetti(true);
        }, 500);
        const timer2 = setTimeout(()=>{
            setShowConfetti(false);
        }, 4000);
        return ()=> {
            clearTimeout(timer);
            clearTimeout(timer2);
        }
    },[])

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-base-200 rounded-xl shadow-lg'>
            {
                showConfetti && (
                    <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={150}
                    gravity={0.2}
                    friction={0.99}
                    />
                )
            }
            <div className='w-60 h-60'>
                <Lottie animationData={successPayment} loop={false}/>

            </div>
            <h2 className='text-xl font-semibold text-accent'>Your TransactionId: {paymentInfo.transactionId}</h2>
            <h3 className='text-3xl font-bold text-primary mt-4'>Payment Success!</h3>
            <p className='text-neutral mt-2 text-center px-6'>Thank you for your booking. Your payment has been received.</p>
            
        </div>
    );
};

export default PaymentSuccess;