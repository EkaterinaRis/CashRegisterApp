import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

function CompanyLogInForm(props) {

    const {company,companylogin,companylogout}=useContext(AuthContext);

    const [companies, setCompanies] = useState([]);
    const [alert, setAlert] = useState(false);
    const [logIn, setLogIn] = useState({
        code: "",
        password: "",
    });

    useEffect(() => {
        async function loadCompanies() {
            const data = await axios.get('http://localhost:8000/cash_register/api/company/');
            if (data) setCompanies(data.data);
        }
        loadCompanies();
    }, []);


    const navigate = useNavigate();

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
        const company = companies.filter((x) => x.code === logIn.code && x.password === logIn.password);
        if (company.length > 1 || company.length === 0) {
            setLogIn({
                code: "",
                password: "",
            })
            setAlert(true);
        } else {
            companylogout();
            companylogin(company[0]);
            navigate('/getInStore');
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
        <div style={{ padding: "2rem" }} className="light">
            <Form>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Company Code</Form.Label>
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
            <h1>Wellcome back</h1>
            <p>Your company in not registered?</p>
            <Button onClick={() => { navigate("/newCompany") }}>Register now</Button>
        </div>
    </div>
}

export default CompanyLogInForm