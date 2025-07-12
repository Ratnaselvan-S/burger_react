import React from "react";

import Navigationitem from "./Navigationitem/Navigationitem";
import classess from "./Navigationitems.module.css"


const navigationitems=(props)=>(
    <ul className={classess.Navigation}>
    <Navigationitem  links="/">Burger Builder</Navigationitem>
    {props.isauthenticated?<Navigationitem links="/Orders">Orders</Navigationitem>:null}

    {!props.isauthenticated?<Navigationitem links="/auth">Authentication</Navigationitem>:<Navigationitem links="/logout">Logout</Navigationitem>}
    </ul>
);

export default navigationitems;