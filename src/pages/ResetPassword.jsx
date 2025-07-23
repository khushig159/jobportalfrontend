import React, { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import lockImg from '../assets/reset.png'
import styles from '../module/reset.module.css'


export default function ResetPassword() {
  const {token} = useParams();
    const [error,seterror]=useState(false)
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const verify=async()=>{
        try{
            const res=await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-reset-token/${token}`,{
                credentials:'include'
            })
            if(res.status===400){
                setMessage('Invalid or expired token')
                seterror(true)
            }
            const data=await res.json()
            setUserId(data.userId);
            setValid(true);
            seterror(false)
        }
        catch (err) {
            setMessage(err.message);
            seterror(true)
          }
    }
    verify()
  },[token])

  const handleReset=async(e)=>{
    e.preventDefault();
    try{
        const res=await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify({userId,token,password})
        })
        if(res.ok){
            navigate('/user-login')
        }
        
    }
    catch (err) {
        setMessage(err.message||'Could not reset password');
      }
  }

   
     return (
       <div className={styles.container}>
         <div className={styles.left}>
           <img src={lockImg} alt="lock visual" className={styles.image} />
         </div>
         <div className={styles.right}>
           <h2 className={styles.title}>Reset Password</h2>
         {valid? (
           <>
           <p className={styles.description}>
           Enter your new Password
         </p>
         <form onSubmit={handleReset}>
           <div className={styles.inputGroup}>
             <span className={styles.icon}>📧</span>
             <input
               type="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
               className={styles.input}
             />
           </div>
           {message && (
             <p className={error ? styles.errorMsg : styles.successMsg}>{message}</p>
           )}
           <button type="submit" style={{border:'none',outline:'none'}} className={styles.button}>Reset password</button>
         </form>
         </>
         ): (<p className={styles.errorMsg}>{message}</p>)}
           
         </div>
       </div>
     );
   }