import * as actiontypes from './actiontypes'
import axios from '../../axios-order'
export const addingredient=(name)=>{
    return{
        type:actiontypes.ADD_INGREDIENT,
        ingredient:name
    }
}

export const removeingredient=(name)=>{
    return{
        type:actiontypes.REMOVE_INGREDIENT,
        ingredient:name
    }
}

export const setingredient=(ingredients)=>
{
    return{
        type:actiontypes.SET_INGREDIENT,
        ingredient:ingredients
    }

}
export const erroringredients=()=>{
    return{
        type:actiontypes.ERROR_ONINGREDIENTS
    }
}

export const initingredients=()=>{
    return dispatch=>{
        axios.get("/ingredients.json").then(response=>{
             dispatch(setingredient(response.data))
            }).catch(error=>{
              dispatch(erroringredients())
            
            })
    }
}

        