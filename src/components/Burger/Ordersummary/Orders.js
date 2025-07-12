import React from "react";
import Auxi from "../../../hoc/auxi";
import Button from '../UI/Button/Button';

const Orders = (props) => {
    const ordersummary = Object.keys(props.ingredients).map(igkey => {
        return <li key={igkey}>{igkey}: {props.ingredients[igkey]}</li>;
    });
     

    return (
        <Auxi>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ordersummary}
            </ul>
            <p>Continue to checkout?</p>
            <h3><strong>Total price: {props.price.toFixed(2)}</strong></h3>
            <Button btntype="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btntype="Success" clicked={props.continue}>CONTINUE</Button>
        </Auxi>
    );
}

export default Orders;
