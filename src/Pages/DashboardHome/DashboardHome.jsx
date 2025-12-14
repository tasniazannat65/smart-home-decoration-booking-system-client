import React from 'react';
import useRole from '../../Hooks/useRole';
import Loading from '../../Components/Shared/Loading/Loading';
import AdminDashboard from './AdminDashboard';
import DecoratorDashboard from './DecoratorDashboard';
import UserDashboard from './UserDashboard';

const DashboardHome = () => {
    const {role, roleLoading} = useRole();
    if(roleLoading){
        return <Loading/>
    }
    if(role === 'admin'){
        return <AdminDashboard/>
    }
    else if(role === 'decorator'){
        return <DecoratorDashboard/>
    }
    else {
        return <UserDashboard/>
    }
    
};

export default DashboardHome;