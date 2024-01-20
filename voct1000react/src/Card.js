import React from "react";
import './Card.css';

function Card({cardData, showBack}) {

    let content = <><p>No cards in box.</p></>;

    if (cardData) {
        content = <>
            {/*#{cardData.id}<br/>*/}
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    {cardData.front}
                </div>
                <div className="flip-card-back">
                    {cardData.back}
                </div>
            </div>
        </>
    }

    return (
            <div className={showBack
                   ? "flip-card flipped"
                   : "flip-card"}
            >
                {content}
            </div>
    );
}

export default Card;