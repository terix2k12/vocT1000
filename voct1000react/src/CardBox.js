import React, {useState, useEffect} from 'react';
import './CardBox.css';
import Card from "./Card";

function CardBox({ activeBox }) {

    const [showBack, setShowBack] = useState(false);
    
    const initCard = {id: -1, front: "ifront", back: "iback"};
    const noCard = {id: 0, front: "front", back: "back"};
    const [activeCard, setActiveCard] = useState(initCard);

    const initTraining = {id: -1, collection: -1, box: -1, card: -1};
    const [activeTraining, setActiveTraining] = useState(initTraining);


    function promote() {
        fetch('http://localhost:8100/training/promote/' + activeTraining.id,{
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Promote successful");
                updateTraining(activeBox);
            });
    }

    function demote() {
        fetch('http://localhost:8100/training/demote/' + activeTraining.id,{
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
        fetch('http://localhost:8100/training/skip/' + activeTraining.id,{
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Skip successful");
                updateTraining(activeBox);
            });
    }

    function updateCard(cardId) {
        fetch('http://localhost:8100/card/get/' + cardId, {
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
        fetch('http://localhost:8100/training/next/' + box,
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
        <div className="horiz">
         <button onClick={demote}>Demote</button>
         <div className="verti">
          <button onClick={solve}>Flip</button>
           {
            (activeCard.id == -1)
                ? (<p>Loading Card...</p>)
                : (activeCard.id == 0)
                   ? (<p>No cards in this box.</p>)
                   : <Card cardData={activeCard} showBack={showBack}/>
           }
           <button onClick={skipCard}>Skip</button>
          </div>
          <button onClick={promote}>Promote</button>
        </div>
    </>);

}

export default CardBox;