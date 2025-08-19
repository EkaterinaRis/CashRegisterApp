import Portfolio from "../components/Portfolio";
import PortfolioNavbar from "../components/PortfolioNavbar";
import { MyEmployeeTable } from "../components/MyTable.tsx";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function WorkTime() {
    const { store, user } = useContext(AuthContext);
    const [workTime, setWorkTime] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadWork() {
            const data = await axios.get("http://localhost:8000/cash_register/api/workTime/?store_id=" + store.id + "/");
            const filtered=data.data.filter((x)=>x.store_id===store.id);
            if (data) setWorkTime(filtered);
        }
        loadWork();
    }, [])

    return <div>
        <Portfolio></Portfolio>
        <PortfolioNavbar></PortfolioNavbar>
        <div className="light" style={{textAlign:"center",padding:"3rem",minHeight:"40rem"}}>
            <h4>Worktime statistics in store</h4>
            <MyEmployeeTable data={workTime}></MyEmployeeTable>
        </div>
    </div>
}
export default WorkTime