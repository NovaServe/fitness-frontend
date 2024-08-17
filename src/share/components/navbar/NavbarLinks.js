import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

function NavbarLinks ({ role, outputType, autoCloseFunction }) {
  return (<>
    {role === 'ROLE_SUPERADMIN' && outputType === 'visible' && (<>
      <Link className={styles['navbar_menu-item']} to={'/admin/profiles/add'}>Add Admin</Link>
    </>)}

    {role === 'ROLE_SUPERADMIN' && outputType === 'all' && (<>
      <Link className={styles['navbar_menu-item']} to={'/admin/profiles/add'}>Add Admin</Link>
    </>)}

    {role === 'ROLE_ADMIN' && outputType === 'visible' && (<>
      <Link className={styles['navbar_menu-item']} to={'/admin/trainings'}>Training</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/profiles'}>Profiles</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/analytics'}>Analytics</Link>
    </>)}

    {role === 'ROLE_ADMIN' && outputType === 'more' && (<>
      <Link className={styles['navbar_menu-item']} to={'/admin/payments'}>Payments</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/notifications'}>Notifications</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/chats'}>Chats</Link>
    </>)}

    {role === 'ROLE_ADMIN' && outputType === 'all' && (<>
      <Link className={styles['navbar_menu-item']} to={'/admin/trainings'} onClick={autoCloseFunction}>Training</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/profiles'} onClick={autoCloseFunction}>Profiles</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/analytics'} onClick={autoCloseFunction}>Analytics</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/payments'} onClick={autoCloseFunction}>Payments</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/notifications'} onClick={autoCloseFunction}>Notifications</Link>
      <Link className={styles['navbar_menu-item']} to={'/admin/chats'} onClick={autoCloseFunction}>Chats</Link>
    </>)}
  </>
  );
}

export default NavbarLinks;
