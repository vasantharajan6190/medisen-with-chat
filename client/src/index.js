import React from 'react';
import ReactDOM from 'react-dom';
import App,{Contextvariables} from './App';
ReactDOM.render(
  <React.StrictMode>
  <Contextvariables>
    <App />
    </Contextvariables>
  </React.StrictMode>,
  document.getElementById('root')
);
