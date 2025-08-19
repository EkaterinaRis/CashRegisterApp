import React from "react";
import Nav from "react-bootstrap/Nav";

function PortfolioNavbar() {
    return <div id="myNavPortfolio">
        <Nav fill variant="tabs" defaultActiveKey={window.location.pathname}>
            <Nav.Item>
                <Nav.Link href="/products">Available Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/register">New Payment</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/bills">Previous Payments</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/workTime">Statistics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/productList">Product List</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/packages">Packages</Nav.Link>
            </Nav.Item>
        </Nav>
    </div>
}
export default PortfolioNavbar