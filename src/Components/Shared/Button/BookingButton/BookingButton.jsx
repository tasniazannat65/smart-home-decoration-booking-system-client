import React, { useState } from 'react';
import useAuth from '../../../../Hooks/useAuth';
import Button from '../Button';
import { useNavigate } from 'react-router';
import BookingModal from '../../../Modal/BookingModal';

const BookingButton = ({service}) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] =  useState(false);
    const {user} = useAuth();
   const handleBooking = ()=>{
     if(!user){
        return navigate('/login')
    }
    else{
        setIsOpen(true);
    }
   }
    return (
        <div>
            <Button onClick={handleBooking} label="Book Now"/>
                {
                    isOpen && (<BookingModal service={service} user={user} close={()=> setIsOpen(false)}/>
                )}
            
        </div>
    );
};

export default BookingButton;