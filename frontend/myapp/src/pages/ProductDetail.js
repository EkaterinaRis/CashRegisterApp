import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function getProduct(x) {
    return <div>
        <hr></hr>
        <div>
            <b>{x.name}</b>
            <p style={{ margin: "0px" }}>Code: {x.code}</p>
            <p style={{ margin: "0px" }}>Price: {x.price}den.</p>
            <p style={{ margin: "0px" }}>Number of items: {x.toBuy}</p>
        </div>
    </div>
}

function ProductDetail() {
    const location = useLocation();
    const myData = location.state;

    const navigate = useNavigate();
    const now = new Date().toISOString();

    const [alert, setAlert] = useState(false);

    async function handleRefund() {
        await axios.post("http://localhost:8000/cash_register/api/refund/", {
            ...myData,
            timeRefund: now
        });
        try {
            await axios.delete("http://localhost:8000/cash_register/api/bill/" + myData.id + "/");
        } catch (error) {
            console.error("Delete failed:", error.response?.data || error.message);
        }
        setAlert(true);
    }

    if (alert) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
                <Alert variant="success" onClose={() => navigate("/bills")} dismissible style={{ width: "30%", margin: "1rem" }}>
                    <div>
                        <Alert.Heading>Successfull refund. All items are returned.</Alert.Heading>
                    </div>
                </Alert>
            </div>
        );
    }

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
        <div style={{ display: "flex", alignItems: "stretch" }}>
            <div style={{ padding: "2rem" }} className="light">
                <h4>Products</h4>
                {myData.products.products.map((x) => getProduct(x))}
                <hr></hr>
                <b>Total price paid: {myData.cost}den.</b>
            </div>
            <div style={{ padding: "2rem" }} className="blue">
                {(myData.timeRefund) ? <h4>Refunded bill</h4> : <div>
                    <h4>Our company is customer friendly</h4>
                    <hr></hr>
                    <p>In case of returning items, products info will be updated <br></br> and the number of items will be increased accordingly. <br></br>The bill will be saved as refunded.  </p>
                    <b>All items will be returned.</b><br></br><br></br>
                    <Button onClick={handleRefund}>Return and refund items</Button>
                    <br></br>
                    <br></br>
                    <p>No change needed?</p></div>}
                <Button onClick={() => { navigate("/bills") }}>Go back</Button>
            </div>
        </div>
    </div>
}
export default ProductDetail