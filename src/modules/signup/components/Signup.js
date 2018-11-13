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
import FileBase64 from 'react-file-base64';
import {
  withState,
  withHandlers,
  compose
 } from 'recompose'

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
             />
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

export default SignUp