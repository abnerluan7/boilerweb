import React from 'react'
import ReactDOM from 'react-dom'
import Router from './routes/router'
import '~/main/config/i18nextSetup'

ReactDOM.render(
  <React.Fragment>
    <Router />
  </React.Fragment>,
  document.getElementById('root')
)
