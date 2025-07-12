import React, { Component } from 'react';
import Layout from './components/layout/layout';
import Burgerbuilder from './containers/BurgerBuilder/Burgerbuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route ,withRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/logout';
import { connect } from 'react-redux';
import * as actiontypes from './store/actions/index'


class App extends Component {
  componentDidMount(){
    this.props.onauthcheckout()
  }
  render() {
    return (
      <div >
        <Layout>
          <Route path='/' exact component={Burgerbuilder}/>
        </Layout>
        <Route path='/checkout'  component={Checkout}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/auth' component={Auth}/>
        <Route path="/logout" component={Logout}/>
       
      </div>
    );   
  }
}

const mapdispatchtoprops=(dispatch)=>{
  return{
    onauthcheckout:()=>{dispatch(actiontypes.authchekout())}
  }

}

export default withRouter(connect(null,mapdispatchtoprops)(App));

 