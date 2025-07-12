import React from "react"
import Burgerimage from '../../../assets/Images/burger-logo.png'
import classes from './Logo.module.css'

const logo=(props)=>(
    <div className={classes.Logo} onClick={props.Onclick}>
        <img src={Burgerimage} alt="My burger"/>
    </div>

);


export default logo;