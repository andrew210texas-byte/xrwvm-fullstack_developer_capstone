import React, { useState } from 'react';
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";

const Register = () => {

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");

    const gohome = () => {
        window.location.href = window.location.origin;
    }

    const register = async (e) => {
        e.preventDefault();

        let register_url = window.location.origin + "/djangoapp/register";

        const res = await fetch(register_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userName": username,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "email": email
            }),
        });

        const json = await res.json();

        if (json.status != null && json.status === "Authenticated") {
            sessionStorage.setItem('username', json.userName);
            window.location.href = window.location.origin;
        }
        else if (json.error === "Already Registered") {
            alert("The user with username " + username + " is already registered");
        }
    };

    return (
        <div className="register_container">
            <div className="header">
                <span>SignUp</span>

                <div style={{ fontSize: "0.3em" }}>
                    Already have an account? <a href="/login">Login Here</a>
                </div>

                <img
                    src={close_icon}
                    alt="Close"
                    className="img_icon"
                    onClick={gohome}
                    style={{ cursor: "pointer" }}
                />
            </div>

            <div className="inputs">

                <div className="input">
                    <img src={user_icon} className="img_icon" alt="Username" />
                    <input
                        className="input_field"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="input">
                    <img src={user_icon} className="img_icon" alt="First Name" />
                    <input
                        className="input_field"
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                    />
                </div>

                <div className="input">
                    <img src={user_icon} className="img_icon" alt="Last Name" />
                    <input
                        className="input_field"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                    />
                </div>

                <div className="input">
                    <img src={email_icon} className="img_icon" alt="Email" />
                    <input
                        className="input_field"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input">
                    <img src={password_icon} className="img_icon" alt="Password" />
                    <input
                        className="input_field"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

            </div>

            <div className="submit_panel">
                <button className="submit" onClick={register}>
                    Register
                </button>
            </div>
        </div>
    );
}

export default Register;