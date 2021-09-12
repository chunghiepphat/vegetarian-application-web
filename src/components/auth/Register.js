import React from "react";
import "./Login.css";

const Register = () => {
    // Render the form
    return (
        <section className="modal-content">
            <h1>Welcome</h1>
            <p>Already have an account? <a href="/#">Sign in!</a></p>
            <h2>Sign up with your email</h2>
            <form className="modal-form">
                <input type="text" placeholder="First name" required/>
                <input type="text" placeholder="Last name" required/>
                <input type="email" placeholder="Email address" required/>
                <input type="password" placeholder="Enter password" required/>
                <input type="password" placeholder="Confirm password" required/>
                <button type="submit">Create new account</button>
            </form>
            <button className="modal-close">Close</button>
        </section>
    )
}

export default Register;