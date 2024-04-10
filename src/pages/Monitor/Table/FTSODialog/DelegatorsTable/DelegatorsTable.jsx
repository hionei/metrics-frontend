import { useEffect, useState } from "react";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { DataGrid } from "@mui/x-data-grid";
import { API_URL, PROVIDER_ADDRESS, SUBQUERY_URL } from "../../../../../config";
import { getWeb3 } from "../../../../../utils/web3";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useSelector } from "react-redux";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "address", headerName: "Address", width: 350 },
  { field: "amount", headerName: "Amount", width: 100 },
];

const client = new ApolloClient({
  uri: SUBQUERY_URL,
  cache: new InMemoryCache(),
});

const DISPLAY_COUNT = 10;

const DelegatorsTable = ({ address }) => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(DISPLAY_COUNT);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchAddr, setSearchAddr] = useState("");
  const networkId = useSelector((state) => state.network.value);

  useEffect(() => {
    const web3 = getWeb3();
    if (address) {
      const getGQLResult = async () => {
        try {
          setLoading(true);

          let results;

          if (networkId == 1) results = await axios.get(`${API_URL[19]}/delegators/${address}/${page}`);
          if (networkId == 2) results = await axios.get(`${API_URL[14]}/delegators/${address}/${page}`);

          console.log(results);
          setLoading(false);
          setTotalCount(results.data.result.delegates.totalCount);

          const newDelegatorInfoArr = results.data.result.delegates.nodes.map((delegatorInfo, index) => {
            return {
              id: (page - 1) * DISPLAY_COUNT + index + 1,
              address: delegatorInfo.owner,
              amount: Math.floor(web3.utils.fromWei(delegatorInfo.amount, "ether")).toLocaleString(),
              delegatereward: 0,
              pinnaclereward: 0,
              percent: 0,
            };
          });
          setRows(newDelegatorInfoArr);
        } catch (err) {
          setLoading(false);
        }
      };
      getGQLResult();
    }
  }, [page, address]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const onSearch = (event) => {
    const web3 = getWeb3();
    const GET_DELEGATORS = gql`
    {
      delegates(
        orderBy: AMOUNT_DESC
        filter: {
          network: { equalTo: "songbird" }
          delegatee: { equalTo: "${address}" }
          owner: {includesInsensitive: "${searchAddr}"}
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
      setLoading(true);
      const results = await client.query({
        query: GET_DELEGATORS,
      });
      setLoading(false);

      setTotalCount(results.data.delegates.totalCount);

      const newDelegatorInfoArr = results.data.delegates.nodes.map((delegatorInfo, index) => {
        return {
          id: (page - 1) * displayCount + index + 1,
          address: delegatorInfo.owner,
          amount: Math.floor(web3.utils.fromWei(delegatorInfo.amount, "ether")).toLocaleString(),
          delegatereward: 0,
          pinnaclereward: 0,
          percent: 0,
        };
      });
      setRows(newDelegatorInfoArr);
    };
    getGQLResult();
  };

  return (
    <>
      <div style={{ width: "100%" }} className="flex flex-col gap-5">
        <div className="flex items-center">
          <TextField
            sx={{ flex: "1 1" }}
            id="standard-basic"
            label="Search Address"
            variant="standard"
            onChange={(event) => {
              setSearchAddr(event.target.value);
            }}
          />
          <LoadingButton variant="contained" onClick={onSearch} loadingPosition="end" loading={loading} endIcon={<SearchIcon />}>
            Search
          </LoadingButton>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: displayCount },
            },
          }}
          hideFooter
        />

        <div className="flex justify-end">
          <Pagination count={Math.floor(totalCount / displayCount) + 1} page={page} color="primary" onChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default DelegatorsTable;
