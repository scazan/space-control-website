import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home/index';
import LiveStream from './views/LiveStream/index';
import CameraGrid from './views/CameraGrid/index';
import Test from './views/Test/App';
import './index.css';
// import registerServiceWorker from './registerServiceWorker';
// Setup Array shuffling prototype


const routing = (
  <Router>
    <Switch>
      <Route path="/grid" component={ CameraGrid } />
      <Route path="/stream" component={ LiveStream } />
      <Route path="/test" component={ Test } />
      <Route path="/" component={ Home } />
    </Switch>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root') as HTMLElement
);
// registerServiceWorker();
