import React, { useContext, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/esm/Button";
import Alert from 'react-bootstrap/Alert';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Form from 'react-bootstrap/Form';

function MyCard(props) {

    const { store, user } = useContext(AuthContext);
    const now = new Date().toISOString();
    const [deliver, setDeliver] = useState(false);
    const [howMany, setHowMany] = useState(0);
    const [newPrice, setNewPrice] = useState(0);
    const [sale,setSale]=useState(0);
    const [success, setSuccess] = useState(false);
    const [successPrice, setSuccessPrice] = useState(false);
    const [successSale,setSuccessSale]=useState(false);
    const [card, setCard] = useState(props.card)

    useEffect(() => { }, [success, successPrice])

    function delivery() {
        setDeliver(true);
        setNewPrice(0);
        setHowMany(0);
        setSale(0);
    }

    function handleInput(event) {
        const { name, value } = event.target;
        setHowMany(value);
    }

    function handleSale(event){
        const { name, value } = event.target;
        setSale(value);
    }

    function handleNewPrice(event) {
        const { name, value } = event.target;
        setNewPrice(value);
    }

    async function handlePackage() {
        await axios.post("http://localhost:8000/cash_register/api/package/", {
            "store_id": store.id,
            "product_id": card.id,
            "employee_id": user.id,
            "items": howMany,
            "time": now
        })
        await axios.patch("http://localhost:8000/cash_register/api/product/" + card.id + "/", {
            "numItems": Number(card.numItems) + Number(howMany)
        })
        const data = await axios.get("http://localhost:8000/cash_register/api/product/" + card.id + "/");
        if (data) setCard(data.data);
        setSuccess(true);
    }

    async function handleChangePrice() {
        if (Number(newPrice) > card.price) {
            await axios.patch("http://localhost:8000/cash_register/api/product/" + card.id + "/", {
                "newPrice": Number(newPrice),
                "price": Number(newPrice)
            })
        } else {
            await axios.patch("http://localhost:8000/cash_register/api/product/" + card.id + "/", {
                "newPrice": Number(newPrice)
            })
        }
        const data = await axios.get("http://localhost:8000/cash_register/api/product/" + card.id + "/");
        if (data) setCard(data.data);
        setSuccessPrice(true);
    }

    async function handleSetSale() {
        let calculatePrice=parseInt(card.price-((sale/100)*card.price))
        if (calculatePrice > card.price) {
            await axios.patch("http://localhost:8000/cash_register/api/product/" + card.id + "/", {
                "newPrice": calculatePrice,
                "price": calculatePrice
            })
        } else {
            await axios.patch("http://localhost:8000/cash_register/api/product/" + card.id + "/", {
                "newPrice": calculatePrice
            })
        }
        const data = await axios.get("http://localhost:8000/cash_register/api/product/" + card.id + "/");
        if (data) setCard(data.data);
        setSuccessSale(true);
    }

    if (deliver) {
        return (
            <>
                <Alert style={{ display: "flex", maxWidth: "40em" }}>
                    <Card style={{ maxWidth: "20em", background: "#efeeea", minWidth: "17em" }}>
                        <Card.Img variant="top" src={card.image} style={{ maxHeight: "25rem" }} />
                        <Card.Body style={{ minHeight: "11rem" }}>
                            <Card.Title>{card.name}</Card.Title>
                            <Card.Text>{card.code}</Card.Text>
                            <Card.Text>{card.description}</Card.Text>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                {card.limitedEdition && <Card.Text style={{ textDecoration: "underline" }}>Limited edition</Card.Text>}
                                {(card.price > card.newPrice) && <Card.Text style={{ color: "green", fontWeight: "bold" }}>Sale -{parseInt((1 - card.newPrice / card.price) * 100)}%</Card.Text>}
                            </div>
                        </Card.Body>
                        <Card.Footer style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                            <div>
                                <small className="text-muted">Avaliable items: {card.numItems}</small><br></br>
                                <small className="text-muted">Maximum items: {card.maxItems}</small><br></br>
                                <small className="text-muted">Minimum items: {card.minItems}</small>
                            </div>
                            <div>
                                {(card.price == card.newPrice) ? <small>Price: {card.price}den. </small> : <div><small style={{ textDecoration: "line-through" }}>Price: {card.price}den. </small><br></br><small>Price on sale: {card.newPrice}den. </small></div>}
                            </div>
                        </Card.Footer>
                    </Card>
                    <div style={{ maxWidth: "17em", marginLeft: "2rem" }}>
                        <Alert.Heading>New delivery</Alert.Heading>
                        <p>
                            When there is a new delivery add the correct number of new items at the right product.
                        </p>
                        <hr />
                        {(success) ? <Alert.Heading>Successfully added items</Alert.Heading> : <div>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Number of new items arrived</Form.Label>
                                <Form.Control type="number" value={howMany} onChange={handleInput} name="number" min={0}/>
                            </Form.Group>
                            <Button onClick={handlePackage}>
                                Add in store
                            </Button>  </div>
                        }
                        <hr />
                        {(successPrice) ? <Alert.Heading>Successfully changed price</Alert.Heading> : <div>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Change price manualy in denars</Form.Label>
                                <Form.Control type="number" value={newPrice} onChange={handleNewPrice} name="price" min={0} />
                            </Form.Group>
                            <Button onClick={handleChangePrice}>
                                Change price
                            </Button>  </div>
                        }
                        <hr />
                        {(successSale) ? <Alert.Heading>Successfully set sale</Alert.Heading> : <div>
                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Set sale in %</Form.Label>
                                <Form.Control type="number" value={sale} onChange={handleSale} name="sale" min={0} max={100} />
                            </Form.Group>
                            <Button onClick={handleSetSale}>
                                Set sale
                            </Button> </div>
                        }
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => { setDeliver(false); setSuccessPrice(false); setSuccess(false); setSuccessSale(false); }}>
                                Close options
                            </Button>
                        </div>
                    </div>
                </Alert>
            </>
        );
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
        <Card.Footer style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
            <div>
                <small className="text-muted">Avaliable items: {card.numItems}</small><br></br>
                <small className="text-muted">Maximum items: {card.maxItems}</small><br></br>
                <small className="text-muted">Minimum items: {card.minItems}</small>
            </div>
            <div>
                {(card.price == card.newPrice) ? <small>Price: {card.price}den. </small> : <div><small style={{ textDecoration: "line-through" }}>Price: {card.price}den. </small><br></br><small>Price on sale: {card.newPrice}den. </small></div>}
            </div>
        </Card.Footer>
        <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={delivery}>Add items or change price</Button>
        </Card.Footer>
    </Card>
}

export default MyCard;