  import React,{Component} from "react";
  import Auxi from "../../hoc/auxi";
  import Burger from '../../components/Burger/burger'
  import Burgerbuildercontrols from "../../components/Burger/Buildcontrols/Buildcontrols"
  import Modal from "../../components/Burger/UI/Modals/Modal"
  import Orders from "../../components/Burger/Ordersummary/Orders";
  import axios from "../../axios-order";
  import Spinner from "../../components/Burger/UI/Spinner/Spinner";
  import Witherrorhandler from '../../hoc/witherrorhandler/witherrorhandler'
  import { connect } from "react-redux";
  import * as burgerbuilderaction from '../../store/actions/index'

 
  class Burgerbuilder extends Component{
    state={
      purchasing:false,
      loading:false,
      
    }
    componentDidMount(){
    
      this.props.oninitingredients()
    }

    updatebutton(ingredients)
    {
      const sum=Object.keys(ingredients).map(igkey=>{
        return ingredients[igkey]
      }).reduce((sum,el)=>{
        return sum+el;
      },0);
     return sum >0;
    }

   
  updatepurchasing=()=>{
    if(this.props.isauthenticated)
    {
      this.setState({purchasing:true});

    }else{
      this.props.onsetredirectpath('/checkout')
      this.props.history.push('/auth')
    }
  }

  removebackdrop=()=>{
    this.setState({purchasing:false});
  }

  continueorder=()=>{
    this.props.oninitpurchase()
    this.props.history.push({
      pathname:'/checkout'
    })
    
  }

      render() {
        const disabledkey={
          ...this.props.ing
        }
        for(let key in disabledkey)
        {
          disabledkey[key]=disabledkey[key] <=0;
        }

        let orderssumaary=null
        
        let burger= this.props.error?<div>Ingredients failed to load</div>:<Spinner/>;
        if(this.props.ing){

          burger=(
            <Auxi>
            <Burger ingredients={this.props.ing}/>
            
            <Burgerbuildercontrols ingredientsadded={this.props.oningredientsadded}
            ingredientsremoved={this.props.oningredientsremoved}
            disabledkey={disabledkey}
            price={this.props.price}
            updatebut={this.updatebutton(this.props.ing)}
            isAuth={this.props.isauthenticated}
            purchasing={this.updatepurchasing}/>
          </Auxi>
          )
          orderssumaary=<Orders ingredients={this.props.ing} price={this.props.price} cancel={this.removebackdrop}
        continue={this.continueorder}/>
        }
        if(this.state.loading)
          {
            orderssumaary=<Spinner/>
    
    
          }
        return (

          <Auxi>
            <Modal show={this.state.purchasing} removeb={this.removebackdrop}>
              {orderssumaary}
            </Modal>
            {burger}
          
          </Auxi>
        )
      }
  }
  const mapstore=state=>{
    return{
      ing:state.burgerbuilder.ingredients,
      price:state.burgerbuilder.totalprice,
      error:state.burgerbuilder.error,
      isauthenticated:state.auth.tokenid !==null
    }
  }

const mapdispatch=dispatch=>{
    return{
      oningredientsadded:(ingtype)=>{dispatch(burgerbuilderaction.addingredient(ingtype))},
      oningredientsremoved:(ingtype)=>{dispatch(burgerbuilderaction.removeingredient(ingtype))},
      oninitingredients:()=>{dispatch(burgerbuilderaction.initingredients())},
      oninitpurchase:()=>{dispatch(burgerbuilderaction.redirectfunction())},
      onsetredirectpath:(path)=>{dispatch(burgerbuilderaction.set_auth_path(path))}
    }
}

export default connect(mapstore,mapdispatch)(Witherrorhandler(Burgerbuilder,axios));