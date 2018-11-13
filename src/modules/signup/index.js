import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import CONSTANTS from '../../constants'
import axios from 'axios'
import {withAuth} from '../../lib'
import FileBase64 from 'react-file-base64';
import {
 withState,
 withHandlers,

} from 'recompose'
import { compose } from 'redux';
import constants from '../../constants';

const SignUp = ({
 upPic,modal,toggle,closeModal,first_name, last_name, email, tel, username, password, address,Onchange,handleSubmit
}) => (
  <div>
        <Button color="danger" onClick={toggle}>Register</Button>
        <Modal isOpen={modal} >
          <ModalHeader toggle={closeModal}>SignUp</ModalHeader>
          <ModalBody>
            <Form>
            <FileBase64
                multiple={ true }
                onDone={ upPic} 
            /><br/><br/>
              <FormGroup row>
                <Label for="firstname" sm={2}>Firstname</Label>
                <Col sm={4}>
                  <Input
                    value = {first_name}
                    name="first_name"
                    placeholder=""
                    onChange={Onchange}
                  />
                </Col>
                <Label for="lastname" sm={2}>Lastname</Label>
                <Col sm={4}>
                  <Input
                     value = {last_name}
                    name="last_name"
                    placeholder=""
                    onChange={Onchange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Email</Label>
                <Col sm={4}>
                  <Input
                    type="email"
                    name="email"
                    placeholder=""
                    onChange={Onchange}
                  />
                </Col>
                <Label sm={2}>Tel</Label>
                <Col sm={4}>
                  <Input
                    type="tel"
                    name="tel"
                    placeholder=""
                    onChange={Onchange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} for="exampleText">Address</Label>
                <Col sm={10} >
                  <Input
                   type="textarea" 
                   name="address" 
                   onChange={Onchange} 
                   value = {address}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Username</Label>
                <Col sm={4}>
                  <Input
                    name="username"
                    placeholder=""
                    onChange={Onchange}
                  />
                </Col>
                <Label sm={2}>Password</Label>
                <Col sm={4}>
                  <Input
                    type="password"
                    name="password"
                    placeholder=""
                    onChange={Onchange}
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
            <Button color="secondary" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
)
export default compose(
  withAuth,
  withState('modal','setModal',false),
  withState('first_name','setFname',''),
  withState('last_name','setLname',''),
  withState('email','setEmail',''),
  withState('tel','setTel',''),
  withState('address','setAddress',''),
  withState('username','setUsername',''),
  withState('password','setPassword',''),
 withHandlers({

  upPic : ({setFname,setLname,setAddress}) => file => {
    axios.post(`${constants.API}/users/ocr`,{uri:file[0].base64}).then( ({data:{users}}) =>{
      const {firstNameEn,lastNameEn,address} = users
      setAddress(address)
      setFname(firstNameEn)
      setLname(lastNameEn)
    })
  },

  toggle : ({setModal,modal}) => _ => {
    setModal(!modal)
  },

  closeModal : ({setModal}) => _ => {
    setModal(false)
  },

  handleSubmit : ({ first_name, last_name, email, tel, username, password, address ,auth:{setToken}}) => _ => {
    if(first_name && last_name && email && tel && username && password && address !== ""){
    const  body = {
          first_name,
          last_name,
          email,
          address,
          tel,
          username,
          password
       }
     
    axios.post(`${CONSTANTS.API}/users/create`,body)
          .then( res => setToken(res.data.Authorization))
          .then( _ => window.location.href = '/')}
          else{
            alert("Please fill all blank")
          }
  },
  Onchange : ({setAddress,setFname,setLname,setEmail,setTel,setUsername,setPassword}) => e => {
     switch(e.target.name) {
       case 'first_name':
       setFname(e.target.value)
       break;
       case 'last_name':
       setLname(e.target.value)
       break;
       case 'username':
       setUsername(e.target.value)
       break;
       case 'password':
       setPassword(e.target.value)
       break;
       case 'email':
       setEmail(e.target.value)
       break;
       case 'tel':
       setTel(e.target.value)
       break;
       case 'address':
       setAddress(e.target.value)
       break;
     default:
       break;
   }     
  }
 })
)(SignUp)
