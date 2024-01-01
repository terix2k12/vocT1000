import React, {useState, useEffect} from 'react';
import './Boxes.css';

function Boxes() {

    return (
            <div className="boxContainer">
                <div className={activeBox == 1 ? "activeBox" : "inactiveBox"} onClick={() => setBox(1)}>Box 1</div>
                <div className={activeBox == 2 ? "activeBox" : "inactiveBox"} onClick={() => setBox(2)}>Box 2</div>
                <div className={activeBox == 3 ? "activeBox" : "inactiveBox"} onClick={() => setBox(3)}>Box 3</div>
                <div className={activeBox == 4 ? "activeBox" : "inactiveBox"} onClick={() => setBox(4)}>Box 4</div>
                <div className={activeBox == 5 ? "activeBox" : "inactiveBox"} onClick={() => setBox(5)}>Box 5</div>
            </div>
                )
        ;
}

export default Boxes;