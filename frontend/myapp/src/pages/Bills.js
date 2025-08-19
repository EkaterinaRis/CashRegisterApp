import Portfolio from "../components/Portfolio";
import PortfolioNavbar from "../components/PortfolioNavbar";
import { MyBillTable, MyRefundTable } from "../components/MyTable.tsx";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Bills() {

    const { store } = useContext(AuthContext);
    const [bills, setBills] = useState([]);
    const [refund,setRefund]=useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadBills() {
            const data = await axios.get("http://localhost:8000/cash_register/api/bill/?store_id=" + store.id + "/");
            const filtered = data.data.filter((x) => x.store_id === store.id);
            if (data) setBills(filtered);
        }
        loadBills();
        async function loadRefund() {
            const data = await axios.get("http://localhost:8000/cash_register/api/refund/?store_id=" + store.id + "/");
            const filtered = data.data.filter((x) => x.store_id === store.id);
            if (data) setRefund(filtered);
        }
        loadRefund();
    }, [])

    return <div>
        <Portfolio></Portfolio>
        <PortfolioNavbar></PortfolioNavbar>
        <div className="light" style={{ textAlign: "center", padding: "3rem", minHeight: "40rem" }}>
            <h4>Previous payments in the store</h4>
            <MyBillTable data={bills}></MyBillTable>
            <br></br><br></br>
            <h4>Refunded bills</h4>
            <MyRefundTable data={refund}></MyRefundTable>
        </div>
    </div>
}
export default Bills