import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = ({ isLoggedIn, userData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {isLoggedIn && (<div>
                <div className={styles['navbar']}>
                    <div className={styles['navbar_logo']}>
                        <div><span style={{ fontWeight: 'bold' }}>FITNESS</span><span style={{ fontStyle: 'italic' }}>Club</span></div>
                    </div>
                    <div className={styles['navbar_middle-menu']}>
                        <Link className={styles['navbar_menu-item']} to={'/'}>Link</Link>
                        <Link className={styles['navbar_menu-item']} to={'/'}>Link</Link>
                    </div>
                    <div className={styles['navbar_right-menu']}>
                        {userData && userData.body ? <div>Hello, {userData.body.fullName}!</div> : <div>No user data</div>}
                        <Link className={styles['navbar_menu-item']} to={'/logout'}>Logout</Link>
                    </div>

                    <div className={styles["navbar--toggle"]} onClick={toggleMenu}>
                        <div className={styles["navbar_bar"]}></div>
                        <div className={styles["navbar_bar"]}></div>
                        <div className={styles["navbar_bar"]}></div>
                    </div>
                </div>

                <div className={`${isOpen ? styles['navbar--hidden-open'] : styles['navbar--hidden']}`}>
                    <div className={styles['navbar_middle-menu--hidden']}>
                        <Link className={styles['navbar_menu-item']} to={'/'}>Link</Link>
                        <Link className={styles['navbar_menu-item']} to={'/'}>Link</Link>
                        <Link className={styles['navbar_menu-item']} to={'/'}>Link</Link>
                    </div>
                    <div className={styles['navbar_right-menu--hidden']}>
                        {userData && userData.body ?
                            <div className={styles['navbar_menu-item']}>
                                Hello, {userData.body.fullName}!</div> :
                            <div>No user data</div>}
                        <Link className={styles['navbar_menu-item']} to={'/logout'}>Logout</Link>
                    </div>
                </div>
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