"use client";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      {/* Dashboard Title */}
      <h1 className={styles.logo} onClick={()=>{
        router.push('/dashboard')
      }}>Dashboard</h1>

      {/* Navigation Buttons */}
      <nav className={styles.nav}>
        <button onClick={() => router.push("/dashboard/profile")} className={styles.navButton}>
          My Profile
        </button>
        <button onClick={() => router.push("/dashboard/strategy")} className={styles.navButton}>
          Strategy
        </button>
        <button onClick={() => router.push("/dashboard/live-positions")} className={styles.navButton}>
          Live Position
        </button>
        <button onClick={() => router.push("/dashboard/market")} className={styles.navButton}>
          Market Watch
        </button>
        <button onClick={() => router.push("/dashboard/orders")} className={styles.navButton}>
          Orders
        </button>
      </nav>
    </header>
  );
}
