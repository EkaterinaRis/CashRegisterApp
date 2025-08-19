import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Alert from 'react-bootstrap/Alert';

function StoreSignInForm(props) {

    const { company } = useContext(AuthContext);

    const [alert, setAlert] = useState(false);
    const [store, setStore] = useState({
        code: "",
        password: "",
        numberEmployees: "",
        numberOfCashRegisters: "",
        company_id: company.id,
    });

    const navigate = useNavigate();

    if(!company){
        navigate("/");
    }

    function handleInput(event) {
        const { name, value } = event.target;
        setStore(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const result = await axios.post('http://localhost:8000/cash_register/api/store/', {
            code: store.code,
            password: store.password,
            numberEmployees: store.numberEmployees,
            numberOfCashRegisters: store.numberOfCashRegisters,
            company_id: store.company_id,
        }).then((data) => {
            for (let i = 0; i < store.numberOfCashRegisters; i++) {
                axios.post('http://localhost:8000/cash_register/api/register/', {
                    used: false,
                    store_id: data.data.id
                });
            }
        }).catch((err) => {
            setAlert(true);
            console.log(err);
        })
        navigate("/getInStore");
    };

    if (alert) {
        return (
            <Alert variant="info" onClose={() => setAlert(false)} dismissible>
                <Alert.Heading>You got an error!</Alert.Heading>
                <p>
                    The entered code is already in use, all stores must have unique codes. Please try again.
                </p>
            </Alert>
        );
    }

    return <div>
        <Form className="light" style={{ padding: "2rem" }}>
            <h3>Add a store within your company</h3><br></br>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Store Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter code" value={store.code} onChange={handleInput} name="code" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={store.password} onChange={handleInput} name="password" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Number Employees</Form.Label>
                <Form.Control type="number" value={store.numberEmployees} onChange={handleInput} name="numberEmployees" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Number of cash registers</Form.Label>
                <Form.Control type="number" value={store.numberOfCashRegisters} onChange={handleInput} name="numberOfCashRegisters" />
            </Form.Group>

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="We agree to ERegister terms and pricings" id="term_checkbox" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    </div>
}

export default StoreSignInForm