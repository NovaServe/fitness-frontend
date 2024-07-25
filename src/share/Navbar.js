import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavbarLinks from './NavbarLinks.js';
import styles from './Navbar.module.scss';

function Navbar({ isLoggedIn, userData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const autoCloseMainMenu = () => {
    setIsOpen(false);
  };

  const toggleDropdownMenu = () => {
    setIsOpenDropdownMenu(!isOpenDropdownMenu);
  };

  const toggleUserMenu = () => {
    setIsOpenUserMenu(!isOpenUserMenu);
  };

  return (
    <>
      {isLoggedIn && (<div>
        <div className={styles['navbar']}>
          {/* logo */}
          <div className={styles['navbar_logo']}>
            <div>
              <span style={{ fontWeight: 'bold' }}>FITNESS</span>
              <span style={{ fontStyle: 'italic' }}>Club</span>
            </div>
          </div>

          {/* on large screens */}
          {/* main menu */}
          <>
            <div className={styles['navbar_menu']}>
              <NavbarLinks role={userData.body.role} outputType='visible' />
            </div>
            {/* dropdown menu, hidden when 'More' unpressed */}
            <div className={styles['navbar_menu_dropdown']}
              onClick={toggleDropdownMenu}>More &#x25BE;
              <div
                className={`${isOpenDropdownMenu ? styles['navbar_menu_dropdown-items--hidden-open']
                  : styles['navbar_menu_dropdown-items--hidden']}`} >
                <NavbarLinks role={userData.body.role} outputType='more' />
              </div>
            </div>
          </>

          {/* right menu */}
          <div
            className={`${styles['navbar_right-menu_dropdown']} ${styles['navbar_right-menu_dropdown--large-screen']}`}
            onClick={toggleUserMenu}>
            {userData && userData.body ? <div>{userData.body.fullName} &#x25BE;</div> : <div>User profile &#x25BE;</div>}
            <div
              className={`${isOpenUserMenu ? styles['navbar_right-menu_dropdown-items--hidden-open']
                : styles['navbar_right-menu_dropdown-items--hidden']}`} >
              <Link className={styles['navbar_menu-item']} to={'/'}>Settings</Link>
              <Link className={styles['navbar_menu-item']} to={'/logout'}>Logout</Link>
            </div>
          </div>
          {/* end of large screens */}

          {/* toggle button */}
          <div className={styles['navbar_toggle']} onClick={toggleMenu}>
            <div className={styles['navbar_toggle-bar']}></div>
            <div className={styles['navbar_toggle-bar']}></div>
            <div className={styles['navbar_toggle-bar']}></div>
          </div>
        </div>

        {/* on small screens */}
        <div className={`${isOpen ? styles['navbar--hidden-open'] : styles['navbar--hidden']}`}>
          <NavbarLinks role={userData.body.role} outputType='all' autoCloseFunction={autoCloseMainMenu} />

          {/* right menu */}
          <div
            className={`${styles['navbar_right-menu_dropdown']} ${styles['navbar_right-menu_dropdown-title--small-screens']}`}
            onClick={toggleUserMenu}>
            {userData && userData.body ? <div>{userData.body.fullName} &#x25BE;</div> : <div>User profile &#x25BE;</div>}
            <div
              className={`${isOpenUserMenu ? styles['navbar_right-menu_dropdown-items--hidden-open']
                : styles['navbar_right-menu_dropdown-items--hidden']}`} >
              <Link className={styles['navbar_menu-item']} to={'/'} onClick={autoCloseMainMenu}>Settings</Link>
              <Link className={styles['navbar_menu-item']} to={'/logout'}>Logout</Link>
            </div>
          </div>
        </div>
        {/* end of small screens */}
      </div>)
      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    userData: state.userData,
  };
};

export default connect(mapStateToProps)(Navbar);