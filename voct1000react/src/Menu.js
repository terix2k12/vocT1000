import React from 'react';
import './Menu.css';
import {baseUrl} from './Tconfig';

function Menu({user, setUser, setAppState, setAllCards}) {

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

    function showAllCards() {
        fetch(baseUrl + 'card/between',
            {credentials: "include"})
            .then((response) => response.json())
            .then((data) => {
                    setAllCards(data);
                    setAppState("allcards");
            });
    }

    function getClass() {
       return user === "" ? "activeMenuItem" : "inactiveMenuItem"
    }

    return (
        <div className="menuBox">
            <div className={ getClass() }
                onClick={ showAllCards }
            >All Cards</div>
            <div className={ getClass() }
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