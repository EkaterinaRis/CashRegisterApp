import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MyCard from "../components/Card";
import Portfolio from "../components/Portfolio";
import PortfolioNavbar from "../components/PortfolioNavbar";
import MySearch from "../components/MySearch";

function getCard(card) {
    return <MyCard card={card}></MyCard>
}

function Products() {
    const { store, company, user, register } = useContext(AuthContext);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadProducts() {
            try {
                const { data } = await axios.get(`http://localhost:8000/cash_register/api/product/?store_id=${store.id}/`);
                const filtered = data.filter((x) => x.store_id === store.id && x.numItems >= 0);
                setAllProducts(filtered);
                setFilteredProducts(filtered); 
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        }
        loadProducts();
    }, [store.id]);

    function wantToAddProducts() {
        navigate("/addProduct");
    }

    return (
        <div>
            <Portfolio />
            <hr style={{ color: "white", margin: "0rem" }} />
            <PortfolioNavbar />
            <div style={{
                color: "white",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "2rem"
            }}>
                <h2>Search for existing products or introduce a new one</h2>
                <div style={{ display: "flex" }}>
                    <MySearch
                        setFilteredProducts={setFilteredProducts}
                        allProducts={allProducts}
                    />
                    <Button onClick={wantToAddProducts}>Add new product</Button>
                </div>
            </div>

            <Row xs={1} md={2} className="g-4" style={{ margin: "2rem" }}>
                {filteredProducts.length > 0 && filteredProducts.map((x) => <MyCard key={x.id} card={x} />)}
            </Row>
        </div>
    );
}

export default Products