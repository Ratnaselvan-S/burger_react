import React from 'react'
import classes from './Buildcontrols.module.css'
import Buildcontrol from './Buildcontrol/Buildcontrol';

const controls=[
    {label:'Salad',type:"salad"},
    {label:'Bacon',type:"bacon"},
    {label:'Cheese',type:"cheese"},
    {label:'Meat',type:"meat"}
];

const buildcontrols=(props)=>(
    <div className={classes.Buildcontrols}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {
            
            controls.map(ctrl=>(
            <Buildcontrol key={ctrl.label}  label={ctrl.label} added={()=>props.ingredientsadded(ctrl.type)}
            removed={()=>props.ingredientsremoved(ctrl.type)}disabled={props.disabledkey[ctrl.type]}/>
            ))
        }
        <button className={classes.OrderButton}disabled={!props.updatebut} onClick={props.purchasing}>{props.isAuth?"ORDER NOW":"SIGN UP TO ORDER"} </button>


    </div>
);


export default buildcontrols;