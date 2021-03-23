import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)