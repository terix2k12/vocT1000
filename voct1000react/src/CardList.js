import React  from 'react';

function CardList( {allCards, setAppState, setActiveCard} ) {

    // const [front, setFront] = useState("");

    function doEdit(card) {
        setActiveCard(card);
        setAppState('adding');
    }

    function item(c) {
        return <tr>
            <td>{c.id}</td>
            <td>{c.front}</td>
            <td>{c.back}</td>
            <td><button onClick={() => doEdit(c)}>Edit</button></td>
        </tr>
    }

    return (
        <table border="1px solid green" >

            {allCards?.map(c => item(c) )??"No cards"}

        </table>
    );

}

export default CardList;