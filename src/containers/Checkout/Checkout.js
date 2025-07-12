import React, { Component } from "react";
import Checkoutsummary from "../../components/Orders/Checkoutsummary/Checkoutsummary";
import Contact from "../Contactdata/contactdata";
import { Route,Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutcancel = () => {
    this.props.history.goBack();
  };

  checkoutcontinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let routeredirect=<Redirect to='/'/>
    
    if(this.props.ing)
    {
      const purchasedfun=this.props.purchased?<Redirect to='/'/> :null;
      routeredirect=(
        <div>
          {purchasedfun}
      <Checkoutsummary
        ingredients={this.props.ing}
        checkoutcancel={this.checkoutcancel}
        checkoutcontinue={this.checkoutcontinue}
      />
      <Route
        path="/checkout/contact-data"
        component={Contact}
      />
      </div>)
    }
    return routeredirect;
  }
}

const mapstoretoprops=state=>{
  return{
    ing:state.burgerbuilder.ingredients,
    price:state.burgerbuilder.totalprice,
    purchased:state.order.purchased
   
  }
}

export default connect(mapstoretoprops)(Checkout);
