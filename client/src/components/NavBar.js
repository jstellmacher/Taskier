import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiInfo, FiHome, FiCalendar, FiSmile } from 'react-icons/fi';
import { GiExitDoor } from 'react-icons/gi';

const containerStyles = 'flex items-center justify-between p-4 bg-white';
const itemStyles = 'flex items-center';
const logoStyles = 'h-8 w-8 mr-2 hover:animate-pulse';
const textStyles = 'font-bold';
const logoutStyles = 'hover:animate-pulse';

function NavBar({ loggedIn }) {
  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        const response = await fetch('/logout', {
          method: 'POST',
          credentials: 'include', // Include credentials (e.g., cookies) in the request
        });

        if (response.ok) {
          window.confirm('Logged out successfully');
          window.location.href = '/login'; // Redirect to the login page
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <nav>
      <ul className={containerStyles}>
        <li className={itemStyles}>
          <NavLink exact to="/" activeClassName="text-blue-500">
            <FiHome className={logoStyles} />
          </NavLink>
          <span className={textStyles}>Home</span>
        </li>
        <li className={itemStyles}>
          <NavLink to="/calendar" activeClassName="text-blue-500">
            <FiCalendar className={logoStyles} />
          </NavLink>
          <NavLink to="/account" activeClassName="text-blue-500">
            <FiInfo className={logoStyles} />
          </NavLink>
          <NavLink to="/about" activeClassName="text-blue-500">
            <FiSmile className={logoStyles} />
          </NavLink>
          {loggedIn && (
            <div className={logoutStyles} onClick={handleLogout}>
              <GiExitDoor className={logoStyles} />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
