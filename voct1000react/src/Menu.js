import React from 'react';
import './Menu.css';

function Menu({config, user, setUser, setAppState, setActiveCard}) {

    function sendLogout() {
        fetch(config.baseUrl + 'logout')
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
         setAppState("allcards");
    }

    function getClass() {
       return user === "" ? "bottombox disabled" : "bottombox active"
    }

    return (
        <div className="menuBox">
            <div className={ getClass() }
                onClick={ showAllCards }
            >All Cards</div>
            <div className="bottombox active"
                onClick={ sendLogout }>
                { user === ""
                    ? "Login"
                    : "Logout" 
                }
            </div>
            <div className={ getClass() }
                onClick={ () => {
                    setActiveCard({});
                    setAppState("adding")
                } }
            >Add Card</div>
        </div>
    );

}

export default Menu;