import React, {useState, useEffect } from 'react';
import './App.css';

function Card({cardData, showBack}) {

    return (
        <div className="basic">

            <div className= {showBack?"flip-card flipped":"flip-card"} >
                Box: {cardData.shelf}
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        {cardData.name}
                    </div>
                    <div className="flip-card-back">
                        {cardData.name.split("").reverse().join("")}
                    </div>
                </div>
            </div>

        </div>

    );
}

function App() {

    const [posts, setPosts] = useState({});
    const [cards, setCards] = useState([]);
    const [showBack, setShowBack] = useState(false);
    const [index, setIndex] = useState(0);
    const [activeCard, setActiveCard] = useState({ name: "Void", shelf: -1});

   useEffect(() => {
      fetch('http://localhost:8100')
         .then((response) => response.json())
         .then((data) => {
            console.log("updated from fetch");
            setPosts(data);
            setCards(data.data);
            setActiveCard( data.data[0]  )
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   function promote()  {
       let newCard = {...activeCard}
       newCard.shelf = newCard.shelf + 1;
       setActiveCard( newCard )
   }

    function demote()  {
        let newCard = {...activeCard}
        newCard.shelf = newCard.shelf - 1;
        setActiveCard( newCard )
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
        setIndex(index + 1);
        setActiveCard(cards[index+1]);
    }

  return (
    <div className="App"
         onKeyUp={handleKey}
    tabIndex={0}>
        <header className="App-header">

            <Card cardData={activeCard} showBack={showBack } />

            <button onClick={promote}>Promote</button>
            <button onClick={demote}>Demote</button>
            <button onClick={solve}>Flip</button>
            <button onClick={skipCard}>Skip</button>

        </header>
    </div>
  );
}

export default App;
