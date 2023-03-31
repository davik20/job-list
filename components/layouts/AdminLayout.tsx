// components/AdminLayout.tsx
import React from 'react';
import styles from './Admin.module.css'
import Link from 'next/link';
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminHeader: React.FC = () => (
  <header>
    {/* Add your admin header content here */}
    <h1>Admin Header</h1>
  </header>
);

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
    <div className={styles.container}>

      <nav className={`${styles.nav} flex  justify-around items-center`}>
      <h1 className="text-4xl font-bold  text-center text-white cursor-pointer">Admin Dashboard</h1>
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
        </ul>
      </nav>
      <div className={styles.content}>
      {children}
      </div>
     
  </div>
);

export default AdminLayout;
