import React, {useState, useEffect} from 'react';

import './App.css';

import Boxes from "./Boxes";
import CardBox from "./CardBox";
import CardEditor from "./CardEditor";
import Login from "./Login";
import Menu from "./Menu";

function App() {

    const [user, setUser] = useState("");
    const [appState, setAppState] = useState("signout");
    const [activeBox, setActiveBox] = useState(-1);

    useEffect(() => {}, []);

    function setBox(box) {
        setActiveBox(box);
        setAppState('boxes');
        // updateTraining(box);
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
        content = (<CardEditor />);
    } else if( appState === "boxes" ){
        content = (<CardBox activeBox = {activeBox} />)
    } else { 
        content = (<p>Hello foouser, select an action!</p>);
    }

    return (
        <div className="pane"
                 onKeyUp={handleKey}
                 tabIndex={0}>

            <Boxes activeBox={activeBox} user={user} setBox={setBox} />
            <div className="content">
                 { content }
            </div>
            <Menu user={user} setUser={setUser} setAppState={setAppState}/>
        </div>
    );
}

export default App;
