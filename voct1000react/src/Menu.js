import React, {useState, useEffect} from 'react';
import './Menu.css';

function Menu() {

    return (
        <div className="menuBox">
            <div className="inactiveMenuItem">All Cards</div>
            <div className="activeMenuItem">Login</div>
            <div className="disabledMenuItem">Add Card</div>
        </div>
    );

}

export default Menu;