import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import { AuthContext } from "../context/AuthContext";

function CardToBuy(props) {

    const { register } = useContext(AuthContext);
    const [added, setAdded] = useState(false);

    let card = props.card;

    useEffect(() => {
        setAdded(false);
    }, [props.deleteBill]);

    async function addInCard() {
        if (card.newPrice === card.price) {
            await axios.post("http://localhost:8000/cash_register/api/inCart/", {
                "register_id": register.id,
                "product_id": card.id,
                "code": card.code,
                "name": card.name,
                "price": card.price,
                "numberInstances": card.numItems
            })
        } else {
            await axios.post("http://localhost:8000/cash_register/api/inCart/", {
                "register_id": register.id,
                "product_id": card.id,
                "code": card.code,
                "name": card.name,
                "price": card.newPrice,
                "numberInstances": card.numItems
            })
        }
        props.changeMade(!props.change);
        setAdded(true);
    }

    return <Card style={{ maxWidth: "20em", background: "#efeeea", margin: "1rem" }}>
        <Card.Img variant="top" src={card.image} style={{ maxHeight: "25rem" }} />
        <Card.Body style={{ minHeight: "11rem" }}>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>{card.code}</Card.Text>
            <Card.Text>{card.description}</Card.Text>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {card.limitedEdition && <Card.Text style={{ textDecoration: "underline" }}>Limited edition</Card.Text>}
                {(card.price > card.newPrice) && <Card.Text style={{ color: "green", fontWeight: "bold" }}>Sale -{parseInt((100 - (card.newPrice / card.price) * 100))}%</Card.Text>}
            </div>
        </Card.Body>
        <Card.Footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <small>Avaliable items: {card.numItems}</small><br></br>
                {(card.price == card.newPrice) ? <small>Price: {card.price}den. </small> : <small>Price on sale: {card.newPrice}den. </small>}
            </div>
            {(!added) ? <Button style={{ height: "fit-content" }} onClick={addInCard}>Add in cart</Button> : <Button disabled="true">Added</Button>}
        </Card.Footer>
    </Card>

}
export default CardToBuy