import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { AuthContext } from "../context/AuthContext";

function AddingProduct(props) {

    const {store}=useContext(AuthContext);

    const [product, setProduct] = useState({
        store_id: store.id,
        image: "",
        name: "",
        code: "",
        price: "",
        limitedEdition: "true",
        description: "",
        maxItems: "",
        minItems: "",
        numItems: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(product);
        axios.post('http://localhost:8000/cash_register/api/product/', {
            "store_id": product.store_id,
            "image": product.image,
            "name": product.name,
            "code": product.code,
            "price": product.price,
            "limitedEdition": product.limitedEdition,
            "description": product.description,
            "maxItems": product.maxItems,
            "minItems": product.minItems,
            "numItems": product.numItems,
            "newPrice": product.price
        });
        setProduct({
            store_id: store.id,
            image: "",
            name: "",
            code: "",
            price: "",
            limitedEdition: "",
            description: "",
            maxItems: "",
            minItems: "",
            numItems: ""
        })
        navigate("/products");
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setProduct(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ));
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
            <Form className="light" style={{ padding: "2rem" }}>
                <h3>Adding new product</h3>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} value={product.name}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Barcode</Form.Label>
                        <Form.Control type="text" name="code" placeholder="Enter barcode" onChange={handleChange} value={product.code}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control placeholder="Description" type="text" name="description" onChange={handleChange} value={product.description}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Image</Form.Label>
                    <Form.Control placeholder="Image link" type="text" name="image" onChange={handleChange} value={product.image}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" onChange={handleChange} value={product.price} min={0}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Limited edition</Form.Label>
                        <Form.Select defaultValue="True" name="limitedEdition" onChange={handleChange}>
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Avaliable pieces</Form.Label>
                        <Form.Control type="number" name="numItems" value={product.numItems} onChange={handleChange} min={0}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Maximum pieces</Form.Label>
                        <Form.Control type="number" name="maxItems" value={product.maxItems} onChange={handleChange} min={0}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Minimum pieces</Form.Label>
                        <Form.Control type="number" name="minItems" value={product.minItems} onChange={handleChange} min={0}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Confirm" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
export default AddingProduct;