import React, {useState, useEffect} from 'react';
import './App.css';

import CardBox from "./CardBox";
import Menu from "./Menu";
import Boxes from "./Boxes";

function App() {

    const [user, setUser] = useState("");

    
    useEffect(() => {
    }, []);

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
    let content = (<p>Please log in!</p>);

    return (
        <div className="pane"
                 onKeyUp={handleKey}
                 tabIndex={0}>

            <Boxes activeBox={1}   />
               
                <div className="content">

                 { content }

                </div>

            <Menu />
            </div>
    );
}

export default App;
