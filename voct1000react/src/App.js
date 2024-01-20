import React, {useState, useEffect} from 'react';

import './App.css';

import Boxes from "./Boxes";
import CardBox from "./CardBox";
import CardList from "./CardList";
import CardEditor from "./CardEditor";
import Login from "./Login";
import Menu from "./Menu";

function App() {

    const [user, setUser] = useState("");
    const [appState, setAppState] = useState("signout");
    const [activeBox, setActiveBox] = useState(-1);
    const [activeCard, setActiveCard] = useState(null);


    useEffect(() => {}, []);

    function setBox(box) {
        if(box === activeBox) {
            setActiveBox(0);
            setAppState("");
        } else {
            setActiveBox(box);
            setAppState('boxes');
        }
    }

    function handleKey(e) {
        // console.log(e);

        if (e.key === "a") {
            // demote();
        }
        if (e.key === "d") {
            // promote();
        }
        if (e.key === "s") {
            // solve();
        }
        if (e.key === "d") {
            // skipCard();
        }
    }

    let content;
    if( appState === "loading") {
        content = (<p>Loading...</p>);
    } else if( appState === "signout" ) {
        content = (<Login setUser={setUser} setAppState={setAppState} />);
    } else if( appState === "adding" ) {
        content = (<CardEditor activeCard={activeCard} />);
    } else if( appState === "boxes" ){
        content = (<CardBox activeBox = {activeBox} />);
    } else if( appState === "allcards" ){
        content = <CardList setAppState={setAppState}
                            setActiveCard={setActiveCard}
        />
    } else { 
        content = (<p>Welcome back, {user}!</p>);
    }

    return (
        <div className="pane"
                 onKeyUp={handleKey}
                 tabIndex={0}>

            <Boxes activeBox={activeBox} setBox={setBox} user={user} />
            <div className="content">
                 { content }
            </div>
            <Menu user={user} setUser={setUser}
                  setAppState={setAppState}
                  setActiveCard={setActiveCard}
            />
        </div>
    );
}

export default App;
