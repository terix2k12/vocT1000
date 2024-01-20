import React, {useEffect, useState} from 'react';
import {baseUrl} from "./Tconfig";

function CardList( {setAppState, setActiveCard} ) {

    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [max, setMax] = useState(10);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCards();
    }, []);

    function loadCards() {
        fetch(baseUrl + 'card/between',
            {credentials: "include"})
            .then((response) => response.json())
            .then((data) => {
                setCards(data);
                setLoading(false);
            });
    }

    function doEdit(card) {
        setActiveCard(card);
        setAppState('adding');
    }

    function item(c) {
        return <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.front}</td>
            <td>{c.back}</td>
            <td><button onClick={() => doEdit(c)}>Edit</button></td>
        </tr>
    }

    function match(c) {
        if(
           c.front.toUpperCase().includes(search.toUpperCase()) ||
           c.back.toUpperCase().includes(search.toUpperCase())
        ) {
            console.log("Showing... " + c.id);
            return true;
        } else {
            console.log("Filtering... " + c.id);
            return false;
        }
    }

    function filter() {
        if(cards.length) {
            return cards
                .filter(c => match(c))
                .slice(0, max)
                .map(c => item(c))
            ;
        } else {
            return "No cards";
        }
    }

    function changeMax(event) {
        setMax(event.target.value)
    }

    function changeSearch(event) {
        setSearch(event.target.value)
    }

    return (<>
        <div>
            <input value={search} onChange={changeSearch} />
            <button onClick={loadCards}>Search</button>
            <button onClick={() => setSearch("")}>Clear</button>
        </div>
        {loading ? "Loading..." : (<table border="1px solid green">
            <tbody>
            { filter() }
            </tbody>
        </table>)}
        <div>
            {/*<ul>*/}
            {/*   <li><p> &lt; </p></li>*/}
            {/*   <li><p> 1 </p></li>*/}
            {/*   <li><p> 2 </p></li>*/}
            {/*   <li><p> 3 </p></li>*/}
            {/*   <li><p> &gt; </p></li>*/}
            {/*</ul>*/}
            <input type="number" value={max} onChange={changeMax} />
        </div>
    </>);

}

export default CardList;