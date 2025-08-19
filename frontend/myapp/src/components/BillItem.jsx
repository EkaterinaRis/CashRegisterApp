import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/esm/Button";
import axios  from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

function BillItem(props) {

    const [item,setItem]=useState(props.item);
    const [alert,setAlert]=useState(false);

    useEffect(()=>{
       
    },[item])

    async function addInstance(event){
        event.preventDefault();
        if(item.numberInstances>item.toBuy){
            await axios.patch("http://localhost:8000/cash_register/api/inCart/"+item.id+"/",{
                "toBuy":item.toBuy+1,
            });
            setItem({
                ...item,
                "toBuy":item.toBuy+1
            });
            props.changeMade(!props.change);
        }else{
            setAlert(true);
        }
    };

    async function removeInstance(event){
        event.preventDefault();
        if(0<item.toBuy){
            await axios.patch("http://localhost:8000/cash_register/api/inCart/"+item.id+"/",{
                "toBuy":item.toBuy-1,
            });
            setItem({
                ...item,
                "toBuy":item.toBuy-1
            });
            props.changeMade(!props.change);
        }else{
            setAlert(true);
        }
    };

    if (alert) {
        return (
            <Alert variant="info" onClose={() => setAlert(false)} dismissible>
                <Alert.Heading>You got an error!</Alert.Heading>
                <p>
                    There are no more items left from this product.
                </p>
            </Alert>
        );
    }

    return <ListGroup.Item>
        <Card.Footer style={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
            <div>
                <small>{item.name}</small><br></br>
                <small className="text-muted">Price per piece: {item.price}den.</small><br></br>
                <small className="text-muted">Number of pieces: {item.toBuy}</small>
            </div>
            <div>
                <Button onClick={removeInstance} style={{marginRight:"0.5rem"}}>Remove one</Button>
                <Button onClick={addInstance}>Add one</Button>
            </div>
        </Card.Footer>
    </ListGroup.Item>
}

export default BillItem;