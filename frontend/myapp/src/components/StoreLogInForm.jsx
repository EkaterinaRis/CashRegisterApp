import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function StoreLogInForm(props) {

    const { company, store, storelogin, storelogout } = useContext(AuthContext);

    const [stores, setStores] = useState([]);
    const [alert, setAlert] = useState(false);
    const [fullOfStores, setFullOfStores] = useState(true);
    const [logIn, setLogIn] = useState({
        code: "",
        password: "",
    });

    const navigate = useNavigate();
    if (!company) {
        navigate("/");
    }


    useEffect(() => {
        async function loadStores() {
            const data = await axios.get('http://localhost:8000/cash_register/api/store/?company_id=' + company.id);
            const filtered=data.data.filter((x)=>x.company_id==company.id);
            if (data) setStores(filtered);
            if (filtered.length >= company.numberOfStores) setFullOfStores(false);
        }
        loadStores();
    }, []);


    function handleInput(event) {
        const { name, value } = event.target;
        setLogIn(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const store = stores.filter((x) => x.code === logIn.code && x.password === logIn.password);
        console.log(store);
        console.log(stores);
        if (store.length > 1 || store.length === 0) {
            setLogIn({
                code: "",
                password: "",
            })
            setAlert(true);
        } else {
            storelogout();
            storelogin(store[0]);
            navigate('/allRegisters');
        }
    };

    if (alert) {
        return (
            <Alert variant="info" onClose={() => setAlert(false)} dismissible>
                <Alert.Heading>You got an error!</Alert.Heading>
                <p>
                    Incorect code or password. Please try again.
                </p>
            </Alert>
        );
    }

    return <div style={{ display: "flex" }}>
        {(company==null)&&navigate("/")}
        <div style={{ padding: "2rem" }} className="light">
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Store Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter company code" onChange={handleInput} name="code" value={logIn.code} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleInput} name="password" value={logIn.password} />
                </Form.Group>
                <Button onClick={handleSubmit}>Log in</Button>
            </Form>
        </div>
        <div style={{ padding: "2rem" }} className="blue">
            <h1>Wellcome {company.name}</h1>
            <br></br>
            <p>Log in one of your existing stores.</p>
            {(fullOfStores) ? <Button onClick={() => { navigate("/newStore") }}>Add new store</Button> : <p>All stores have been registered</p>}
        </div>
    </div>
}

export default StoreLogInForm