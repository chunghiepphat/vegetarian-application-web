import React from "react";
import "./LoginForm.css";

const RegistrationForm = () => {
    return (
        <form class="form-registration">
            <input type="text" placeholder="First name" required/>
            <input type="text" placeholder="Last name" required/>
            <input type="tel" id="phone" name="Phone number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
            <input type="email" placeholder="Email address" required/>
            <input type="password" placeholder="Enter password" required/>
            <input type="password" placeholder="Confirm password" required/>
            <button type="submit">Sign in</button>
        </form>
    )
}

export default RegistrationForm;