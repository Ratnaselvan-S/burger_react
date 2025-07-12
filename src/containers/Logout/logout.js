import React,{Component} from "react";
import { connect } from "react-redux";
import * as actiontypes from '../../store/actions/index'
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class logout extends Component{
    componentDidMount()
    {
        this.props.onlogout()
    }
    render(){
        return <Redirect to="/"/>;
    }
}

const mapdispatchtoprops=(dispatch)=>{
    return{
        onlogout:()=>{dispatch(actiontypes.logout())}
    }
}

export default connect(null,mapdispatchtoprops)(logout);