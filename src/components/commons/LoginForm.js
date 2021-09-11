import React from "react";
import "./LoginForm.css";

const LoginForm = () => {
    return (
        <div>
            <h1>Welcome back!</h1>
            <p>Don't have an account? <a href="/#">Sign up!</a></p>
            <h2>Continue with your social media</h2>
            <button>Placeholder</button>
            <button>Placeholder</button>
            <h2>Sign in with your email</h2>
            <form className="form-login">
                <input type="email" placeholder="Enter email" required/>
                <input type="password" placeholder="Enter password" required/>
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default LoginForm;