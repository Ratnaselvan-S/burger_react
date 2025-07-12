import * as actions from "../actions/actiontypes";
const initialstate = {
  ingredients: null,
  totalprice: 4,
  error:false,
  building:false
};

 const INGREDIENTS_PRICE={
    
    salad:0.3,
    cheese:0.5,
    bacon:0.9,
    meat:0.8
  }

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalprice:state.totalprice + INGREDIENTS_PRICE[action.ingredient],
        building:true
      };  
    case actions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
            ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalprice:state.totalprice - INGREDIENTS_PRICE[action.ingredient],
        building:true
      };
    case actions.SET_INGREDIENT:
      return{
        ...state,
        ingredients:action.ingredient,
        totalprice: 4,
        error:false,
        building:false
      }
    case actions.ERROR_ONINGREDIENTS:
      return{
        ...state,
        error:true
      }
    default:
      return state;
  }
};

export default reducer;
