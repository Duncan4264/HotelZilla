const RegisterForm = ({submitHandle, name, setName, email, setEmail, password, setPassword}) => (
    <form onSubmit={submitHandle} className="mt-3">
          <div className="form-group mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />

              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />


              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} /> 
          </div>

          <button className="btn btn-primary">Sign Up</button>
        </form>
);

export default RegisterForm;