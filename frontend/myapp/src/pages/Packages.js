import Portfolio from "../components/Portfolio";
import PortfolioNavbar from "../components/PortfolioNavbar";
import { MyPackageTable } from "../components/MyTable.tsx";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Packages() {

    const { store } = useContext(AuthContext);
    const [packages, setPackages] = useState([]);
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadProducts() {
            const dataProducts = await axios.get("http://localhost:8000/cash_register/api/product/?store_id=" + store.id + "/");
            const filteredProducts = dataProducts.data.filter((x) => x.store_id === store.id);
            if(dataProducts) setProducts(filteredProducts);

            const data = await axios.get("http://localhost:8000/cash_register/api/package/?store_id=" + store.id + "/");
            const filtered = data.data.filter((x) => x.store_id === store.id);
            const updatePackages = filtered.map((current) => {
                let product = filteredProducts.filter((x) => x.id === current.product_id);
                return {
                    ...current,
                    code: product[0].code,
                    name: product[0].name,
                    limitedEdition: product[0].limitedEdition,
                    price: product[0].price
                }
            });
            setPackages(updatePackages);
        }
        loadProducts();
    }, [])

    return <div>
        {console.log(packages)}
        <Portfolio></Portfolio>
        <PortfolioNavbar></PortfolioNavbar>
        <div className="dark" style={{ textAlign: "center", padding: "3rem", minHeight: "40rem" }}>
            <h4>Packages arrival in the store</h4>
            <MyPackageTable data={packages}></MyPackageTable>
        </div>
    </div>
}
export default Packages