import { useEffect, useState } from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
// import { DataGrid } from "@mui/x-data-grid";
import { PROVIDER_ADDRESS, SUBQUERY_URL } from "../../config";
import { getWeb3 } from "../../utils/web3";
// import Pagination from "@mui/material/Pagination";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "address", headerName: "Address", width: 400 },
  { field: "amount", headerName: "Amount", width: 300 },
];

const client = new ApolloClient({
  uri: SUBQUERY_URL,
  cache: new InMemoryCache(),
});

const DISPLAY_COUNT = 100;

const Delegators = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const web3 = getWeb3();
    const offset = (page - 1) * DISPLAY_COUNT;
    console.log(offset);
    const GET_DELEGATORS = gql`
    {
      delegates(
        first: ${DISPLAY_COUNT}
        offset: ${offset}
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
      setTotalCount(results.data.delegates.totalCount);

      const newDelegatorInfoArr = results.data.delegates.nodes.map(
        (delegatorInfo, index) => {
          return {
            id: (page - 1) * DISPLAY_COUNT + index + 1,
            address: delegatorInfo.owner,
            amount: Math.floor(
              web3.utils.fromWei(delegatorInfo.amount, "ether")
            ).toLocaleString(),
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

  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);
  };

  return (
    <>
      <div style={{ width: "100%" }} className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Pagination
            count={Math.floor(totalCount / DISPLAY_COUNT) + 1}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </div>

        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: DISPLAY_COUNT },
            },
          }}
          checkboxSelection
        />

        <div className="flex justify-end">
          <Pagination
            count={Math.floor(totalCount / DISPLAY_COUNT) + 1}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Delegators;
