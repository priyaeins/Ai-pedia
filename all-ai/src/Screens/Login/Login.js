import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext"; // Import the context
import "./Login.css";

// Creating validation schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from context

  const handleShow = () => {
    setShow(!show);
  };

  // Predefined credentials
  const emailId = "priya@gmail.com";
  const password = "12345678";

  // Form submission handler
  const handleSubmit = (values) => {
    if (values.email === emailId && values.password === password) {
      login(); // Call login function on successful login
      alert("Login Successful");
      navigate("/"); // Redirect to home page
      setLoginError(""); // Clear error message
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <div className="Login-container">
      <img className="bg" src="/Assets/bg.jpg" alt="background" />

      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form className="login" onSubmit={handleSubmit}>
            <div className="form">
              <span>Login</span>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter email id / username"
                className="form-control inp_text"
              />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
              <div style={{ position: "relative" }}>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <div className="password-toggle" onClick={handleShow}>
                  <img
                    src={
                      show
                        ? "https://static.thenounproject.com/png/777494-200.png"
                        : "https://cdn2.iconfinder.com/data/icons/basic-ui-interface-v-2/32/hide-512.png"
                    }
                    alt="Toggle Password Visibility"
                  />
                </div>
              </div>
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
              {/* Displaying login error */}
              {loginError && <div className="error">{loginError}</div>}
              <button
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                type="submit"
                className="btn-primary "
              >
                Login
              </button>

              <div className="divider">
                <h3
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  or
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                <div
                  className="google-signin"
                  onClick={() => alert("Sign in with Google")}
                >
                  <img
                    style={{ width: 30, height: 30, borderRadius: 50 }}
                    src="/Assets/googleicon.png"
                    alt="Google Icon"
                  />
                  Sign in with Google
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
