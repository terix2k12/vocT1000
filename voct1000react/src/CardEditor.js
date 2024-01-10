import React, {useEffect, useState} from 'react';
import './CardEditor.css';
import {baseUrl} from './Tconfig';

function CardEditor({activeCard}) {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    function doSave() {
        sendCard();
    }

    useEffect(() => {
        if(activeCard) {
            setFront(activeCard.front);
            setBack(activeCard.back);
        } else {
            setFront("");
            setBack("");
        }
    }, [activeCard]);

    function sendCard() {
        fetch(baseUrl + 'card/save',
              {
                method: "POST",
                body: JSON.stringify({
                    id: activeCard?.id ?? -1,
                    front: front,
                    back: back
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials: 'include'
              }
         )
        .then((response) => response.json())
        .then((data) => {
            if(data.id > 0) {
                alert('Save OK');
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
            Id: <p> { activeCard?.id ?? "n/a" } </p>
            Front: <input onChange={ handleFront }
               value={ front } />
              <br/>
            Back: <input onChange={ handleBack }
            value={ back } />
                <br/>
            <button onClick = { doSave } >Save</button>
        </div>
    );

}

export default CardEditor;