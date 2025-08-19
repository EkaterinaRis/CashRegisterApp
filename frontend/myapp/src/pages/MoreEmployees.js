import axios from "axios";
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function MoreEmployees() {

    const { store, storelogin, storelogout } = useContext(AuthContext);

    const [temp, setTemp] = useState({
        numberEmployees: 0
    });

    const navigate = useNavigate();

    function handleInput(event) {
        const { name, value } = event.target;
        setTemp(prevValue => (
            {
                ...prevValue,
                [name]: Number(value)
            }
        ));
    }

    async function handleSubmit() {
        await axios.patch('http://localhost:8000/cash_register/api/store/' + store.id + '/', {
            "numberEmployees": temp.numberEmployees + store.numberEmployees
        }).then(() => {
            storelogout();
            storelogin({
                ...store,
                "numberEmployees": temp.numberEmployees + store.numberEmployees
            });
            navigate("/allRegisters")
        }).catch((error) => { console.log(error) });
    }

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
        <Form className="light" style={{ padding: "2rem" }}>
            <h3>Request for increase in the maximum number of employees in the store</h3>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Number of new employees</Form.Label>
                <Form.Control type="number" placeholder="Enter number" onChange={handleInput} name="numberEmployees" value={temp.numberEmployees} />
            </Form.Group>
            <Button onClick={handleSubmit}>Add</Button>
        </Form>
    </div>
}
export default MoreEmployees