import React, {useState, useEffect} from 'react';

function Login({setUser}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function sendLogin() {
        fetch('http://localhost:8100/login',
              {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
              }
         )
        .then((response) => response.json())
        .then((data) => {
            if(data.success === "Login successful!") {
                // alert('Login OK');
                setUser(username);
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