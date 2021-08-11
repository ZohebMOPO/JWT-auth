import { useQuery } from '@apollo/client';
import React from 'react';
import { gql } from 'apollo-boost';

const App: React.FC = () => {
  const { data, loading } = useQuery(gql`
  {
  hello
  }
  `)
  if (loading) {
    return <>Loading....</>
  }
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
