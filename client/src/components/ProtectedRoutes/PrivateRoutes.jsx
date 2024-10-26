import { getUser } from '@/store/userSlice/userSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    
    const isAuthenticated = useSelector((state)=>state.user.authenticated) ;
    const userInfo = useSelector(getUser);

    
     
    if( !userInfo?.profilesetup)
    {
        
        return <Navigate to={"/profile"}></Navigate>
        
    }
   if( isAuthenticated && location.pathname.includes("/auth"))
    {
        return <Navigate to={"/chat"}></Navigate>
    }
    
     
        return children ;

    
   
}

export default PrivateRoutes ;
