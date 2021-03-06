import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </Router>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)