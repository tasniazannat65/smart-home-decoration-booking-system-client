import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Components/Shared/Loading/Loading';
import Forbidden from '../Components/Shared/Forbidden/Forbidden';

const AdminRoute = ({children}) => {

   const { loading} = useAuth();
    const {role, roleLoading} = useRole();
    if(loading || roleLoading){
        return <Loading/>
    }
    if(role !== 'admin'){
        return <Forbidden/>
    }
    return children;
};

export default AdminRoute;