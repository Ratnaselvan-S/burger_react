import React from "react"

import classes from './Modal.module.css'
import Auxi from "../../../../hoc/auxi";
import Backdrop from "../Backdrop/Backdrop";

const modal=(props)=>(
    <Auxi>
        <Backdrop show={props.show} removeb={props.removeb}/>
    <div className={classes.Modal}
    style={{
        transform:props.show ? 'translateY(0)' :'translateY(-100vh)',
        opacity:props.show?'1':'0'
    }}>
        <div>{props.children}</div>
    </div>
    </Auxi>
)
export default modal;