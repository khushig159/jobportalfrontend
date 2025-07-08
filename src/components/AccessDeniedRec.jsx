// pages/AccessDenied.js
import React from 'react';
import styles from '../module/access.module.css'
import { Link } from 'react-router-dom';
import access from '../assets/404page.png'

const AccessDeniedrec = () => {
  return (
    <>
    <div className={styles.container}>
        <img src={access} alt="" />
        <h2 style={{color:'rgb(20, 20, 88)', fontFamily:'Work sans', fontSize:'50px'}}>We are Sorry...</h2>
        <p>The page you're trying to access has restricted access</p>
        <p>Please <Link to='/recruiter-login'>Login</Link> or <Link to='recruiter-signup'>SignUp</Link> to continue</p>
    </div>
    </>
  );
};

export default AccessDeniedrec;
