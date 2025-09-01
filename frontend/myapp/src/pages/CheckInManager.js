import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function CheckInManager(props) {

    const {user,userlogin,register,store,userlogout}=useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [alertAuth, setAuth] = useState(false);
    const [alert, setAlert] = useState(false);
    const [logIn, setLogIn] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        async function loadUsers() {
            const data = await axios.get('http://localhost:8000/cash_register/api/employee/')
            if (data) setUsers(data.data);
        }
        loadUsers();
    }, [])

    const navigate = useNavigate();
    const now = new Date().toISOString();

    function handleInput(event) {
        const { name, value } = event.target;
        setLogIn(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ));
    }

    async function updateUser(user) {
        await axios.patch('http://localhost:8000/cash_register/api/employee/' + user.id + '/', {
            "logedIn": true,
            "start": now,
        }).then(() => { console.log("updated") })
            .catch((error) => { console.log(error) })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const user = users.filter((x) => x.username === logIn.username && x.password === logIn.password && store.id === x.store_id);
        if (user.length === 1 && user[0].role === "cashier") {
            setLogIn({
                username: "",
                password: "",
            })
            setAuth(true);
        } else if (user.length > 1 || user.length === 0) {
            setLogIn({
                username: "",
                password: "",
            })
            setAlert(true);
        } else {
            userlogout();
            userlogin(user[0]);
            updateUser(user[0]);
            navigate('/products');
        }
    };

    if (alert) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
                <Alert variant="info" onClose={() => setAlert(false)} dismissible>
                    <Alert.Heading>You got an error!</Alert.Heading>
                    <p>
                        Incorect username or password. Please try again.
                    </p>
                </Alert>
            </div>
        );
    }

    if (alertAuth) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
                <Alert variant="info" onClose={() => setAuth(false)} dismissible>
                    <Alert.Heading>You got an error!</Alert.Heading>
                    <p>
                        You are not authorized. Only product managers allowed.
                    </p>
                </Alert>
            </div>
        );
    }

    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50rem" }}>
        <div style={{ display: "flex" }}>
            <div style={{ padding: "2rem" }} className="light">
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" onChange={handleInput} name="username" value={logIn.code} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleInput} name="password" value={logIn.password} />
                    </Form.Group>
                    <Button onClick={handleSubmit}>Log in</Button>
                </Form>
            </div>
            <div style={{ padding: "2rem" }} className="blue">
                <h1>Hallo, we wish you a productive day</h1>
            </div>
        </div>
    </div>
}
export default CheckInManager