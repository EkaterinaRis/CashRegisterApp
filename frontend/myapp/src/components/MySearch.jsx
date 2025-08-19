import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function MySearch({ setFilteredProducts, allProducts }) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredProducts(allProducts); // Reset to full list
            return;
        }

        const debounceTimeout = setTimeout(() => {
            const filtered = allProducts.filter((item) =>
                item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.code?.includes(searchTerm)
            );
            setFilteredProducts(filtered);
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm, allProducts]);

    return (
        <div style={{ marginRight: "1rem" }}>
            <input
                type="text"
                placeholder="Search item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px', width: '25rem', borderRadius: "5px" }}
            />
        </div>
    );
}


export default MySearch;
