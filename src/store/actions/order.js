import axios from "../../axios-order"
import * as actiontypes from './actiontypes'
export const erroronsubmit=(error)=>{
    return{
        type:actiontypes.ERROR_ON_SUBMIT,
        error:error
    }
}



export const performodersuccess=(orderid,orderdata)=>{
    return {
        type:actiontypes.PERFORM_ORDER_SUCCESS,
        orderid:orderid,
        orderdata:orderdata
    }
}
export const performloadingoption=()=>{
    return{
        type:actiontypes.PERFORM_ORDER_SUBMIT_LOADING
    }
}

export const ordersubmit=(orderdata,token)=>{
    return dispatch=>{
        dispatch(performloadingoption())
        axios
      .post("/orders.json?auth="+token, orderdata)
      .then((response) => {
        dispatch(performodersuccess(response.data.name,orderdata))

       
      })
      .catch((error) => {
       dispatch(erroronsubmit(error))
      });
    }
}

export const redirectfunction=()=>{
    return{
        type:actiontypes.REDIRECT_AFTER_PURCHASE
    }
}



export const ordersucess=(orders)=>{
    return{
        type:actiontypes.ORDER_SUCCESS  ,
        orders:orders
    }
}


export const orderfailure=()=>{
    return{
        type:actiontypes.ORDER_FAILURE  
    }
}

export const fetchorderstart=()=>{
    return{
        type:actiontypes.ORDER_FETCH_START
    }
}

export const orderfetch=(token)=>{
    return dispatch=>{
        dispatch(fetchorderstart())
        axios.get('/orders.json?auth='+token).then(res=>{
            const fetcheddata=[]
            for(let key in res.data)
            {
                fetcheddata.push({
                    ...res.data[key],
                    id:key
                })
            }
           
            dispatch(ordersucess(fetcheddata))
        }).catch(err=>{
            dispatch(orderfailure())
        })
    }
}