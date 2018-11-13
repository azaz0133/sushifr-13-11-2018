import React from 'react'
import ReactDOM from 'react-dom'
import App from './modules/App'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import './i18n'
import { configStore} from './lib'
import { WebGLRenderer } from 'three'


const renderer = new WebGLRenderer({antialias: true})
const store = configStore()


ReactDOM.render(
    <Router>
        <Provider store={store}>
        <App />
        </Provider>
    </Router>, 
    document.getElementById('root'))

if(module.hot){
    module.hot.accept('./modules/App',_=>{
        const NextApp = require('./modules/App').default
        ReactDOM.render(
            <Router>
                 <Provider store={store}>
                 <NextApp renderer={renderer} />,
                 </Provider>
            </Router>,
            document.getElementById('root')
          )
    })
}