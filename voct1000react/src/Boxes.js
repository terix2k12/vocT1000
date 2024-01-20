import React from 'react';
import './Boxes.css';

function Boxes({activeBox, setBox, user}) {

    function calcClass(i) {
        if(user === "") {
            return "topbox disabled";
        }
        if(i === activeBox) {
            return "topbox active";
        } else {
            return "topbox inactive";
        }
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