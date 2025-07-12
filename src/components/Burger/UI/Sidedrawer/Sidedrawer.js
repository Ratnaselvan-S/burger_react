import React from "react";

import Logo from "../../Logo/Logo";
import Navigationitems from "../Navigation/Navigationitems/Navigationitems";
import classess from './Sidedrawer.module.css'
import Backdrop from '../Backdrop/Backdrop'
import Auxi from "../../../../hoc/auxi";


const sidedrawer=(props)=>{
    let attachedsidedrwaer=[classess.Sidedrawer,classess.close];
    if(props.open)
    {
        attachedsidedrwaer=[classess.Sidedrawer,classess.open]

    }
    return (
    <Auxi>
    <Backdrop show={props.open} removeb={props.clicked}/>

    <div className={attachedsidedrwaer.join(' ')} onClick={props.clicked} >
   
    <div className={classess.Logo}>
        <Logo/>

    </div>
        <nav>
        <Navigationitems isauthenticated={props.isauth}/>

        </nav>
        
    </div>
    </Auxi>
);
}

export default sidedrawer;