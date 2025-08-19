import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreLogInForm from "../components/StoreLogInForm";
import { AuthContext } from "../context/AuthContext";

function StoreLogIn(props) {

    const {company}=useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!company) {
            navigate('/');
        }
    },[])

    return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50rem"}}>
        <StoreLogInForm></StoreLogInForm>
    </div>
}
export default StoreLogIn