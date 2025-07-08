import React, { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import lockImg from '../assets/reset.png'


export default function Resetpasswordrec() {
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
            const res=await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-reset-tokenrec/${token}`,{
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
        const res=await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-passwordrec`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
              credentials: 'include',
              body: JSON.stringify({userId,token,password})
        })
        if(res.ok){
            navigate('/recruiter-login')
            seterror(false)
        }
        
    }
    catch (err) {
        setMessage(err.message||'Could not reset password');
        seterror(true)
      }
  }


    // {valid ? (
    //     <form onSubmit={handleReset}>
    //       <h2>Reset Password</h2>
    //       <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
    //       <button type="submit">Reset Password</button>
    //     </form>
    //   ) : (
    //     <p>{message}</p>
    //   )}
     
  const styles = {
      container: {
        display: 'flex',
        minHeight: '100vh',
        width:'100vw',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor:'#fff'
      },
      left: {
        flex: 1,
        // backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:'20px'
      },
      right: {
        flex: 0.8,
        padding: '80px 60px',
        display: 'flex',
        flexDirection: 'column',
        marginTop:'-20px',
        justifyContent: 'center',
      },
      title: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '10px',
        fontFamily:'DM sans'
      },
      description: {
        color: '#888',
        marginBottom: '20px',
        fontFamily:'DM sans'
      },
      inputGroup: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        height:'50px',
        padding: '0 0px 0 12px',
        width:'450px',
        borderRadius: '6px',
        backgroundColor: '#fff',
      },
      icon: {
        marginRight: '10px',
        fontSize: '25px',
      },
      input: {
        // height:'2px',
        flex: 1,
        border: 'none',
        outline: 'none',
        fontSize: '13px',
      },
      errorMsg: {
        color: 'red',
        fontSize: '14px',
        margin: '10px 0',
      },
      successMsg: {
        color: 'green',
        fontSize: '14px',
        margin: '10px 0',
      },
      button: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '12px',
        fontSize: '16px',
        width:'450px',
        border: 'none',
        borderRadius: '6px',
        fontFamily:'DM sans',
        cursor: 'pointer',
        marginTop: '10px',
        outline:'none'
      },
      backLink: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#333',
        cursor: 'pointer',
        
      },
      image: {
        width: '100%',
        height: '550px',
      },
    };
  
    return (
      <div style={styles.container}>
        <div style={styles.left}>
          <img src={lockImg} alt="lock visual" style={styles.image} />
        </div>
        <div style={styles.right}>
          <h2 style={styles.title}>Reset Password</h2>
        {valid? (
          <>
          <p style={styles.description}>
          Enter your new Password
        </p>
        <form onSubmit={handleReset}>
          <div style={styles.inputGroup}>
            <span style={styles.icon}>📧</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {message && (
            <p style={error ? styles.errorMsg : styles.successMsg}>{message}</p>
          )}
          <button type="submit" style={styles.button}>Reset password</button>
        </form>
        </>
        ): (<p style={styles.errorMsg}>{message}</p>)}
          
        </div>
      </div>
    );
  }