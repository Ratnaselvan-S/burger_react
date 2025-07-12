import React, { Component } from "react";
import Button from "../../components/Burger/UI/Button/Button";
import classes from "./Auth.module.css";
import Input from "../../components/Burger/UI/input/input";
import { connect } from "react-redux";
import * as actiont from "../../store/actions/index";
import Spinner from "../../components/Burger/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
class Auth extends Component {
  state = {
    Controls: {
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
      Password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "****",
        },
        value: "",
        validation: {
          required: true,
          minlength: 6,
          maxlength: 11,
        },
        valid: false,
        touched: false,
      },
    },
    formisvalid: false,
    issignup: true,
  };

  componentDidMount(){
    if(!this.props.buildingburger && this.props.authredirect !=="/")
    {

      this.props.onsetredirect()
    }
  }
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
  changedform = (event, inputfield) => {
    const updatedformelement = {
      ...this.state.Controls,
      [inputfield]: {
        ...this.state.Controls[inputfield],
        value: event.target.value,
        valid: this.checkformelement(
          event.target.value,
          this.state.Controls[inputfield].validation
        ),
        touched: true,
      },
    };
    let formisvalid = true;
    for (let input in updatedformelement) {
      formisvalid = updatedformelement[input].valid && formisvalid;
    }

    this.setState({ Controls: updatedformelement, formisvalid: formisvalid });
  };

  formsubmitted = (event) => {
    event.preventDefault();
    this.props.onsubmitting({
      email: this.state.Controls.email.value,
      password: this.state.Controls.Password.value,
      signup: this.state.issignup,
    });
  };

  signupvalidity = () => {
    this.setState((prevState) => {
      return { issignup: !prevState.issignup };
    });
  };

  render() {
    let formdata = [];
    for (let key in this.state.Controls) {
      formdata.push({
        id: key,
        config: this.state.Controls[key],
      });
    }
    let form = formdata.map((formelement) => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }
    let authredrect=null
    if(this.props.isauthenticated)
    {
      authredrect=<Redirect to={this.props.authredirect}/>
      
    }

    return (
      <div className={classes.Container}>
        {authredrect}
        <form onSubmit={this.formsubmitted}>
          {form}
          <p className={classes.Error}>
            {this.props.error ? this.props.error : null}
          </p>

          <Button btntype="Success">Submit</Button>
          <br />
          <Button btntype="Danger" type="button" clicked={this.signupvalidity}>
            Switch to {!this.state.issignup ? "Signup" : "Signin"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapstatetoprops = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isauthenticated:state.auth.tokenid !==null,
    buildingburger:state.burgerbuilder.building,
    authredirect:state.auth.authredirect
  };
};
const mapdispatchtostore = (dispatch) => {
  return {
    onsubmitting: (formdata) => {
      dispatch(actiont.auth(formdata));
    },
    onsetredirect:()=>{dispatch(actiont.set_auth_path("/"))}
  };
};

export default connect(mapstatetoprops, mapdispatchtostore)(Auth);
