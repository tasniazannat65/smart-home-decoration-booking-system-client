import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({children, to}) => {
    return (
          <NavLink to={to} 
        className={({isActive})=> isActive ? 'btn bg-secondary rounded-full text-[14px] text-accent font-medium  ' : 'text-[16px] text-neutral font-medium' }
        >{children}</NavLink>
    );
};

export default MyLink;