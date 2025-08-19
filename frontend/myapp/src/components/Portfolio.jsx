import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Portfolio() {
    const { user, store, register, company, registerlogout, userlogout } = useContext(AuthContext);
    const now = new Date().toISOString();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await axios.patch(`http://localhost:8000/cash_register/api/employee/${user.id}/`, {
                logedIn: false,
            });

            console.log("Employee status updated");

            await axios.patch(`http://localhost:8000/cash_register/api/register/${register.id}/`, {
                used: false,
            });

            console.log("Register status updated");

            await axios.post('http://localhost:8000/cash_register/api/workTime/', {
                employee_id: user.id,
                start: user.start,
                end: now,
                store_id:store.id
            });

            console.log("Work time logged");

            userlogout();
            registerlogout();

            setTimeout(() => {
                navigate("/allRegisters");
            }, 200);
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        return () => {
        };
    }, []);

    if (!user || !register) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: "flex" }} className="light">
            <div style={{ display: "flex", justifyContent: "center", width: "50%" }}>
                <Image src={company.image} style={{ maxHeight: "16rem" }} />
            </div>
            <div style={{ color: "white", width: "50%", boxSizing: "border-box", padding: "2rem", }} className="blue">
                <h2 style={{textTransform:"capitalize"}}>In register: {user.name} {user.surname}</h2>
                <hr />
                <div style={{marginBottom:"1rem"}}>
                    <p style={{ margin: "0px" }}>Employee ID: {user.id}</p>
                    <p style={{ margin: "0px" }}>Username: {user.username}</p>
                    <p style={{ margin: "0px" }}>{company.name} store: {store.code}</p>
                    <p style={{ margin: "0px" }}>After your worktime ends please log out of the register.</p>
                </div>
                <Button onClick={handleLogOut}>Log out</Button>
            </div>
        </div>
    );
}

export default Portfolio;
