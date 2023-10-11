import { useState } from "react";
import Checkmark from "../Components/Checkmark";
import logo from "../assets/logo.svg";

export default function Login({ setActivePage }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div id="page__login">
      <form action="#">
        <img src={logo} alt="Logo" className="logo" />
        <h1>
          Welcome, <span>Log in</span> to your account.
        </h1>
        <div className="input-wrapper">
          <div className="info">
            <label htmlFor="email-input">
              Email Address
            </label>
            <label
              htmlFor="email-input"
              className="input-error"
            >
              Invalid Input
            </label>
          </div>
          <input
            type="text"
            placeholder="example@gmail.com"
            id="email-input"
          />
        </div>
        <div className="input-wrapper">
          <div className="info">
            <label htmlFor="password-input">Password</label>
            <label
              htmlFor="password-input"
              className="input-error"
            >
              Incorrect Password
            </label>
          </div>
          <div className="password__wrapper">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password-input"
              placeholder="example123"
            />
            <div
              className={`toggle-visibility ${
                showPassword ? "visible" : ""
              }`}
              onClick={() => {
                setShowPassword((current) => !current);
              }}
            >
              <i className="bx bx-show"></i>
            </div>
          </div>
        </div>
        <div className="utils">
          <Checkmark
            className="utils-keeplogin"
            label="Keep me logged in"
          />
          <button className="forgot-password">
            Forgot Password?
          </button>
        </div>
        <button
          className="purple-button purple-hover submit"
          onClick={() => {
            setActivePage("feeds");
          }}
        >
          Log in
        </button>
        <p className="signup-link ">
          Don&apos;t have an account? <span>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
