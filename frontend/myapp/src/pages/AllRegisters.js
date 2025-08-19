import React, { useContext, useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AllRegisters(props) {

    const { register, registerlogin, company, store, registerlogout } = useContext(AuthContext);

    const [registers, setRegisters] = useState([]);
    const [numEmployees, setNumEmployees] = useState(0);
    const [change, setChange] = useState(false);

    let count = 0;

    const navigate = useNavigate();

    useEffect(() => {
        count = 0;

        async function getEmployees() {
            await axios.get('http://localhost:8000/cash_register/api/employee/')
                .then((data) => {
                    const employees = data.data;
                    const filtered = employees.filter((x) => x.store_id == store.id);
                    setNumEmployees(filtered.length);
                })
                .catch((error) => console.log(error))
        }

        async function loadRegisters() {
            const data = await axios.get('http://localhost:8000/cash_register/api/register/');
            const allRegisters = data.data;
            const ofInterest = allRegisters.filter((x) => (x.store_id === store.id));
            setRegisters(ofInterest);
        }

        loadRegisters();
        getEmployees();
    }, [change])

    function handleClick(register) {
        registerlogout();
        registerlogin(register);
        navigate("/checkIn");
    }

    function getRegisterCard(register) {
        count += 1;
        return <Card style={{ width: '25rem', margin: "1rem", background:(register.used) ? "#ec3434" : "#309473" }} className="mb-2" text={'white'}>
            <Card.Header as="h5">{(register.used) ? "Busy" : "Avaliable"}</Card.Header>
            <Card.Body>
                <Card.Title>Register {count}</Card.Title>
                <Card.Text>
                    Employees can not log in a busy register. Employee can not be logged in more then one register at the same time.
                </Card.Text>
                {!register.used && <Button variant="light" onClick={() => { handleClick(register) }}>Check in register</Button>}
            </Card.Body>
        </Card>
    }

    function handleClickHere() {
        navigate("/newEmployee");
    }

    function handleRequest() {
        navigate("/moreEmployees");
    }

    async function addingRegister() {
        await axios.patch('http://localhost:8000/cash_register/api/store/' + store.id + '/', {
            "numberOfCashRegisters": 1 + store.numberOfCashRegisters
        }).catch((error) => { console.log(error) })
        await axios.post('http://localhost:8000/cash_register/api/register/', {
            "used": false,
            "store_id": store.id
        }).then(() => { setChange(!change); })
            .catch((error) => { console.log(error) })
    }

    return <div>
        <div style={{ display: "flex" }} className="light">
            <div style={{display:"flex", justifyContent:"center", width:"50%"}}>
                <Image src={company.image} style={{maxHeight:"16rem"}}/>
            </div>
            <div style={{ color: "white", width: "50%", boxSizing: "border-box", padding: "2rem", }} className="blue">
                <h1>{company.name}</h1>
                <hr></hr>
                <div style={{ margin: "1rem 0rem" }}>
                    <p style={{ margin: "0px" }}>{company.description}</p>
                    <p style={{ margin: "0px" }}>Store: {store.code}</p>
                    <p style={{ margin: "0px" }}>Maximum number of employees: {store.numberEmployees}</p>
                </div>
                {(numEmployees < store.numberEmployees) && <Button onClick={handleClickHere} style={{ marginRight: "1rem" }}>Add new employee</Button>}
                {<Button onClick={handleRequest} style={{ marginRight: "1rem" }}>Request for more employees</Button>}
                {<Button onClick={addingRegister}>Add cash register</Button>}
            </div>
        </div>
        <div style={{ display: "flex", marginTop: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
            {(registers.length > 0) && registers.map((x) => getRegisterCard(x))}
        </div>
    </div>
}
export default AllRegisters