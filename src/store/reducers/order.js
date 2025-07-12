import * as actiontypes from "../actions/actiontypes";

const initialstate = {
  orders: [],
  loading: false,
  purchased:false
};

const order = (state = initialstate, action) => {
  switch (action.type) {
    case actiontypes.REDIRECT_AFTER_PURCHASE:
        return{
            ...state,
            purchased:false

        }
    case actiontypes.PERFORM_ORDER_SUBMIT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actiontypes.PERFORM_ORDER_SUCCESS:
      const dataordered = {
        ...action.orderdata,
        id: action.orderid,
       
      };

      return {
        ...state,
        loading: false,
        purchased:true,
        orders: state.orders.concat(dataordered),
      };
    case actiontypes.ERROR_ON_SUBMIT:
      return {
        ...state,
        loading: false,
      };
    case actiontypes.ORDER_FETCH_START:
      return{
        ...state,
        loading:true
      }
    case actiontypes.ORDER_SUCCESS:
      return{
        ...state,
        orders:action.orders,
        loading:false
      }

    case actiontypes.ORDER_FAILURE:
      return{
        ...state,
        loading:false
      }
    default:
      return state;
  }
};

export default order;
