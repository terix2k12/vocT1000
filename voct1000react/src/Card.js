import React from "react";
import './Card.css';

function Card({cardData, showBack}) {

    let content = <><p>This box contains no cards.</p></>;

    if (cardData) {
        content = <>
            Card #{cardData.id}
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
        <div className="basic">
            <div className={showBack ? "flip-card flipped" : "flip-card"}>
                {content}
            </div>
        </div>
    );
}

export default Card;