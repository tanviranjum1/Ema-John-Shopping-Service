import { useState } from "react";
import { UserContext } from "../../App";
import { useContext } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import {
  createUserEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  signInEmailAndPassword,
} from "./LoginManager";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { resetPassword } from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      navigate(from, { replace: true });
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const location = useLocation();
  let navigate = useNavigate();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (event) => {
    console.log(user.email);
    console.log(user.password);
    if (newUser && user.email && user.password) {
      console.log("inside");
      createUserEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          console.log(res);
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }

    event.preventDefault();
  };

  const handleBlur = (event) => {
    // to detect which field we are writing.
    // console.log(event.target.name, event.target.value);
    let isFieldValid = true;
    if (event.target.name === "email") {
      //returns true if email is valid else false.
      const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      isFieldValid = isEmailValid;
      console.log(isEmailValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 8;
      const passwordHasNumber = /\d{1}/.test(event.target.value);

      // console.log(isPasswordValid);
      // console.log(passwordHasNumber);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Google Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Google Sign In</button>
      )}

      {/* ***************fb button. */}
      <button onClick={fbSignIn}>Sign in using facebook</button>

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email, {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
      <h1>Our own Authentication</h1>
      {/* just for checking if validation is working or not. */}
      {/* <p>Name: {user.name}</p>
      <p>Email:{user.email}</p>
      <p>Password:{user.password}</p> */}

      <input
        type="checkbox"
        onChange={() => {
          setNewUser(!newUser);
        }}
        name="newUser"
        id=""
      />

      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            name="name"
            onBlur={handleBlur}
            type="text"
            placeholder="Your name"
          />
        )}
        <br />
        <input
          type="email"
          name="email"
          onBlur={handleBlur}
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          type="password"
          onBlur={handleBlur}
          name="password"
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>
      <button onClick={() => resetPassword(user.email)}>
        Forget or Reset Password
      </button>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "Created" : "Logged In"} Successfully
        </p>
      )}
    </div>
  );
}

export default Login;
