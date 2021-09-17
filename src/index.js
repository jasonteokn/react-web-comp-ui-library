import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import * as serviceWorker from

import App from './views/app/App'

import { Provider } from 'react-redux'

import store from './utils/slices/store'

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
)
