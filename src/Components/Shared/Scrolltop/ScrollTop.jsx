import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollTop = () => {
    const [show, setShow] = useState(false);
    useEffect(()=>{
        const handleScroll = ()=>{
            setShow(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return ()=> window.removeEventListener('scroll', handleScroll);

    },[]);
    const scrollToTop = ()=> {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <button
        onClick={scrollToTop}
        className={`fixed bottom-3 right-4 z-50 bg-gradient-to-r from-primary to-secondary text-white text-xl p-4 md:p-3 rounded-full  shadow-lg transition-all duration-300  hover:scale-110
            ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}
            `}
        >
            <FaArrowUp/>
            
        </button>
    );
};

export default ScrollTop;