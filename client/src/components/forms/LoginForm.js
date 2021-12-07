/*
 *  Component to load Login Form component
 * Parameters: Handlesubmit function, email string, set email state, password string, set password state
 */
const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword
}) => (
  <div>
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button disabled={!email || !password} className="btn btn-primary">
        Submit
      </button>
    </form>
    <i>
      New To HotelZilla? Sign up{' '}
      <a href="/register" value="Register">
        here
      </a>
      !
    </i>
  </div>
);

export default LoginForm;
