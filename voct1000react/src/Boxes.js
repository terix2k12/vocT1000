import React, {useState, useEffect} from 'react';
import './Boxes.css';

function Boxes({activeBox, setBox}) {

    function calcClass(i) {
        if(i === activeBox) {
            return "activeBox";
        } else {
            return "inactiveBox";
        }
        return "disabledBox";
    }

    return (
        <div className="boxContainer">
            <div className={calcClass(1)} onClick={() => setBox(1)}>Box 1</div>
            <div className={calcClass(2)} onClick={() => setBox(2)}>Box 2</div>
            <div className={calcClass(3)} onClick={() => setBox(3)}>Box 3</div>
            <div className={calcClass(4)} onClick={() => setBox(4)}>Box 4</div>
            <div className={calcClass(5)} onClick={() => setBox(5)}>Box 5</div>
        </div>
    );

}

export default Boxes;