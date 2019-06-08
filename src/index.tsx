import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/Home/index';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      <Route path="/" component={ Home } />
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
