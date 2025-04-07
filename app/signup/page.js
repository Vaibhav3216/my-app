"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './signup.module.css'

export default function Login() {
  const [userId, setUserId] = useState("");
  const [mpin, setMpin] = useState("");
  const [totp, setTotp] = useState("");
  const [api_key, setAPI] = useState("");
  const router = useRouter();

  let data = {
    userId,
    mpin,
    totp,
    api_key,
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('http://192.168.29.215:3000/Backend/api/signup',{
      method: "POST",
      body: JSON.stringify(data)
    }
)

    let result = await response.json()
    if (result.success){
      alert("Done")
      router.push('/login')
    }

    // console.log(response.success)

    // console.log("Logging in with:", { userId, mpin, totp });

    // Dummy authentication logic (Replace with actual API call)
    // if (userId && mpin && totp) {
    //   alert("Login Successful!");
    //   router.push("/"); // Redirect to Home
    // } else {
    //   alert("Please enter all fields!");
    // }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
  <label>User ID:</label>
  <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />

  <label>MPIN:</label>
  <input type="password" value={mpin} onChange={(e) => setMpin(e.target.value)} required />

  <label>TOTP:</label>
  <input type="text" value={totp} onChange={(e) => setTotp(e.target.value)} required />

  <label>API Key:</label>
  <input type="text" value={api_key} onChange={(e) => setAPI(e.target.value)} required />

  {/* Button inside the form class */}
</form>
  <div className={styles.but}>
    <button onClick={()=>{router.push('/')}}>BACK</button>
  <button type="submit" onClick={handleSubmit}>Sign Up</button>

  </div>

  

    </div>
  );
}
