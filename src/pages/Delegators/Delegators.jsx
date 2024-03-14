import { useEffect, useState } from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import { PROVIDER_ADDRESS, SUBQUERY_URL } from "../../config";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "address", headerName: "Address", width: 130 },
  { field: "amount", headerName: "Amount", width: 130 },
  {
    field: "delegatereward",
    headerName: "Delegation Reward",
    type: "number",
    width: 90,
  },
  {
    field: "pinnaclereward",
    headerName: "Pinnacle Reward",
    type: "number",
    width: 90,
  },
  {
    field: "percent",
    headerName: "% by delegation amount",
    type: "number",
    width: 90,
  },
];

const client = new ApolloClient({
  uri: SUBQUERY_URL,
  cache: new InMemoryCache(),
});

const Delegators = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const GET_DELEGATORS = gql`
    {
      delegates(
        first: 10
        offset: ${page * 10}
        orderBy: AMOUNT_DESC
        filter: {
          network: { equalTo: "songbird" }
          delegatee: { equalTo: "${PROVIDER_ADDRESS}" }
        }
      ) {
        nodes {
          id
          network
          owner
          delegatee
          amount
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }`;

    const getGQLResult = async () => {
      const results = await client.query({
        query: GET_DELEGATORS,
      });
      console.log(results);

      const newDelegatorInfoArr = results.data.delegates.nodes.map(
        (delegatorInfo, index) => {
          return {
            id: page * 10 + index + 1,
            address: delegatorInfo.owner,
            amount: delegatorInfo.amount,
            delegatereward: 0,
            pinnaclereward: 0,
            percent: 0,
          };
        }
      );
      setRows(newDelegatorInfoArr);
    };
    getGQLResult();
  }, [page]);

  return (
    <>
      <div className="card">
        <button onClick={() => setPage((count) => count + 1)}>
          count is {page}
        </button>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
};

export default Delegators;
