import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import './index.css'
import React from 'react';
import Root from './App.tsx';

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);


//ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
