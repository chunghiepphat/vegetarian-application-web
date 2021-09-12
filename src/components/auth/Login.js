import React, {useState} from "react";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // Handling login requests
    const login = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        let raw = JSON.stringify({
            "email": email,
            "password": password
        });
        console.log(raw)
        let result = await fetch("http://localhost:8080/api/auth/signin", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
    }
    // Render the form
    return (
        <section className="modal-content">
            <h1>Welcome back!</h1>
            <p>Don't have an account? <a href="/#">Sign up!</a></p>
            <h2>Continue with your social media</h2>
            <button>Placeholder</button>
            <button>Placeholder</button>
            <h2>Sign in with your email</h2>
            <form className="modal-form" onSubmit={login}>
                <input type="email" name="email" placeholder="Enter email"
                       onChange={e => setEmail(e.target.value)}
                       required/>
                <input type="password" name="password" placeholder="Enter password"
                       onChange={e => setPassword(e.target.value)} required/>
                <button type="submit">Sign in</button>
            </form>
            <button className="modal-close">Close</button>
        </section>
    )
}

export default Login;