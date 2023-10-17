import { useRef, useState } from "react";
import Checkmark from "../Components/Checkmark";
import logo from "../assets/logo.svg";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../Helper/config";

export default function Login({
  setActivePage,
  setActiveUser,
  userData,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const hasSubmit = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      keepLogIn: false,
    },
  });

  // Runs to check whether the input is correct or not
  const validateInputs = (data) => {
    hasSubmit.current = true;

    const { email, password } = data;

    // Find user index
    const userIndex = userData.findIndex(
      (data) => data.email === email
    );

    // Find user
    const selectedUser = userData.at(userIndex);

    // Validate Password against email
    if (selectedUser.password === password) {
      // Correct
      setActiveUser(selectedUser);
      setActivePage("feeds");
      setWrongPassword(false);
    } else {
      // Incorrect
      setWrongPassword(true);
    }
  };

  const validateEmail = (emailInput) => {
    // If email does match format (regex) then return early
    if (!EMAIL_REGEX.test(emailInput))
      return "Invalid Email";

    // Check if email is registered
    return (
      userData.some((data) => data.email === emailInput) ||
      "Email not registered"
    );
  };

  return (
    <div id="page__login">
      <form
        action="#"
        onSubmit={handleSubmit(validateInputs)}
      >
        <img src={logo} alt="Logo" className="logo" />
        <h1>
          Welcome, <span>Log in</span> to your account.
        </h1>

        <div
          className={`input-wrapper ${
            errors.email ? "is-error" : ""
          }`}
        >
          <div className="info">
            <label htmlFor="email-input">
              Email Address
            </label>
            <label
              htmlFor="email-input"
              className="input-error"
            >
              {errors.email?.message}
            </label>
          </div>
          <input
            type="text"
            placeholder="example@gmail.com"
            id="email-input"
            {...register("email", {
              validate: validateEmail,
            })}
          />
        </div>
        <div
          className={`input-wrapper ${
            wrongPassword ? "is-error" : null
          }`}
        >
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
              {...register("password", { required: true })}
            />
            <div
              className={`toggle-visibility ${
                showPassword ? "visible" : ""
              }`}
              onClick={() => setShowPassword((cur) => !cur)}
            >
              <i className="bx bx-show"></i>
            </div>
          </div>
        </div>
        <div className="utils">
          <Checkmark
            className="utils-keeplogin"
            label="Keep me logged in"
            control={control}
            name={"keepLogIn"}
          />
          <button className="forgot-password" type="button">
            Forgot Password?
          </button>
        </div>
        <button className="purple-button purple-hover submit">
          Log in
        </button>
        <p className="signup-link ">
          Don&apos;t have an account? <span>Sign Up</span>
        </p>
        {hasSubmit.current ? (
          <div className="password-list">
            <h2></h2>
            <p>email: kevin.johnson@example.net</p>
            <p>password: kevinj123</p>
            <a
              href="https://pastebin.com/8EQgdCCz"
              target="_blank"
              rel="noreferrer"
            >
              View All Accounts
            </a>
          </div>
        ) : null}
      </form>
    </div>
  );
}
