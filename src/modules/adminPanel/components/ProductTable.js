import React from 'react'
import ReactTable from 'react-table'
import {
    compose,
    lifecycle,
  } from 'recompose'
  import {connect} from 'react-redux'
  import {
    loadProducts
  } from '../../../redux/action'
  import {ClipLoader} from 'react-spinners'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'
import withAdminCheck from '../../../lib/hoc/withAdminCheck'

const BACK = styled.div`
    background-color: red;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    position: relative;
    display: inline-block;
`
const Container = styled.div`
   width:500px;
`
const columns = [{
    Header: 'Id',
    accessor: 'id',
    maxWidth: 50,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'name',
    maxWidth: 250,
    accessor: 'name_en' // String-based value accessors!
  },{
    Header: 'quantity',
    maxWidth: 100,
    accessor: 'quantity' // String-based value accessors!
  }, {
    Header: 'price',
    maxWidth: 100,
    accessor: 'price' // String-based value accessors!
  }
] // columns setting

const ProductTable = ({
 product:{items,isLoading},history:{goBack}
}) => {
    return(
      <Container >
                    <BACK >
                        <button onClick={()=>goBack()} style={{backgroundColor:'red',border: "none"}}>Back</button>
                    </BACK>
          {isLoading ? 
                        <div className="container" 
                                style={{position: "fixed",
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
                        </div>  :              <ReactTable
                                                data={items}
                                                columns={columns}
                                                SubComponent=
                                                { row => <div className="container">{row.original.products}</div>}/>
                                  
        }   
      </Container>
    )  
}

export default compose(
    withRouter,
    withAdminCheck,
    connect(
        ({product})=>({product}),
        dispatch => ({
           loadProducts(){
             dispatch(loadProducts())
           }
        })
      ),
      lifecycle({
          componentDidMount(){
              this.props.loadProducts()
          }
      })
)(ProductTable)