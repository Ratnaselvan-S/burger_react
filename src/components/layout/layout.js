import React, {Component} from "react";
import Auxi from "../../hoc/auxi"
import classes from './layout.module.css'; 
import Toolbar from '../Burger/UI/Navigation/Toolbar/Toolbar'
import Sidedrawer from "../Burger/UI/Sidedrawer/Sidedrawer";
import { connect } from "react-redux";
class Layout extends Component{
    state={
        Setsidedrawer:false
    }

    Updatesetsidedrawer=()=>{
        this.setState(prevState=>({
            Setsidedrawer:!prevState.Setsidedrawer 
        })) 
    }
    render(){
        return (
            <Auxi className={classes.Layout}>               
                <Toolbar    isauth={this.props.isauthenticated}  updatetoolbar={this.Updatesetsidedrawer}/>
                <Sidedrawer isauth={this.props.isauthenticated} open={this.state.Setsidedrawer} clicked={this.Updatesetsidedrawer} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
             
        
            </Auxi>
        
        );
    }
}

const mapstatetoprops=(state)=>{
    return{
        isauthenticated:state.auth.tokenid !==null
    }
}

export default  connect(mapstatetoprops)(Layout);