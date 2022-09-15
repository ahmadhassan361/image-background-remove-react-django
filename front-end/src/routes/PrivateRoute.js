import { Navigate } from 'react-router-dom';
import React from 'react';


export const PrivateRoute = ({ children ,login}) => {
    
    if (!login) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" replace={true} />
    }
    return children;
}