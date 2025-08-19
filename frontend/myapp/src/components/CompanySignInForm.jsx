import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

function CompanySignInForm() {

    const [alert,setAlert]=useState(false);
    const [company, setCompany] = useState({
        image: "",
        name: "",
        code: "",
        description: "",
        password: "",
        numberOfStores: "",
    });

    const navigate = useNavigate();

    function handleInput(event) {
        const { name, value } = event.target;
        setCompany(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ));
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8000/cash_register/api/company/', {
            "image": company.image,
            "name": company.name,
            "code": company.code,
            "description": company.description,
            "password": company.password,
            "numberOfStores": company.numberOfStores,
        }).then(()=>{}).catch((err)=>{
            setAlert(true);
            console.log(err)
        })
        navigate("/");
    };

    if (alert) {
        return (
            <Alert variant="info" onClose={() => setAlert(false)} dismissible>
                <Alert.Heading>You got an error!</Alert.Heading>
                <p>
                    The entered code is already in use, all companies must have unique codes. Please try again.
                </p>
            </Alert>
        );
    }

    return <div>
        <Form className="light" style={{ padding: "2rem" }}>
            <h3>Register a new company</h3><br></br>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={company.name} onChange={handleInput} name="name"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Number of stores</Form.Label>
                    <Form.Control type="number" placeholder="Enter number" value={company.numberOfStores} onChange={handleInput} name="numberOfStores"/>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Short description of the company and its products" value={company.description} onChange={handleInput} name="description"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Image/Logo</Form.Label>
                <Form.Control placeholder="Enter image/logo" value={company.image} onChange={handleInput} name="image"/>
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Company Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter code" value={company.code} onChange={handleInput} name="code"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={company.password} onChange={handleInput} name="password"/>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="We agree to ERegister terms and pricings" id="term_checkbox"/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    </div>
}

export default CompanySignInForm