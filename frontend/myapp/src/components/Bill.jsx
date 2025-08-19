import React, { use, useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/ListGroup";
import BillItem from "../components/BillItem";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Alert from 'react-bootstrap/Alert';

function Bill(props) {

    const { register, store, user } = useContext(AuthContext);
    const [inCart, setInCart] = useState([])
    const [total, setTotal] = useState(0)
    const [alert, setAlert] = useState(false);

    const now = new Date().toISOString();

    useEffect(() => {
        async function loadItems() {
            const data = await axios.get("http://localhost:8000/cash_register/api/inCart/?register_id" + register.id + "/");
            if (data) setInCart(data.data);
            let calculateTotal = 0;
            data.data.forEach((x) => {
                calculateTotal = calculateTotal + x.toBuy * x.price;
            });
            setTotal(calculateTotal);
        }
        loadItems();
    }, [props.change])

    async function makePayment() {
        let calculateTotal = 0;
        inCart.forEach((x) => {
            calculateTotal = calculateTotal + x.toBuy * x.price;
        });
        await axios.post("http://localhost:8000/cash_register/api/bill/", {
            "store_id": store.id,
            "employee_id": user.id,
            "time": now,
            "cost": calculateTotal,
            "products": {
                products: inCart
            }
        })
        for (let i = 0; i < inCart.length; i++) {
            await axios.patch("http://localhost:8000/cash_register/api/product/" + inCart[i].product_id + "/", {
                "numItems": inCart[i].numberInstances - inCart[i].toBuy
            })
        }
        setAlert(true);
        cancelPayment();
    }

    async function cancelPayment() {
        const arr = inCart.map((x) => x.id);
        for (let i = 0; i < arr.length; i++) {
            await axios.delete("http://localhost:8000/cash_register/api/inCart/" + arr[i] + "/");
        }
        props.changeMade(!props.change);
        props.setDeleteBill(!props.deleteBill);
    }

    function createItem(item) {
        return <BillItem item={item} change={props.change} changeMade={props.changeMade}></BillItem>
    }

    if (alert) {
        return (
            <Alert variant="success" onClose={() => setAlert(false)} dismissible style={{ width: "30%", margin: "1rem"}}>
                <div>
                    <Alert.Heading>Successfull payment</Alert.Heading>
                    <p>Thank you!</p>
                </div>
            </Alert>
        );
    }


    return <Card style={{ width: "30%", margin: "1rem" }}>
        <Card.Header>New payment</Card.Header>
        <Card.Body>
            <Card.Title>Selected products</Card.Title>
            <Card.Text>
                Add instances of a product in the buttons below.
            </Card.Text>
            <ListGroup variant="flush">
                {inCart.map(createItem)}
            </ListGroup>
        </Card.Body>
        <Card.Footer className="text-muted">Total sum to pay: {total}den.</Card.Footer>
        {(inCart.length > 0) && <div style={{ display: "flex", justifyContent: "center" }}><Button style={{ width: "fit-content", marginRight: "1rem" }} onClick={makePayment}>Make a payment</Button><Button style={{ width: "fit-content" }} onClick={cancelPayment}>Cancel payment</Button></div>}
    </Card>
}
export default Bill;