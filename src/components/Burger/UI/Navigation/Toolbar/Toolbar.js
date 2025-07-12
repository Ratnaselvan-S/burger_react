
import React from "react";
import classes from './Toolbar.module.css'
import Logo from "../../../Logo/Logo";
import Navigationitems from "../Navigationitems/Navigationitems";
const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <div onClick={props.updatetoolbar} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <Logo/>
        <nav className={classes.nav}>
           <Navigationitems isauthenticated={props.isauth}/>
        </nav>
    </header>
);


export default toolbar