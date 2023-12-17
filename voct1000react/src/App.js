import React, {useState, useEffect } from 'react';
import './App.css';
import Card from "./Card";

function App() {

    const [showBack, setShowBack] = useState(false);
    const [activeBox, setActiveBox] = useState(-1);
    const [activeCard, setActiveCard] = useState({ id: -1, front: "front", back: "back"});
    const [activeTraining, setActiveTraining] = useState({ id: -1, collection: -1, box: -1, card: -1});

   useEffect(() => {
   }, []);

   function promote()  {
       fetch('http://localhost:8100/hindi/promote/'+activeTraining.id)
           .then((response) => response.json())
           .then((data) => {
               console.log("Promote successful");
               updateTraining(activeBox);
           });
   }

    function demote()  {
        fetch('http://localhost:8100/hindi/demote/'+activeTraining.id)
            .then((response) => response.json())
            .then((data) => {
                console.log("Demote successful");
                updateTraining(activeBox);
            });
   }

    function handleKey(e) {
        // console.log(e);

        if( e.key === "a") {
            demote();
        }
        if( e.key === "d") {
            promote();
        }
        if( e.key === "s") {
            solve();
        }
        if( e.key === "d") {
            skipCard();
        }
    }

    function solve() {
       setShowBack(!showBack);
    }

    function skipCard() {
        fetch('http://localhost:8100/hindi/skip/'+activeTraining.id)
            .then((response) => response.json())
            .then((data) => {
                console.log("Skip successful");
                updateTraining(activeBox);
            });
    }

    function updateCard(data) {
        fetch('http://localhost:8100/hindi/get/'+data.card)
            .then((response) => response.json())
            .then((data2) => {
                console.log("updateCard " + data2);
                setActiveCard( data2 );
            }) .catch((err2) => {
            console.log(err2.message);
        });
    }

    function updateTraining(box) {
        fetch('http://localhost:8100/hindi/next/'+box)
            .then((response) => response.json())
            .then((data) => {
                console.log("updateTraining " + data);

                if(data) {
                    setActiveTraining( data );
                    updateCard(data);
                } else {
                    setActiveBox(-1);
                }

            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    function setBox(box) {
       setActiveBox(box);
       updateTraining(box);
    }

  return (
      <div className="App"
           onKeyUp={handleKey}
           tabIndex={0}>
          <header className="App-header">

          <div>
              <div className={activeBox == 1 ? "activeBox" : "inactiveBox"} onClick={() => setBox(1)}>Box 1</div>
              <div className={activeBox == 2 ? "activeBox" : "inactiveBox"} onClick={() => setBox(2)}>Box 2</div>
              <div className={activeBox == 3 ? "activeBox" : "inactiveBox"} onClick={() => setBox(3)}>Box 3</div>
              <div className={activeBox == 4 ? "activeBox" : "inactiveBox"} onClick={() => setBox(4)}>Box 4</div>
              <div className={activeBox == 5 ? "activeBox" : "inactiveBox"} onClick={() => setBox(5)}>Box 5</div>
          </div>

          {(activeBox == -1)
              ?"Please select a Box!"
              :<Card cardData={activeCard} showBack={showBack}/>}

          <button onClick={promote}>Promote</button>
          <button onClick={demote}>Demote</button>
          <button onClick={solve}>Flip</button>
          <button onClick={skipCard}>Skip</button>

          </header>

      </div>
  );
}

export default App;
