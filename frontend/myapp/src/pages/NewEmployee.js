import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function NewEmployee(props) {

    const {store}=useContext(AuthContext);

    const [alertMax, setAlertMaxEmployees] = useState(false);

    const now = new Date().toISOString();

    const [employee, setEmployee] = useState({
        name: "",
        surname: "",
        username: "",
        password: "",
        logedIn: false,
        start: now,
        register_id: 0,
        store_id: store.id,
    });

    const navigate = useNavigate();

    function handleInput(event) {
        const { name, value } = event.target;
        setEmployee(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        await axios.post('http://localhost:8000/cash_register/api/employee/', {
            "name": employee.name,
            "surname": employee.surname,
            "username": employee.username,
            "password": employee.password,
            "logedIn": employee.logedIn,
            "start": employee.start,
            "register_id": employee.register_id,
            "store_id": employee.store_id,
        }).then(() => { navigate("/allRegisters"); })
        .catch((error) => { setAlertMaxEmployees(true); })
    }

    if (alertMax) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
                <Alert variant="info" onClose={() => { setAlertMaxEmployees(false); navigate("/allRegisters") }} dismissible>
                    <Alert.Heading>You got an error!</Alert.Heading>
                    <p>
                        Try a different username.
                    </p>
                </Alert>
            </div>
        );
    }

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
        <Form className="light" style={{ padding: "2rem" }}>
            <h3>Add a new employee</h3><br></br>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={employee.name} onChange={handleInput} name="name" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="Enter surname" value={employee.surname} onChange={handleInput} name="surname" />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={employee.username} onChange={handleInput} name="username" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={employee.password} onChange={handleInput} name="password" />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="We agree to ERegister terms and pricings" id="term_checkbox" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    </div>
}
export default NewEmployee