import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import './App.css';

function App() {
  const [approvals, setApproval] = useState([]);

  const QueryURL = "https://api.studio.thegraph.com/query/89972/base-name-querry/version/latest";

  const client = new ApolloClient({
    uri: QueryURL,
    cache: new InMemoryCache()
  });

  const GET_APPROVAL = gql`
  query {
    approvals(first: 25) {
    id
    owner
    spender
    value
    }
  }
`;


  useEffect(() => {
    console.log("Fetching approvals...");
    const fetchApproval = async () => {
      try {
        const { data } = await client.query({
          query: GET_APPROVAL
        });
        console.log("Received approvals data:", data);
        setApproval(data.approvals);
      } catch (error) {
        console.error("Error fetching transfer:", error);
      }
    };

    fetchApproval();

    // Clean-up function
    return () => {
      console.log("Component unmounted or dependencies changed, cleaning up...");
      // You can perform any cleanup here if necessary
    };
  }, [client, GET_APPROVAL]);

  return (
    <div>
      <h1>Approvals Information</h1>
      {approvals !== null && approvals.length > 0 && approvals.map((approvals) => (
        <div key={approvals.id}>
  
          <div>Sender:{approvals.sender}</div> 
          <div>Receiver:{ approvals.receiver}</div> 
          <div>Amount:{approvals.amount}</div> 
          <br />
        </div>
      ))}
    </div>
  );
}

export default App;