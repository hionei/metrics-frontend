import Chip from "@mui/joy/Chip";
import { Card, Typography } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Button from "@mui/joy/Button";
import Sun from "@mui/icons-material/LightMode";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { getWeb3 } from "../../../utils/web3";
import { Report } from "@mui/icons-material";
import TokenIcon from "@mui/icons-material/Token";

const WSGBAddress = "0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const WSGBAbi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const AccountInfo = ({
  currentReward,
  curUserVPToGodState,
  curUserLockedVPToGodState,
  curUserRewardAmount,
}) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [balance, setBalance] = useState(0);
  const [wSGBBalance, setWSGBBalance] = useState(0);
  const [top10lockedVP1, setLockedVP] = useState(0);
  const [_curUserRewardAmountEther, setCurUserRewardAmountEther] = useState(0);
  const [_isInTop10, setIsInTop10] = useState(false);
  async function getBalance() {
    if (!isConnected) {
      console.log("User disconnected");
      return 0;
    }

    const ethersProvider = new BrowserProvider(walletProvider);
    const balance = await ethersProvider.getBalance(address);
    setBalance(formatUnits(balance, 18));
    const signer = await ethersProvider.getSigner();
    // // The Contract object
    const WSGBContract = new Contract(WSGBAddress, WSGBAbi, signer);
    const WSGBBalance = await WSGBContract.balanceOf(address);
    setWSGBBalance(formatUnits(WSGBBalance, 18));
  }

  useEffect(() => {
    const getTop10LockedVP = async () => {
      const rawData = await axios.get(API_URL + "/get_top10_locked_VP");
      const top10LockedVP = rawData.data.top10LockedVP;
      setLockedVP(top10LockedVP);

      const rawDataForIsIn = await axios.get(
        API_URL + "/is_in_top10/" + address
      );
      const isInTop10 = rawData.data.result;
      setIsInTop10(isInTop10);
    };
    getTop10LockedVP();
    if (isConnected) getBalance();
  }, [isConnected]);

  useEffect(() => {
    console.log(curUserRewardAmount);
    const web3 = getWeb3();
    setCurUserRewardAmountEther(
      Number(web3.utils.fromWei(curUserRewardAmount, "ether")).toFixed(4)
    );
  }, [curUserRewardAmount]);

  return (
    <div className="flex flex-1 rounded border p-5 relative pt-10 gap-1 justify-around">
      <div className="flex gap-4 flex-col justify-start align-start">
        <Chip variant="soft" startDecorator={<TokenIcon />} color="primary">
          SGB Balance: {Number(balance).toFixed(4)}
        </Chip>
        <Chip variant="soft" startDecorator={<TokenIcon />} color="primary">
          WSGB Balance: {Number(wSGBBalance).toFixed(4)}
        </Chip>
        <Chip variant="soft" startDecorator={<TokenIcon />} color="primary">
          Current VP to God: {curUserVPToGodState.toLocaleString()}
        </Chip>
        <Chip variant="soft" startDecorator={<TokenIcon />} color="primary">
          Locked VP to God: {curUserLockedVPToGodState.toLocaleString()}
        </Chip>
        <Chip variant="soft" startDecorator={<TokenIcon />} color="primary">
          Locked VP of Top 10: {top10lockedVP1.toLocaleString()}
        </Chip>
        <div>
          <CircularProgress
            size="lg"
            determinate
            value={
              _isInTop10
                ? Math.floor((curUserLockedVPToGodState / top10lockedVP1) * 100)
                : 0
            }
          >
            {_isInTop10
              ? Math.floor((curUserLockedVPToGodState / top10lockedVP1) * 100)
              : 0}
            %
          </CircularProgress>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        {_isInTop10 ? (
          <Chip
            color="success"
            startDecorator={<WorkspacePremiumIcon />}
            variant="soft"
          >
            VIP
          </Chip>
        ) : (
          <Chip color="warning" startDecorator={<Report />} variant="soft">
            No in Top 10
          </Chip>
        )}
      </div>
      <Card color="danger" orientation="vertical" size="lg" variant="outlined">
        <div>
          <Typography level="title-lg" color="danger">
            Claim your both rewards here
          </Typography>
        </div>
        <div className="gap-1 flex justify-end items-center">
          <div>
            <Chip color="primary">Usual Reward:</Chip>
          </div>
          <div className="flex-1">
            <Button
              color="danger"
              onClick={function () {}}
              variant="outlined"
              disabled
            >
              Pending {_curUserRewardAmountEther}
            </Button>
          </div>
        </div>
        <div className="gap-1 flex  justify-end items-center">
          <div>
            <Chip color="primary">God Reward:</Chip>
          </div>
          <div className="flex-1">
            <Button
              color="danger"
              onClick={function () {}}
              variant="outlined"
              disabled
            >
              Pending{" "}
              {Math.floor(
                (curUserLockedVPToGodState / top10lockedVP1) * currentReward
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountInfo;
