import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import Cookies from 'js-cookie';

export default function RedirectHandler() {
    const useRefreshtoken=Cookies.get('userrefreshToken');
    const recruiterrefreshtoken=Cookies.get('refreshToken');

    if(useRefreshtoken){
        return <Navigate to='/main' replace/>;
    }
    else if(recruiterrefreshtoken){
        return <Navigate to='/main-recruiter' replace/>;
    }
    else {
        return <Navigate to="/start" replace />;
      }
}
