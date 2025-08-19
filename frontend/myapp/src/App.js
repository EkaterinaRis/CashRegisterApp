import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyLogIn from "./pages/CompanyLogIn";
import CompanySignIn from "./pages/CompanySignIn";
import StoreLogIn from "./pages/StoreLogIn";
import StoreSignIn from "./pages/StoreSignIn";
import AllRegisters from "./pages/AllRegisters";
import CheckIn from "./pages/CheckIn";
import NewEmployee from "./pages/NewEmployee";
import MoreEmployees from "./pages/MoreEmployees";
import Products from "./pages/Products";
import AddingProduct from "./pages/AddingProduct";
import Register from "./pages/Register";
import Bills from "./pages/Bills";
import WorkTime from "./pages/WorkTime";
import ProductList from "./pages/ProductList";
import Packages from "./pages/Packages";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<CompanyLogIn/>}/>
          <Route path="/newCompany" element={<CompanySignIn/>}/>
          <Route path="/getInStore" element={<StoreLogIn/>}/>
          <Route path="/newStore" element={<StoreSignIn />}/>
          <Route path="/allRegisters" element={<AllRegisters/>}/>
          <Route path="/checkIn" element={<CheckIn/>}/>
          <Route path="/newEmployee" element={<NewEmployee/>}/>
          <Route path="/moreEmployees" element={<MoreEmployees/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/addProduct" element={<AddingProduct/>}/>
          <Route path="/register" element={<Register></Register>}/>
          <Route path="/bills" element={<Bills></Bills>}/>
          <Route path="/workTime" element={<WorkTime></WorkTime>}/>
          <Route path="/productList" element={<ProductList></ProductList>}/>
          <Route path="/packages" element={<Packages></Packages>}/>
          <Route path="/productDetail" element={<ProductDetail></ProductDetail>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


