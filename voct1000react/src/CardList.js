import React  from 'react';

function CardList( {allCards} ) {

    // const [front, setFront] = useState("");

    function item(c) {
        return <tr>
            <td>{c.id}</td>
            <td>{c.front}</td>
            <td>{c.back}</td>
            <td><button >Edit</button></td>
        </tr>
    }

    return (
        <table border="1px solid green" >

            {allCards?.map(c => item(c) )??"No cards"}

        </table>
    );

}

export default CardList;