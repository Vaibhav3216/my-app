"use client";
import { useRouter } from "next/navigation";
import styles from "./header.module.css"; // Import CSS file
import { useState } from "react";



    export default function Header(){
    const router = useRouter();
    const [home,cghome] = useState(true);
    const [load,onloads] = useState(false);

    return(
    <header className={styles.header}>
      {/* Left Side - Logo */}
      <h1 className={styles.logo}>MyAlgoTrade</h1>

      {/* Center - Navigation Links */}
      <nav className={styles.nav}>
        <button onClick={() => {
            router.push("/")
            
            } } className={styles.navItem}>Home</button>

        <button onClick={()=>{router.push('/about')
            
        }} className={styles.navItem}>About Us</button>

        <button onClick={() => {router.push("/contact")
            
        }} className={styles.navItem}>Contact</button>
      </nav>

      {/* Right Side - Login Button */}
      <div>
      <button onClick={() => router.push("/login")} className={styles.loginBtn}>Login</button>
      <button onClick={() => router.push("/signup")} className={styles.loginBtn}>SIGN UP</button>
      </div>
    </header>
  );
}

    