import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <label>Email</label>
        <input type="email" name="email" required />
        
        <label>Password</label>
        <input type="password" name="password" required />
        
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        
        <button type="submit" className="login-button">Submit</button>
      </form>
    </div>
  );
}

export default Login;
