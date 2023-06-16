import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const containerStyles =
  "bg-gradient-to-r from-green-900 to-teal-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8";
const cardStyles = "max-w-md w-full p-6 bg-white rounded-lg shadow-2xl";
const titleStyles = "text-2xl font-bold text-center";
const errorStyles = "text-red-500 text-center border";
const formStyles = "mt-8 space-y-6";
const inputStyles =
  "formInput w-full border-2 border-gray-300 rounded-md mb-4 p-2";
  const buttonStyles =
  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400";


const textStyles = "text-gray-500 m-3";


function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        // Login was successful, trigger the onLogin callback
        onLogin();
        history.push("/tasks");
      } else {
        // Login failed, handle the error
        throw new Error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the username input contains an email
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(username)) {
      setError("Please enter your username instead of an email.");
      return;
    }

    handleLogin();
  };

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <div>
          <h1 className={titleStyles}>Login</h1>
          {error && <p className={errorStyles}>{error}</p>}
        </div>
        <form className={formStyles} onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={inputStyles}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={inputStyles}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit" className={buttonStyles}>
              Sign in
            </button>
          </div>
        </form>
        <p className={textStyles}>
          Don't have an account?{" "}
        </p>
          <Link to="/signup" className={buttonStyles}>
            Sign up
          </Link>
      </div>
    </div>
  );
  
}

export default Login;
