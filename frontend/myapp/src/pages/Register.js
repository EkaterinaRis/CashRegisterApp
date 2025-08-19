import React, { useContext, useState, useEffect } from "react";
import Portfolio from "../components/Portfolio";
import PortfolioNavbar from "../components/PortfolioNavbar";
import CardToBuy from "../components/CardToBuy";
import Bill from "../components/Bill";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import MySearch from "../components/MySearch";

function Register() {
  const { store } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [change, setChange] = useState(true);
  const [added, setAdded] = useState(false);
  const [deleteBill, setDeleteBill]=useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/cash_register/api/product/?store_id=${store.id}/`
        );
        const filtered = data.filter((x) => x.store_id === store.id);
        setAllProducts(filtered);
        setFilteredProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    loadProducts();
  }, [change, store.id]);

  function changeMade(toWhat) {
    setChange(toWhat);
  }

  return (
    <div>
      <Portfolio />
      <PortfolioNavbar />

      <div style={{ display: "flex" }}>
        <div style={{ minWidth: "70%", maxWidth: "70%" }}>
          <div style={{ margin: "2rem" }}>
            <MySearch
              allProducts={allProducts}
              setFilteredProducts={setFilteredProducts}
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "1rem" }}>
            {filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <CardToBuy
                  key={product.id}
                  card={product}
                  change={change}
                  changeMade={changeMade}
                  added={false}
                  deleteBill={deleteBill}
                />
              ))}
          </div>
        </div>

        <Bill change={change} changeMade={changeMade} setDeleteBill={setDeleteBill} deleteBill={deleteBill}/>
      </div>
    </div>
  );
}

export default Register;
