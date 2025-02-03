import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { fetchBasket } from "./basketAPI"

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, dispatch] = useStateValue();
  const REACT_APP_BACKEND_URL = "https://amazon-clone-cjffgkhdh9cxanaj.japanwest-01.azurewebsites.net"

  // Function to handle login using the Express backend with fetch
  const signIn = async (e) => {
    e.preventDefault(); // Prevent form refresh
    try {
      // Send a POST request to /auth/login
      const response = await fetch(`${REACT_APP_BACKEND_URL}/auth/login` || "http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response was successful
      if (!response.ok) {
        // Extract error message from the response
        const errorData = await response.json();
        throw new Error(errorData.msg || "Login failed. Please try again.");
      }

      // Extract data from the response
      const data = await response.json();
      const { token, user } = data;

      // Store the JWT token in localStorage for later use
      localStorage.setItem("token", token);
      
      dispatch({
        type: "SET_USER",
        user: user
      })
      const product_list = await fetchBasket(token);
      dispatch({
        type: "SET_BASKET",
        basket: product_list
      })
      
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    }
  };

  // Function to handle registration using the Express backend with fetch
  const register = async (e) => {
    e.preventDefault(); // Prevent form refresh
    try {
      // Send a POST request to /auth/register
      const response = await fetch(`${REACT_APP_BACKEND_URL}/auth/register`  || "http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Registration failed. Please try again.");
      }

      // Extract data from the response
      const data = await response.json();
      const { token, user } = data;

      // Store the JWT token in localStorage
      localStorage.setItem("token", token);

      dispatch({
        type: "SET_USER",
        user: user
      })

      const product_list = await fetchBasket(token);
      dispatch({
        type: "SET_BASKET",
        basket: product_list
      })
      // Redirect to the home page after successful registration
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
          alt="login-logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to AMAZON FAKS CLONE's Conditions of Use &
          Sales. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;

