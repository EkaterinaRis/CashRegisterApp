import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MyProductTable } from "../components/MyTable.tsx";
import Portfolio from "../components/Portfolio.jsx";
import PortfolioNavbar from "../components/PortfolioNavbar.jsx";

function ProductList() {
    const { store } = useContext(AuthContext);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

    }, [products])

    useEffect(() => {
        async function loadProducts() {
            const data = await axios.get("http://localhost:8000/cash_register/api/product/?store_id=" + store.id + "/");
            const filtered = data.data.filter((x) => x.store_id === store.id);
            if (data) setProducts(filtered);
        }
        loadProducts();
    }, [])

    return <div>
        <Portfolio></Portfolio>
        <PortfolioNavbar></PortfolioNavbar>
        <div className="dark" style={{ textAlign: "center", padding: "2rem", minHeight: "40rem" }}>
            <h4>Products in all store</h4>
            <MyProductTable data={products}></MyProductTable>
        </div>
    </div>
}
export default ProductList