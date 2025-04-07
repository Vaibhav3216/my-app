"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './login.module.css'

export default function Login() {
  const [userId, setUserId] = useState("");
  const [mpin, setMpin] = useState("");
  const [totp, setTotp] = useState("");
  const router = useRouter();

  let data={
    userId,
    mpin,
    totp
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch('/Backend/api/login',{
      method: "POST",
      body: JSON.stringify(data)
    }
)

    let result = await response.json()
    if (result.success){
      alert("Login Successful")
      router.push('/dashboard')
    }
    else{
      alert("Login Fail")
    }
    // console.log("Logging in with:", { userId, mpin, totp });

    // // Dummy authentication logic (Replace with actual API call)
    // if (userId && mpin && totp) {
    //   alert("Login Successful!");
    //   router.push("/"); // Redirect to Home
    // } else {
    //   alert("Please enter all fields!");
    // }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
  <label>User ID:</label>
  <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />

  <label>MPIN:</label>
  <input type="password" value={mpin} onChange={(e) => setMpin(e.target.value)} required />

  <label>TOTP:</label>
  <input type="text" value={totp} onChange={(e) => setTotp(e.target.value)} required />

  {/* Button inside the form class */}
  <button type="submit">Login</button>

  
    
</form>
  <button className={styles.but} onClick={()=>{router.push('/')}}>BACK</button>

    </div>
  );
}
