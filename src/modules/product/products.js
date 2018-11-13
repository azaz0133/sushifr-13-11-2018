import React from 'react'
import {
 compose,
 withHandlers,
 lifecycle,
 withState,
 branch,
 renderComponent
} from 'recompose'
import {connect} from 'react-redux'
import ProductCard from './components/productCard'
import {loadProducts,saveProductToCart,deleteProduct} from '../../redux/action'
import Sidebar from './components/sidebar'
import {Row,Col} from 'reactstrap'
import {withRouter} from 'react-router-dom'
import './style.css'
import {ClipLoader, ClimbingBoxLoader} from 'react-spinners'
import  classNames  from 'classnames'
import Icon from '../../asset/IconSE2.jpg'

const Fetch = _ => (
    <div className="container" style={{position: "fixed",
                                        top: "50%",
                                        left:"50%",
                                        marginTop: "-50px",
                                        marginLeft: "-100px"}}>
            <ClipLoader
             //   className={override}
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={true}
            />
    </div>
    
)

const Products = ({
    items,filterByCatelog,add,addToCart,
    decrement,increment,qty,setCart,cart,user,
    deleteProduct,stylediv,toggle,category,categorybtn
}) => (
    <div className="container" ><br/>
            <button className={categorybtn()} onClick={toggle}>category</button>
            <h3 className="text-center">Product</h3>
           <Row style={{padding:"5%"}}>
               {filterByCatelog(items).map((data,i)=>(
                    <Col xs={12} lg={4} key={data.id}> 
                    <ProductCard {...data} add={add} addToCart={addToCart} qty ={qty[data.id]} user={user} cart={cart} setCart={setCart} deleteProduct = {deleteProduct}/>
                   </Col>
               )
               )}
            </Row>
            <div><button className="btn btn-info btn-lg btn3d btn-block" onClick={add}>Submit</button></div>
    <br/>
    
    <div id="wrapper" className={stylediv()} >
    <div id="sidebar-wrapper">
        <nav>
            <ul className="sidebar-nav nav"><br/>
            <li className="sidebar-brand">
                <div className="container"><img src={Icon} alt="sushi" style={{width: '50%'}} /></div>
                </li>
                <Sidebar {...category}/>
            </ul>
        </nav>
    </div>
</div>
    </div>
)

export default compose(
    withRouter,
    withState('isOpen','setOpen',false),
    withState('product',"setProduct",[]),
    withState('cart',"setCart",[]),
    withState('qty','setQty',[]),
    connect(
      ({product:{items,isLoading},user,category}) => ({items,isLoading,user,category}),
      (dispatch,props) => ({
          loadProducts(){
              dispatch(loadProducts())
          },
          add(){
            if(props.cart.length !== 0){
                 dispatch(saveProductToCart(props.cart))
                 props.history.push('/cart')
        }
            else alert("please choose menu first")
        },
        deleteProduct(id,e){
            e.preventDefault();
            dispatch(deleteProduct(id))
        },
      })
    ),
    withHandlers({
        toggle: ({setOpen,isOpen}) => _ => {
            setOpen(!isOpen)
        },
        filterByCatelog: ({match:{params}}) => items =>{
        let filtered = items.filter( data => data['categories_id']['id'] == params.id)
        return filtered
        },
        stylediv: ({isOpen}) => () =>{
            return classNames({ "active": isOpen == true},"")
        },
        categorybtn: ({isOpen}) => () =>{
            return classNames("btn btn-info",{"hambur": isOpen == true},{"hamburclick": isOpen == false})
        }
    }),
    lifecycle({
        async componentDidMount(){
          await  this.props.loadProducts()
        }
    }),
    branch(
        ({isLoading}) => !isLoading,
         renderComponent(Products),
         renderComponent(Fetch)
    )
)(Products)