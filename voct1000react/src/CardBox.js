import React, {useState, useEffect} from 'react';
import './CardBox.css';
import Card from "./Card";
import {baseUrl} from './Tconfig';

function CardBox({activeBox}) {

    const [showBack, setShowBack] = useState(false);

    const initCard = {id: -1, front: "ifront", back: "iback"};
    const noCard = {id: 0, front: "front", back: "back"};
    const [activeCard, setActiveCard] = useState(initCard);

    const initTraining = {id: -1, collection: -1, box: -1, card: -1};
    const [activeTraining, setActiveTraining] = useState(initTraining);

    function promote() {
        fetch(baseUrl + 'training/promote/' + activeTraining.id, {
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Promote successful");
                updateTraining(activeBox);
            });
    }

    function demote() {
        fetch(baseUrl + 'training/demote/' + activeTraining.id, {
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Demote successful");
                updateTraining(activeBox);
            });
    }

    function solve() {
        setShowBack(!showBack);
    }

    function skipCard() {
        fetch(baseUrl + 'training/skip/' + activeTraining.id, {
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Skip successful");
                updateTraining(activeBox);
            });
    }

    function updateCard(cardId) {
        fetch(baseUrl + 'card/get/' + cardId, {
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data2) => {
                console.log("updateCard " + data2);
                setActiveCard(data2);
            }).catch((err2) => {
            console.log(err2.message);
        });
    }

    function updateTraining(box) {
        fetch(baseUrl + 'training/next/' + box,
            {credentials: 'include'})
            .then((response) => response.json())
            .then((data) => {
                console.log("updateTraining " + data);

                if (data) {
                    setActiveTraining(data);
                    updateCard(data.card);
                } else {
                    setActiveCard(noCard);
                }

            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        updateTraining(activeBox);
    }, [activeBox]);

    return (<>
        <div className="verti">
            <button className="skip" onClick={skipCard}>Skip</button>
            {
                (activeCard.id === -1)
                    ? (<p>Loading Card...</p>)
                    : (activeCard.id === 0)
                        ? (<p>No cards in this box.</p>)
                        : <Card cardData={activeCard} showBack={showBack}/>
            }
            <button className="flip" onClick={solve}>Flip</button>

        </div>
        <div className="horiz">

            <button className="demote" onClick={demote}>Demote</button>
            <button className="promote" onClick={promote}>Promote</button>

        </div>
    </>);

}

export default CardBox;