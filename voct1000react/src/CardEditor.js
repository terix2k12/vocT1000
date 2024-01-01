import React, {useState, useEffect} from 'react';
import './CardEditor.css';

function CardEditor() {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    function doSave() {
        sendCard();
        sendTraining();
    }

    function sendTraining() {

    }

    function sendCard() {
        fetch('http://localhost:8100/login',
              {
                method: "POST",
                body: JSON.stringify({
                    username: front,
                    password: back
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
                // setUser(username);
                // setAppState("signin");
            } else {
                alert('Save failed.');
            }
        });
    }

    function handleFront(event) {
        setFront(event.target.value);
    }

    function handleBack(event) {
        setBack(event.target.value);
    }

    return (
        <div className="cardEdit">
            
            Front: <input onChange={ handleFront } /> <br/>
            Back: <input onChange={ handleBack } /> <br/>
            <button onClick = { doSave } >Save</button>
        </div>
    );

}

export default CardEditor;