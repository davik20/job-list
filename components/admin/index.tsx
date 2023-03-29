import React from 'react';
import Link from 'next/link';
import styles from './Admin.module.css';

const Admin: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/admin/create-tags" legacyBehavior>
              <a className="text-xl">Create Tags</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/edit-jobs" legacyBehavior>
              <a className="text-xl">Edit Jobs</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Admin;
