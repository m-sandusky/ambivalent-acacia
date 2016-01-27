import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import App from './components/App';
import io from 'socket.io-client';
import {setState} from './action_creators';
import reduxStateEmitterMiddleware from './reduxStateEmitterMiddleware';
import {StudentContainer} from './components/student/StudentMain';
import EducatorLanding from './components/educator/EducatorLanding';
import {EducatorContainer} from './components/educator/EducatorMain';

// import {TestContainer} from './components/Test';

// Socket Connection to server
const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', function(state) {
  console.log('Received state from server!');
  console.log(state, 'state from server');
  store.dispatch(setState(state));
  // store.dispatch(setState({voting: true, hasVoted: true, tally: {thumbsUp: 2, thumbsDown: 1}}));
});

// Create redux store
const createStoreWithMiddleware = applyMiddleware(reduxStateEmitterMiddleware(socket))(createStore); 
const store = createStoreWithMiddleware(reducer);

// Sets up Routing
const routes = <Route component={App}>
  <Route path = '/' component={EducatorLanding} />
  <Route path = '/student' component={StudentContainer} />
  <Route path = '/educator' component={EducatorContainer} />
</Route>;

// Renders App to DOM
ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
