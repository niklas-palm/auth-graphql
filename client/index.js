import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth'; // Lower case r because it's a "HOC" - higher order component.

const networkInterface = createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin'
    }
});

// All data fetched via the ApolloClient, i.e all data fetched via GraphQL
// passes through this function. It tells Apollo, who previously had no idea
// what kind of data that was pased throug, that the data object (o = object)
// is identified or has a unique identifier that is the id that the data contains.
// This enables Apollo to keep track of the data and updates queries automatically
// when there's a mutation. using this, we don't need the 'refetchQueries' or
// this.props.data.refetch() to update the data displayed when we mutate something
// in the database.
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requireAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
