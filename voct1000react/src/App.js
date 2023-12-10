import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';


function App() {

    const [posts, setPosts] = useState([]);

    const globalKeyPress = e => console.log(e);

    useEffect( () => {
        document.addEventListener('keyup', globalKeyPress)
        // TODO how to remove eventlistener...?
    },[]);

   useEffect(() => {
      fetch('http://localhost:8100')
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);

   let foo =  posts.data ?
          posts.data.map(d => d.name) :
          "ERROR";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {
           foo
        }
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
