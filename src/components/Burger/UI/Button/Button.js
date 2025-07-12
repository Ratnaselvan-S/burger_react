import React from "react"
import classes from "./Button.module.css"

const button=(props)=>(

    <button className={[classes.Button,classes[props.btntype]].join(' ')} type={props.type} disabled={props.disabled} onClick={props.clicked}>{props.children}</button>

)


export default button;