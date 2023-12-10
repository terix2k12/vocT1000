import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';


function Card({cardData}) {

    return (<div className="basic">{cardData.name} {cardData.shelf} </div>);
}

function App() {

    const [posts, setPosts] = useState({});

    const [activeCard, setActiveCard] = useState({ name: "Void", shelf: -1});

    const globalKeyPress = e => console.log(e);

    useEffect( () => {
        document.addEventListener('keyup', globalKeyPress)
        // TODO how to remove eventlistener...?
    },[]);

   useEffect(() => {
      fetch('http://localhost:8100')
         .then((response) => response.json())
         .then((data) => {
            console.log("updated from fetch");
            setPosts(data);
            setActiveCard( data.data[0]  )
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   function promote(e)  {
       setActiveCard(posts.data[1] );
   }

    function demote(e)  {
        setActiveCard(posts.data[0] );
    }

  return (
    <div className="App">
        <header className="App-header">

            <Card cardData={ activeCard } />

            <button onClick={promote}>Promote</button>
            <button onClick={demote}>Demote</button>
            <button>Skip</button>
            <button>Solve</button>

        </header>
    </div>
  );
}

export default App;
