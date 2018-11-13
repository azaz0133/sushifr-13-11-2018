import React from 'react'
import ReactTable from 'react-table'
import {
    compose,
    lifecycle,
  } from 'recompose'
  import {connect} from 'react-redux'
  import {
    loadUsers
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

const columns = [{
    Header: 'Id',
    accessor: 'id',
    maxWidth: 50,
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  }, {
    Header: 'name',
    maxWidth: 100,
    accessor: 'first_name' // String-based value accessors!
  },{
    Header: 'username',
    maxWidth: 100,
    accessor: 'username' // String-based value accessors!
  }, {
    Header: 'tel',
    maxWidth: 100,
    accessor: 'tel' // String-based value accessors!
  }, {
    Header: 'email',
    maxWidth: 140,
    accessor: 'email' // String-based value accessors!
  },{
    Header: 'address',
    accessor: 'address' // String-based value accessors!
  }
] // columns setting

const UsersTable = ({
  user:{items,isLoading},history:{goBack}
}) => {
    return(
      <div>
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
                        </div>  : <ReactTable
                                    data={items}
                                    columns={columns}
                                    SubComponent={ row => <div className="container">{row.original.products}</div>}/>
        }   
      </div>
    )  
}

export default compose(
  withRouter,
  withAdminCheck,
    connect(
        ({user})=>({user}),
        dispatch => ({
           loadUsers(){
             dispatch(loadUsers())
           }
        })
      ),
      lifecycle({
          componentDidMount(){
              this.props.loadUsers()
          }
      })
)(UsersTable)