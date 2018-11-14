import React from 'react'
import { Chart, Axis, Series, Tooltip, Cursor, Line } from "react-charts";
import {
  compose, lifecycle
 } from 'recompose'
import './style.css'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {loadListToChart} from '../../redux/action'
import styled from 'styled-components'
import {Row,Col} from 'reactstrap'
import {isAdmin} from '../../lib'
import {ClipLoader} from 'react-spinners'
import withAdminCheck from '../../lib/hoc/withAdminCheck' 
import ImageUploader from 'react-images-upload';
import FileBase64 from 'react-file-base64'
const BoundChart = styled.div`
 width:500px;
 height:500px;
 background-color:white;
 border-style: solid;
`

const AdminPanel = ({
  history:{push},chart:{isLoading,data:{qtyPerDate}},isAdmin
}) => (
    <div className="container"> <br/>
  <Row>
    <Col>
        <div class="dropdown">
              <button class="dropbtn btn">Select</button>
              <div class="dropdown-content">
                  <a onClick={()=>push('/adminpanel/users')}>User</a>
                  <a onClick={()=>push('/adminpanel/bills')}>Bill</a>
                  <a onClick={()=>push('/adminpanel/products')}>Product</a>
              </div>
          </div>
    </Col></Row>
    <Row>
    <Col>
     <div className="container" style={{margin:"0 25%"}}><h1>ยอดขาย : วัน</h1>
      { isLoading ?  <ClipLoader
                      //   className={override}
                      sizeUnit={"px"}
                      size={150}
                      color={'#123abc'}
                      loading={true}
                      /> :
                      <Effect>
                   <BoundChart>
                       <Chart
                         data={[
                           {
                             label: "Series 1",
                             data: qtyPerDate
                           }
                         ]}
                         >
                         <Axis primary type="ordinal" />
                         <Axis type="linear" />
                         <Series type={Line} />
                         <Cursor primary />
                         <Cursor />
                         <Tooltip />
                     </Chart>
                   </BoundChart>
                         </Effect>
    }</div>
    </Col>
  </Row>
  <FileBase64
                            multiple={ true }
                            onDone={uri => console.log(uri)} 
                            />
  <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png']}
                maxFileSize={5242880}
                withPreview={true}
            />
  
  </div>
)
export default compose(
  withRouter,
  isAdmin,
  withAdminCheck,
connect(
  ({chart})=>({chart}),
  dispatch=>({
    loadList(){
      dispatch(loadListToChart())
    }
  })
),
  lifecycle({
    componentDidMount(){
       this.props.loadList()
    }
  })
)(AdminPanel)

const onDrop = (d,x) => console.log(x);

const Effect = styled.div`
-webkit-animation: roll-in-left 0.6s ease-out both;
animation: roll-in-left 0.6s ease-out both;
/* ----------------------------------------------
 * Generated by Animista on 2018-11-10 22:14:23
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation roll-in-left
 * ----------------------------------------
 */
@-webkit-keyframes roll-in-left {
  0% {
    -webkit-transform: translateX(-800px) rotate(-540deg);
            transform: translateX(-800px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}
@keyframes roll-in-left {
  0% {
    -webkit-transform: translateX(-800px) rotate(-540deg);
            transform: translateX(-800px) rotate(-540deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
}
`


