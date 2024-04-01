import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import {
  API_URL,
  PROVIDER_ADDRESS,
  SUBMITTER_CONTRACT_ADDRESS,
  SUBQUERY_URL,
} from "../../../config";
import { getWeb3, getWeb3Contract, weiToEther } from "../../../utils/web3";
import { truncateString } from "../../../utils/helpers";
import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const client = new ApolloClient({
  uri: SUBQUERY_URL,
  cache: new InMemoryCache(),
});

export default function TableSheetColorInversion() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getTop10VP = async () => {
      const rawData = await axios.get(API_URL + "/top_10_vp");
      setRows(rawData.data.top10Info);
    };
    getTop10VP();
    const GET_DELEGATORS = gql`
      {
        delegates(
          first: 10
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
      }
    `;

    const web3 = getWeb3();

    const getGQLResult = async () => {
      const results = await client.query({
        query: GET_DELEGATORS,
      });

      const priceSubmitterContract = await getWeb3Contract(
        web3,
        SUBMITTER_CONTRACT_ADDRESS,
        "PriceSubmitter",
        "contracts/genesis/implementation/PriceSubmitter.sol/PriceSubmitter.json"
      );

      const ftsoManagerAddress = await priceSubmitterContract.methods
        .getFtsoManager()
        .call();
      const ftsoManagerContract = await getWeb3Contract(
        web3,
        ftsoManagerAddress,
        "FtsoManager",
        "contracts/ftso/implementation/FtsoManager.sol/FtsoManager.json"
      );
      const rewardEpochID = await ftsoManagerContract.methods
        .getCurrentRewardEpoch()
        .call();

      const lockedBlock = await ftsoManagerContract.methods
        .getRewardEpochVotePowerBlock(rewardEpochID)
        .call();

      const ftsoRewardManagerAddress = await ftsoManagerContract.methods
        .rewardManager()
        .call();

      const ftsoRewardManagerContract = await getWeb3Contract(
        web3,
        ftsoRewardManagerAddress,
        "FtsoRewardManager",
        "contracts/tokenPools/implementation/FtsoRewardManager.sol/FtsoRewardManager.json"
      );

      const wnatContractAddress = await ftsoRewardManagerContract.methods
        .wNat()
        .call();

      const wNatContract = await getWeb3Contract(
        web3,
        wnatContractAddress,
        "WNat",
        "contracts/token/implementation/WNat.sol/WNat.json"
      );

      const newDelegatorInfoArr = results.data.delegates.nodes.map(
        (delegatorInfo, index) => {
          return {
            id: index + 1,
            address: delegatorInfo.owner,
            amount: delegatorInfo.amount,
            lockedAmount: 0,
            usualreward: 0,
            godreward: 0,
            percent: 0,
          };
        }
      );
      setRows(newDelegatorInfoArr);

      newDelegatorInfoArr.forEach(async (item, indexD) => {
        const lockedVP = await wNatContract.methods
          .votePowerFromToAt(item.address, PROVIDER_ADDRESS, lockedBlock)
          .call();

        const usualReward = await ftsoRewardManagerContract.methods
          .getStateOfRewards(item.address, rewardEpochID)
          .call();
        console.log(lockedVP, usualReward[1][0]);

        setRows((prevState) => {
          return prevState.map((row, indexR) => {
            return indexR == indexD
              ? {
                  id: indexR + 1,
                  address: row.address,
                  amount: row.amount,
                  lockedAmount: lockedVP,
                  usualreward: usualReward[1][0],
                  godreward: 0,
                  percent: 0,
                }
              : {
                  id: indexR + 1,
                  address: row.address,
                  amount: row.amount,
                  lockedAmount: row.lockedAmount,
                  usualreward: row.usualreward,
                  godreward: row.godreward,
                  percent: row.percent,
                };
          });
        });
      });
    };
    // getGQLResult();
  }, []);

  return (
    <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        pt: 1,
        borderRadius: "sm",
        transition: "0.3s",
        background: (theme) =>
          `linear-gradient(45deg, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.primary[400]})`,
        "& tr:last-child": {
          "& td:first-child": {
            borderBottomLeftRadius: "8px",
          },
          "& td:last-child": {
            borderBottomRightRadius: "8px",
          },
        },
      }}
    >
      <Table stripe="odd" hoverRow>
        <caption className="text-2xl !text-white font-bold">
          Top 10 delegators of God TSO
        </caption>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>No</th>
            <th style={{ width: "20%" }}>Address</th>
            <th>Delegate Amount</th>
            <th>Locked Amount</th>
            <th>Usual Reward</th>
            <th>God Reward</th>
            <th>APL %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={"table-top-10" + index}>
              <td>{index + 1}</td>
              <td
                onClick={() => {
                  navigator.clipboard.writeText(row.owner);
                }}
              >
                {truncateString(row.owner, 20)}
              </td>
              <td>{row.amount && row.amount.toLocaleString()}</td>
              <td>
                {row.lockedVP != undefined && row.lockedVP.toLocaleString()}
              </td>
              <td>
                {row.usualReward != undefined &&
                  row.usualReward.toLocaleString()}
              </td>
              <td>{row.godReward?.toLocaleString()}</td>
              <td>{row.apy} %</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
