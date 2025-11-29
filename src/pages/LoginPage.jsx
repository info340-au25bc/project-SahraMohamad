import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const emptySignIn = { email: "", password: "" };
const emptySignUp = { firstName: "", lastName: "", email: "", password: "" };

export default function LoginPage() {
  const { activeUser, signIn, signUp, signOut } = useAuth();
  const [signInForm, setSignInForm] = useState(emptySignIn);
  const [signUpForm, setSignUpForm] = useState(emptySignUp);
  const [signInStatus, setSignInStatus] = useState(null);
  const [signUpStatus, setSignUpStatus] = useState(null);

  const handleSignInChange = (event) => {
    const { name, value } = event.target;
    setSignInForm((prev) => ({ ...prev, [name]: value }));
    setSignInStatus(null);
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value }));
    setSignUpStatus(null);
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    const result = signIn(signInForm.email, signInForm.password);

    if (result?.message) {
      setSignInStatus({
        type: result.success ? "success" : "error",
        message: result.message,
      });
    }

    if (result.success) {
      setSignInForm(emptySignIn);
    }
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    const result = signUp(signUpForm);

    if (result?.message) {
      setSignUpStatus({
        type: result.success ? "success" : "error",
        message: result.message,
      });
    }

    if (result.success) {
      setSignUpForm(emptySignUp);
    }
  };

  const handleSignOut = () => {
    signOut();
    setSignInStatus(null);
    setSignUpStatus(null);
  };

  return (
    <div className="explore-body">
      <div className="wrap">
        <div className="auth-row">
          <div className="card signin">
            <h2 className="title">Sign In</h2>
            {activeUser ? (
              <div className="session-info">
                <p>
                  Signed in as{" "}
                  <strong>
                    {activeUser.firstName} {activeUser.lastName}
                  </strong>
                </p>
                <p className="session-email">{activeUser.email}</p>
                <button
                  className="btn signin"
                  type="button"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignInSubmit}>
                <div>
                  <label htmlFor="signin-email">Email address</label>
                  <input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={signInForm.email}
                    onChange={handleSignInChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="signin-password">Password</label>
                  <input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={signInForm.password}
                    onChange={handleSignInChange}
                    required
                  />
                </div>
                <button className="btn signin" type="submit">
                  Sign-In
                </button>
                <StatusMessage status={signInStatus} />
              </form>
            )}
          </div>

          <div className="or">or</div>

          <div className="card signup">
            <h2 className="title">Sign up for a free account</h2>
            <form onSubmit={handleSignUpSubmit}>
              <div className="row">
                <input
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={signUpForm.firstName}
                  onChange={handleSignUpChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={signUpForm.lastName}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email address"
                name="email"
                value={signUpForm.email}
                onChange={handleSignUpChange}
                required
              />
              <input
                type="password"
                placeholder="Create password (min 6 characters)"
                name="password"
                value={signUpForm.password}
                onChange={handleSignUpChange}
                required
              />
              <button className="btn signup" type="submit">
                Register
              </button>
              <StatusMessage status={signUpStatus} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusMessage({ status }) {
  if (!status?.message) {
    return null;
  }

  return <p className={`form-status ${status.type}`}>{status.message}</p>;
}
