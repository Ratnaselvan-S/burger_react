import React, { Component } from "react";
import Order from "../../components/Orders/Order";
import classes from "./Orders.module.css";
import axios from "../../axios-order";
import * as actiontypes from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";
import Witherrorhandler from "../../hoc/witherrorhandler/witherrorhandler";

class Orders extends Component {
  componentDidMount() {
    this.props.onorderfetch(this.props.tokenid);
  }
  render() {
    let spinner = <Spinner />;
    if (!this.props.loading) {
      spinner = (
        <div className={classes.Order}>
          {this.props.data.map((igdata) => (
            <Order
              ingredients={igdata.ingredients}
              key={igdata.id}
              price={igdata.price}
            />
          ))}
        </div>
      );
    }
    return spinner;
  }
}
const mapstoretoprops = (state) => {
  return {
    data: state.order.orders,
    loading: state.order.loading,
    tokenid:state.auth.tokenid

  };
};

const mapdispatch = (dispatch) => {
  return {
    onorderfetch: (token) => {
      dispatch(actiontypes.orderfetch(token));
    },
  };
};

export default connect(
  mapstoretoprops,
  mapdispatch
)(Witherrorhandler(Orders, axios));
