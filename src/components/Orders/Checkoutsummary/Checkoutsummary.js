import React from "react";
import Burger from "../../Burger/burger";
import  classes from './Checkoutsummary.module.css'
import Button from "../../Burger/UI/Button/Button";

const cheskoutsummary=(props)=>{
    return(
        <div className={classes.Checkoutsummary}>
            <h1>We hope it taste well</h1>
            <div>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btntype="Danger" clicked={props.checkoutcancel}>CANCEL</Button>
            <Button btntype="Success" clicked={props.checkoutcontinue}>Continue</Button>
        </div>
    )
}

export default cheskoutsummary;