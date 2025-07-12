import React, { Component } from "react"
import Modal from "../../components/Burger/UI/Modals/Modal";
import Auxi from "../auxi";

const witherrorhandler=(Wrappedclass,axios)=>{
    
    return class extends Component{
        state={
            error:null
        }
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }
        
        errorconfirmhandler=()=>{
            this.setState({error:null})
        }
        render(){
            return(
                <Auxi>
                    <Modal show={this.state.error} removeb={this.errorconfirmhandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                <Wrappedclass {...this.props} />
                </Auxi>
            )
        }
        
    }
}

export default witherrorhandler;