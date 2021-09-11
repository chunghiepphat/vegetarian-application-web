import React, {useState} from "react";
import "./Modal.css";

const Modal = props => {
    
    // 
    const [state, setState] = useState(
        {
            "email": "",
            "password": ""
        }
    )

    // state
    // this.state.state 

    // const setParams = (event) => {
    //     setState({[event.target.name]: event.target.value})
    // }
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        console.log("SHIT")
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "email": email,
            "password": password
        });


        console.log(raw)

        // let requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        //fetch("http://localhost:8080/api/auth/signin", requestOptions)
        //    .then(response => {
        //        console.log(response)
        //        if (response.ok) {
        //            return response.json();
        //        }
        //        throw Error(response.status.toString());
        //    })
        //    // Success
        //    .then(result => {
        //        console.log(result)
        //        //localStorage.setItem("accessToken", result.accessToken);
        //        alert("Login successful.");
        //    })
        //    // Failure
        //    .catch(error => {
        //        console.log('error', error);
        //        alert("Login credentials are invalid.");
        //    });
    }

    const [register, showRegister] = useState(false);
    if (!props.show) {
        return null;
    }
    // if (register) {
    //     return (
    //         <div class="modal-container">
    //             <section class="modal-content">
    //                 <h1>Welcome</h1>
    //                 <p>Already have an account? <a href="/#" onClick={() => showRegister(false)}>Sign in!</a></p>
    //                 <h2>Sign up with your email</h2>
    //                 <form class="modal-form">
    //                     <input type="text" placeholder="First name" required/>
    //                     <input type="text" placeholder="Last name" required/>
    //                     <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone number"/>
    //                     <input type="email" placeholder="Email address" required/>
    //                     <input type="password" placeholder="Enter password" required/>
    //                     <input type="password" placeholder="Confirm password" required/>
    //                     <button type="submit">Create new account</button>
    //                 </form>
    //                 <button class="modal-close" onClick={props.close}>Close</button>
    //             </section>
    //         </div>
    //     )
    // }
    return (
        <div class="modal-container">
            <section class="modal-content">
                <h1>Welcome back!</h1>
                <p>Don't have an account? <a href="/#" onClick={() => showRegister(true)}>Sign up!</a></p>
                <h2>Continue with your social media</h2>
                <button>Placeholder</button>
                <button>Placeholder</button>
                <h2>Sign in with your email</h2>
                <form class="modal-form">
                    <input type="email" name="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" name="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} required/>
                    <button type="submit" onClick={login}>Sign in</button>
                </form>
                <button class="modal-close" onClick={props.close}>Close</button>
            </section>
        </div>
    )
}

export default Modal;
