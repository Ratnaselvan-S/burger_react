import React from "react";
import classess from './Order.module.css'

const order = (props) => {
    const ingredient=[];

    for(let key in props.ingredients)
    {
        ingredient.push({ name:key,amount:props.ingredients[key]})
    }

    let ingredientoutput=ingredient.map(igkey=>{
        return <span key={igkey.name}>{igkey.name}({igkey.amount})</span>
    })
    

  return (<div className={classess.Orders}>
    <p>Ingredients for sale:{ingredientoutput}</p>
    <p>Price:<strong>USD {props.price}</strong></p>
  </div>
  )};

export default order;
