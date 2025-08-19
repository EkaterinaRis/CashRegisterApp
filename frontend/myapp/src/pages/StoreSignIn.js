import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreSignInForm from "../components/StoreSignInForm";
import { AuthContext } from "../context/AuthContext";

function StoreSignIn(props) {

    const {company}=useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!company) {
            navigate('/');
        }
    }, [])

    return <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"50rem"}}>
        <StoreSignInForm></StoreSignInForm>
    </div>

}
export default StoreSignIn