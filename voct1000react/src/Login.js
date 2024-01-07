import React, {useState} from 'react';
import {baseUrl} from './Tconfig';

function Login({setUser, setAppState}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            <p>Please log in!</p>
            User: <input onChange={ handleUsername } /><br/>
            Password: <input onChange={ handlePassword }></input><br/>
            <button onClick={sendLogin}>Login</button>
        </div>
    );

}

export default Login;