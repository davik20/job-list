
import React from "react";
import styles from "./Admin.module.css";
import Link from "next/link";
import { useAppState } from "../../context/AppStateContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';


interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayou: React.FC<AdminLayoutProps> = ({ children }) => {
  const { admin, setAdmin } = useAppState();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);


  console.log(admin);
  useEffect(() => {
    if (!admin) {
      router.push("/admin/auth");
    }
  }, []);

    
  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <nav className={`${styles.nav} flex  justify-around items-center`}>
        <h1 className="text-4xl font-bold  text-center text-white cursor-pointer">
          Admin Dashboard
        </h1>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/admin/tags" legacyBehavior>
              <a className="text-xl">Tags</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/jobs" legacyBehavior>
              <a className="text-xl">Jobs</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <a onClick={()=> {
              setAdmin(null);
              router.push('/admin/auth')
              toast.success("Logged out")
            }} >
              <span className="text-xl">Log out</span>
            </a>
          </li>
        </ul>
      </nav>
      {admin ? <div className={styles.content}>{children}</div>: <div> </div>}
    </div>
  );
};

export default AdminLayou;
