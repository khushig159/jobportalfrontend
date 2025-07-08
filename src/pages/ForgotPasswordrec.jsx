import React, { useState } from 'react'
import lockImg from '../assets/forgot.png'
import { Link } from 'react-router-dom';
import styles from '../module/forgot.module.css'

export default function ForgotPasswordrec() {
    const [email,setEmail]=useState('');
    const[message,setMesage]=useState('')
    const[error,seterror]=useState(false)


    const handleSubmit=async (e) =>{
        e.preventDefault();
        try{
            const res=await fetch(`${import.meta.env.VITE_API_URL}/auth/request-reset-passwordrec`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: 'include',
                  body: JSON.stringify({email})
            })
            if(!res.ok){
                const data = await res.json();
                throw new Error(data.message || 'Failed to send reset link');
              }
              setMesage('Check your email for a password reset link.');
              seterror(false)
        }
        catch (err) {
            setMesage(err.message || 'Something went wrong.');
            seterror(true)
          }
    }
 
    return (
      <div className={styles.container}>
        <div sclassNametyle={styles.left}>
          <img src={lockImg} alt="lock visual" className={styles.image} />
        </div>
        <div className={styles.right}>
          <h2 className={styles.title}>Forgot Password</h2>
          <p className={styles.description}>
            Enter your email and we'll send you a link to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <span className={styles.icon}>📧</span>
              <input
                type="email"
                placeholder="uixlibraries@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>
            {message && (
              <p className={error ? styles.errorMsg : styles.successMsg}>{message}</p>
            )}
            <button type="submit" className={styles.button}>Submit</button>
          </form>
         <Link to='/recruiter-login'><p className={styles.backLink}>← Back to Login</p></Link> 
        </div>
      </div>
    );
  }