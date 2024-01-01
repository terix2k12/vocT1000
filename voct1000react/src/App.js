import React, {useState, useEffect} from 'react';

import './App.css';

import Boxes from "./Boxes";
import CardBox from "./CardBox";
import Login from "./Login";
import Menu from "./Menu";

function App() {

    const [user, setUser] = useState("");

    useEffect(() => {}, []);

    function setBox(box) {
        // setActiveBox(box);
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

    // let content = (<CardBox />);
    let content = (<Login setUser={setUser}/>);

    if(user === "foouser") {
        content = (<p>Hello foouser, select an action!</p>)
    }

    return (
        <div className="pane"
                 onKeyUp={handleKey}
                 tabIndex={0}>

            <Boxes activeBox={0} user={user} setBox={setBox} />
            <div className="content">
                 { content }
            </div>
            <Menu user={user} setUser={setUser} />
        </div>
    );
}

export default App;
