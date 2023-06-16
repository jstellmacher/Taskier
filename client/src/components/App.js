import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import SplashScreen from './SplashScreen';
import Login from './Login';
import Signup from './Signup';
import AddTask from './AddTask';
import UserPage from './UserPage';
import About from './About';
import Account from './Account';
import MyCalendar from './Calendar';
import NotFoundPage from './404';
import TaskListCard from './TaskListCard';
import TaskCard from './TaskCard';
import TodoList from './TodoList'; // Import the TodoList component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await fetch('/check-login-status');
        const data = await response.json();
        setLoggedIn(data.loggedIn);
      } catch (error) {
        console.error(error);
      }
    };

    checkLoggedInStatus();
  }, []);

  // Function to handle user login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <NavBar loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          {loggedIn ? <TaskListCard /> : <SplashScreen />}
        </Route>
        <Route exact path="/login">
          {loggedIn ? (
            <Redirect to="/" /> // Redirect to the home page if already logged in
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/signup" component={Signup} />
        <Route path="/add-task" component={AddTask} />
        <Route path="/account" component={Account} />
        <Route path="/calendar" component={MyCalendar} />
        <Route path="/profile" component={UserPage} />
        <Route path="/about" component={About} />
        <Route exact path="/tasks">
          {loggedIn ? (
            <TaskListCard />
          ) : (
            <Redirect to="/login" /> // Redirect to the login page if not logged in
          )}
        </Route>
        <Route exact path="/tasks/:taskId" component={TaskCard} />
        <Route exact path="/todo">
          {loggedIn ? (
            <TodoList /> // Render the TodoList component
          ) : (
            <Redirect to="/login" /> // Redirect to the login page if not logged in
          )}
        </Route>
        <Route component={NotFoundPage} /> {/* Render 404 page for all other routes */}
      </Switch>
    </Router>
  );
}

export default App;
