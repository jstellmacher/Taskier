import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const containerStyles =
  "bg-gradient-to-r from-green-900 to-teal-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8";
const cardStyles = "max-w-md w-full p-6 bg-white rounded-lg shadow-2xl";
const formStyles = "mt-8";
const inputStyles =
  "w-full px-3 py-2 border-2 border-gray-400 rounded-md mb-4";
const buttonStyles =
  "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400";

function Signup() {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const history = useHistory();

  const handleNewUserChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitSignup = (event) => {
    event.preventDefault();
    if (newUser.password === event.target.confirmPassword.value) {
      console.log("good job on the matching passwords");
      handleCreateAccount();
    } else {
      window.alert(
        "Your passwords do not match. Please reenter your password and try again."
      );
    }
  };

  const handleCreateAccount = () => {
    const { confirmPassword, ...userData } = newUser;

    if (userData.password === confirmPassword) {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          window.alert("Account created successfully. Please log in.");
          history.push("/login");
        })
        .catch((error) => {
          console.log(error);
          window.alert("Error creating account. Please try again.");
        });
    } else {
      window.alert(
        "Your passwords do not match. Please reenter your password and try again."
      );
    }
  };
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <div className="flex justify-start mb-4">
          <button
            className="flex items-center text-teal-500 hover:text-teal-700"
            onClick={handleGoBack}
          >
            <IoIosArrowBack className="mr-1" /> Back
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center">SignUp Here!</h1>
        <form className={formStyles} onSubmit={handleSubmitSignup}>
          <input
            className={inputStyles}
            value={newUser.username}
            type="text"
            name="username"
            placeholder="Enter your username here."
            onChange={handleNewUserChange}
          />
          <input
            className={inputStyles}
            value={newUser.email}
            type="email"
            name="email"
            placeholder="Enter your email here."
            onChange={handleNewUserChange}
          />
          <input
            className={inputStyles}
            value={newUser.password}
            type="password"
            name="password"
            placeholder="Enter your password here."
            onChange={handleNewUserChange}
          />
          <input
            className={inputStyles}
            value={newUser.confirmPassword}
            type="password"
            name="confirmPassword"
            placeholder="Reenter your password."
            onChange={handleNewUserChange}
          />
          <button className={buttonStyles} type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
