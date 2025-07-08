import React, { useEffect, useState } from 'react'
import logo from '../assets/verify.jpg'
import styles from '../module/verify.module.css'
import { useSearchParams,useNavigate } from 'react-router-dom'

export default function EmailVerification() {
    const [message,setmessage]=useState('')
    const [error,seterror]=useState('')
    const [valid,setvalid]=useState(false)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const verify=async()=>{
            const token = searchParams.get('token');
            if (!token) {
                seterror('Invalid or missing token');
                return;
            }
            try{
            const res= await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-email?token=${token}`,{
                credentials:'include'
            })
            const data=await res.json()
            if(res.status===400){
                setmessage(data.message)
                setvalid(true)
            }
            if(res.status===200){
                setmessage(data.message)
                setvalid(true)
            }
        }
        catch(err){
            seterror(err.message)
            setvalid(false)
        }
    }
        verify()
    },[searchParams])
   return (
          <div className={styles.container}>
              {valid ? (
                  <>
                      <h2 className={styles.message}>{message}</h2>
                      <p className={styles.subtext}>Thank you for signing up at Workora, Login to continue your journey</p>
                  </>
              ) : (
                  <h2 className={styles.message}>{error}</h2>
              )}
              <img className={styles.image} src={logo} alt="Verification" />
              {valid && (
                <button style={{border:'none',outline:'none'}}
                className={styles.button}
                      onClick={() => navigate('/user-login')}
                  >
                      Login
                  </button>
              )}
          </div>
      )
  }
  