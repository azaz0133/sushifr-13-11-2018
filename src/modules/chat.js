import { Widget, addResponseMessage ,toggleWidget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css'
import socketIOClient from 'socket.io-client'
import React from 'react'
import Axios from 'axios'
import CONSTANTS from '../constants'
import '../chat.css'

export default class Chat extends React.Component {

    constructor() {
        super()
    
        this.state = {
          input: '',
          message: [],
          endpoint: "http://localhost:9001" // เชื่อมต่อไปยัง url ของ realtime server
        }
      }

      componentDidMount() {
      
        this.response()
        addResponseMessage("Welcome to this awesome chat!");
      }

      handleNewUserMessage = (newMessage) => {
        this.setState({
            input:newMessage
        },_=>{
            this.send()
        })
        // Now send the message throught the backend API
        addResponseMessage(`${this.state.message[0] === undefined ? "server not start" : this.state.message[0] }`);
      }

      changeInput = (e) => {
        this.setState({ input: e.target.value })
      }

      send = (message) => {
        const { endpoint, input } = this.state
        const socket = socketIOClient(endpoint)
        socket.emit('sent-Admin', input)
        // this.setState({ input: '' })
      }

      response = () => {
        const { endpoint, message } = this.state
        const temp = message
        const socket = socketIOClient(endpoint)
        socket.on('new-message', (messageNew) => {
          temp.push(messageNew)
          this.setState({ message: temp })
        })
      }

    render(){

        return(
            <Widget 
            handleNewUserMessage={this.handleNewUserMessage}
            title={"Sushi Ngai Live Chat"}
            subtitle={"Customer can contact directly to Admin"}
            customLauncher={this.toggleWidget}
        />
        )
    }
}