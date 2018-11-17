import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Broadcaster from './broadcaster';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      <Route path="/" component={ App } />
      <Route path="/broadcast" component={ Broadcaster } />
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
