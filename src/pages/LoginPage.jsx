export default function LoginPage() {
  return (
    <div className="explore-body">

      <div className="wrap">
        <div className="auth-row">
          <div className="card signin">
            <h2 className="title">Sign In</h2>
            <form>
              <div>
                <label>Email address</label>
                <input type="email" placeholder="Email address" required />
              </div>
              <div>
                <label>Password</label>
                <input type="password" placeholder="Password" required />
              </div>
              <button className="btn signin" type="submit">
                Sign-In
              </button>
            </form>
          </div>

          <div className="or">or</div>

          {/* Sign Up */}
          <div className="card signup">
            <h2 className="title">Sign up for a free account</h2>
            <form>
              <div className="row">
                <input type="text" placeholder="First name" required />
                <input type="text" placeholder="Last name" required />
              </div>
              <input type="email" placeholder="Email address" required />
              <input type="password" placeholder="Create password" required />
              <button className="btn signup" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
