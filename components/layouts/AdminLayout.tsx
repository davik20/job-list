// components/AdminLayout.tsx
import React from "react";
import styles from "./Admin.module.css";
import Link from "next/link";
import { useAppState } from "../../context/AppStateContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { admin, setAdmin } = useAppState();
  const router = useRouter();

  console.log(admin);
  useEffect(() => {
    if (!admin) {
      router.push("/admin/auth");
    }
  }, []);

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
            }} href="/admin/auth">
              <a className="text-xl">Log out</a>
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default AdminLayout;
