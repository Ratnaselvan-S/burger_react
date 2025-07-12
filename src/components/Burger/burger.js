import classes from './burger.module.css'
import Burgerbuilderingredient from './Burgerbuilderingredient/burgerbuilderingredient';
import React from 'react';
const burger=(props)=>{
    let transformedingredients=Object.keys(props.ingredients)
    .map(igkey=>{
        return [...Array(props.ingredients[igkey])]
        .map((_,i)=>{
            return <Burgerbuilderingredient key={igkey+i} type={igkey}/>
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)

    },[]);
    if(transformedingredients.length===0)
    {
        transformedingredients=<p>Please start to add ingredients</p>
    }
    return(
        <div className={classes.burger}>
            <Burgerbuilderingredient type="bread-top"/>
            {transformedingredients}
            <Burgerbuilderingredient type="bread-bottom"/>
        </div>
    )
}

export default burger;