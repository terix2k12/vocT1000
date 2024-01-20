import React, {useState} from 'react';
import {baseUrl} from './Tconfig';
import "./Login.css"

function Login({setUser, setAppState}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    function sendLogin() {
        fetch(baseUrl + 'login',
              {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include'
              }
         )
        .then((response) => {

            return response.json();
         })
        .then((data) => {
            if(data.success === "Login successful!") {
                // alert('Login OK');
                setUser(username);
                setAppState("signin");
            } else {
                alert('Login failed.');
            }
        });
    }

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <div>
            <div className="loginform">
            User: <input onChange={handleUsername}/><br/>
            Password: <input type={showPass ? 'text' : 'password'} onChange={handlePassword}></input><br/>
            </div>
            <button className="lbutton" onClick={sendLogin}>Login</button>
            <button className="lbutton" onClick={() => {setShowPass(!showPass)}}>Show</button>
        </div>
    );

}

export default Login;