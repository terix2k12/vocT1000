import React from "react";

function Card({cardData, showBack}) {
    return (
        <div className="basic">

            <div className={showBack ? "flip-card flipped" : "flip-card"}>
                Card #{cardData.id}
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        {cardData.front}
                    </div>
                    <div className="flip-card-back">
                        {cardData.back.split("").reverse().join("")}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Card;