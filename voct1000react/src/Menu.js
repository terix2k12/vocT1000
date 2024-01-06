import React, {useState, useEffect} from 'react';
import './Menu.css';
import {baseUrl} from './Tconfig';

function Menu({user, setUser, setAppState}) {

    function sendLogout() {
        fetch(baseUrl + 'logout')
        .then((response) => response.json())
        .then((data) => {
            if(data.info === "Logout successful!") {
                // alert('Login OK');
                setUser("");
                setAppState("signout");
            } else {
                alert('Logout failed.');
            }
        });
    }

    return (
        <div className="menuBox">
            <div className={  "disabledMenuItem"  }>All Cards</div>
            <div className={ user=== "" ? "activeMenuItem" : "inactiveMenuItem" } 
                onClick={ sendLogout }>
                { user === ""
                    ? "Login"
                    : "Logout" 
                }
            </div>
            <div className={ user=== "" ? "disabledMenuItem" : "inactiveMenuItem" }
                onClick={ () => setAppState("adding") }  
            >Add Card</div>
        </div>
    );

}

export default Menu;