
import React from "react";
import styles from "./User.module.css";
import Link from "next/link";
import { useAppState } from "../../context/AppStateContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <div className={styles.container}>
      <nav className={`${styles.nav} flex  justify-around items-center`}>
        <h1 className="text-4xl font-bold  text-center text-white cursor-pointer">
          Job Board
        </h1>

        <Link href="/admin">
          <p className="text-white">
          admin
          </p>
         
        </Link>
      
      </nav>
     <div className={styles.content}>{children}</div>
    </div>
  );
};

export default UserLayout;
