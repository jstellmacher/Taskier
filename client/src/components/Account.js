import React, { useEffect, useState } from 'react';

const containerStyles =
  "bg-gradient-to-r from-green-900 to-teal-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8";
const cardStyles = "max-w-md w-full p-6 bg-white rounded-lg shadow-2xl";
const titleStyles = "text-2xl font-bold text-center mb-6";
const loadingStyles = "text-center";
const usernameBoxStyles = "bg-green-800 text-white py-1 px-2 rounded-md";
const inputStyles = "border-gray-300 focus:ring-green-500 focus:border-green-500 block w-full p-2 rounded-md";
const buttonStyles = "bg-green-600 text-white py-2 px-4 mt-4 rounded-md m-5";

function Account() {
  const [user, setUser] = useState(null);
  const [showNewUsernameInput, setShowNewUsernameInput] = useState(false);
  const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/account');
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log('Error fetching user:', response.status);
      }
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  

  const updateUsername = async () => {
    try {
      const response = await fetch(`/account`, {  // Update the endpoint to '/users'
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
        }),
      });
      if (response.ok) {
        // Update user information
        fetchUser();
        setNewUsername('');
        setShowNewUsernameInput(false);
      } else {
        console.log('Error updating username:', response.status);
      }
    } catch (error) {
      console.log('Error updating username:', error);
    }
  };

  const updatePassword = async () => {
    try {
      const response = await fetch(`/account`, {  // Update the endpoint to '/users'
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });
      if (response.ok) {
        // Update user information
        fetchUser();
        setNewPassword('');
        setShowNewPasswordInput(false);
      } else {
        console.log('Error updating password:', response.status);
      }
    } catch (error) {
      console.log('Error updating password:', error);
    }
  };

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        {user ? (
          <div>
            <h1 className={titleStyles}>
              <div className={usernameBoxStyles}>{user.username}</div>User Information
            </h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <div className="text-center">
              {showNewUsernameInput ? (
                <div>
                  <label htmlFor="newUsername" className="font-medium">New Username:</label>
                  <input
                    type="text"
                    id="newUsername"
                    value={newUsername}
                    onChange={handleUsernameChange}
                    className={`${inputStyles} ${showNewUsernameInput ? 'ring-green-500 ring-2' : ''}`}
                  />
                  <button className={buttonStyles} onClick={updateUsername}>Update Username</button>
                </div>
              ) : (
                <button className={buttonStyles} onClick={() => setShowNewUsernameInput(true)}>Change Username</button>
              )}
              {showNewPasswordInput ? (
                <div>
                  <label htmlFor="newPassword" className="font-medium">New Password:</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    className={`${inputStyles} ${showNewPasswordInput ? 'ring-green-500 ring-2' : ''}`}
                  />
                  <button className={buttonStyles} onClick={updatePassword}>Update Password</button>
                </div>
              ) : (
                <button className={buttonStyles} onClick={() => setShowNewPasswordInput(true)}>Change Password</button>
              )}
            </div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Created At:</strong> {user.created_at}</p>
          </div>
        ) : (
          <p className={loadingStyles}>Loading user information...</p>
        )}
      </div>
    </div>
  );
}

export default Account;
