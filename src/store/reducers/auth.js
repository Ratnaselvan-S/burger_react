import * as actiontypes from '../actions/actiontypes'

const initialstate={
    tokenid:null,
    error:null,
    loading:false,
    userid:null,
    authredirect:"/"

}

const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case actiontypes.AUTH_START:
            return{
                ...state,
                loading:true,
                error:null
            }
        case actiontypes.AUTH_SUCCESS:
            return{
                ...state,
                loading:false,
                tokenid:action.tokenid,
                error:null,
                userid:action.userid
            }
        case actiontypes.AUTH_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error,
              
            }
        case actiontypes.AUTH_LOGOUT:
            return{
                ...state,
                tokenid:null,
                error:null,
                userid:null

            }
        case actiontypes.SET_AUTH_REDIRECT:
            return{
                ...state,
                authredirect:action.path
            }
        default:
            return state
    }
}

export default reducer;