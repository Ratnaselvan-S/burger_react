import React, { Component } from "react";
import Button from "../../components/Burger/UI/Button/Button";
import classess from "./contactdata.module.css";
import axios from "../../axios-order";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";
import Input from "../../components/Burger/UI/input/input";
import { connect } from "react-redux";
import witherrorhandler from "../../hoc/witherrorhandler/witherrorhandler";
import * as orderbutton from "../../store/actions/index";
class Contact extends Component {
  state = {
    orderform: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      Postalcode: {
        elementType: "input",
        elementConfig: {
          type: "number",
          placeholder: "Postal code",
        },
        value: "",
        validation: {
          required: true,
          minlength: 2,
          maxlength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      DeliveryMethod: {
        elementType: "select",
        elementConfig: {
          type: "select",
          options: [
            { value: "Fastest", displayvalue: "Fastest" },
            { value: "Cheapest", displayvalue: "Cheapest" },
          ],
        },
        value: "Fastest",
        validation: {
          required: false,
        },
        valid: true,
        touched: true,
      },
    },
    formisvalid: false,
    loading: false,
  };

  checkformelement(value, rules) {
    let isvalid = true;
    if (rules.required) {
      isvalid = value.trim() !== "" && isvalid;
    }
    if (rules.minlength) {
      isvalid = value.length >= rules.minlength && isvalid;
    }
    if (rules.maxlength) {
      isvalid = value.length <= rules.maxlength && isvalid;
    }

    return isvalid;
  }

  clickedorder = () => {
    this.setState({ loading: true });
    const formdata = {};
    for (let formelement in this.state.orderform) {
      formdata[formelement] = this.state.orderform[formelement].value;
    }
    const postdata = {
      ingredients: this.props.ing,
      price: +parseFloat(this.props.price).toFixed(2),
      orders: formdata,
    };
    this.props.onordersubmit(postdata,this.props.token);
  };

  changedform = (event, inputfield) => {
    const updatedorderelement = { ...this.state.orderform };
    const updateelement = updatedorderelement[inputfield];
    updateelement.value = event.target.value;
    updateelement.valid = this.checkformelement(
      updateelement.value,
      updateelement.validation
    );
    updateelement.touched = true;
    updatedorderelement[inputfield] = updateelement;
    let formisvalid = true;
    for (let input in updatedorderelement) {
      formisvalid = updatedorderelement[input].valid && formisvalid;
    }
   
    this.setState({ orderform: updatedorderelement, formisvalid: formisvalid });
  };
  render() {
    let formdata = [];
    for (let key in this.state.orderform) {
      
      formdata.push({
        id: key,
        config: this.state.orderform[key],
      });
    }
    let spinner = (
      <form onSubmit={this.clickedorder}>
        {formdata.map((formelement) => (
          
          <Input
            key={formelement.id}
            elementtype={formelement.config.elementType}
            type={formelement.config.elementConfig.type}
            elementconfig={formelement.config.elementConfig}
            placeholder={formelement.config.elementConfig.placeholder}
            value={formelement.config.value}
            inputvalid={!formelement.config.valid}
            shouldevaluate={formelement.config.validation}
            touched={formelement.config.touched}
            changed={(event) => this.changedform(event, formelement.id)}
          />
        ))}
        <Button btntype="Success" disabled={!this.state.formisvalid}>
          Orders
        </Button>
      </form>
    );
    if (this.props.loading) {
      spinner = <Spinner />;
    }
    return (
      <div className={classess.Container}>
        <h4>Enter Your Contact Data</h4>
        {spinner}
      </div>
    );
  }
}

const mapstoretoprops = (state) => {
  return {
    ing: state.burgerbuilder.ingredients,
    price: state.burgerbuilder.totalprice,
    loading:state.order.loading,
    token:state.auth.tokenid
  };
};

const mapdispatchtoprops = (dispatch) => {
  return {
    onordersubmit: (orderdata,token) => {
      dispatch(orderbutton.ordersubmit(orderdata,token));
    },
  };
};
export default connect(
  mapstoretoprops,
  mapdispatchtoprops
)(witherrorhandler(Contact, axios));
