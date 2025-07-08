// pages/AccessDenied.js
import React from 'react';
import styles from '../module/access.module.css'
import { Link } from 'react-router-dom';
import access from '../assets/404page.png'
import Cookies from 'js-cookie';

const AccessDenied = () => {
    console.log(Cookies.get('refreshToken'))
  return (
    <>
    <div className={styles.container}>
        <img src={access} alt="" />
        <h2 style={{color:'rgb(20, 20, 88)', fontFamily:'Work sans', fontSize:'50px'}}>We are Sorry...</h2>
        <p>The page you're trying to access has restricted access</p>
        <p>Please <Link to='/user-login'>Login</Link> or <Link to='user-signup'>SignUp</Link> to continue</p>
    </div>
    </>
  )
};

export default AccessDenied;
