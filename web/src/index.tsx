import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
})

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,document.getElementById('root')
);