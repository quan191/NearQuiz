import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import { initContract } from './utils'

import 'bootstrap/dist/css/bootstrap.min.css';

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <App />,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
