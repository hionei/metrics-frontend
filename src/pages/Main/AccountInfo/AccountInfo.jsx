import Chip from "@mui/joy/Chip";
import { Card, Typography } from "@mui/joy";
import CircularProgress from "@mui/joy/CircularProgress";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Button from "@mui/joy/Button";
import Sun from "@mui/icons-material/LightMode";
import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { getWeb3 } from "../../../utils/web3";
import { Report } from "@mui/icons-material";
import TokenIcon from "@mui/icons-material/Token";
import { useSelector } from "react-redux";

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
  curUserClaimableAmount,
  isRewardClaimable,
}) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [balance, setBalance] = useState(0);
  const [wSGBBalance, setWSGBBalance] = useState(0);
  const [_curUserRewardAmountEther, setCurUserRewardAmountEther] = useState(0);
  const [_curUserClaimableAmountEther, setCurUserClaimableAmountEther] = useState(0);
  const symbol = useSelector((state) => state.network.symbol);

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
    if (isConnected) getBalance();
  }, [isConnected, address]);

  useEffect(() => {
    const web3 = getWeb3();
    setCurUserRewardAmountEther(Number(web3.utils.fromWei(curUserRewardAmount, "ether")).toFixed(4));
    setCurUserClaimableAmountEther(Number(web3.utils.fromWei(curUserClaimableAmount, "ether")).toFixed(4));
  }, [curUserRewardAmount, curUserClaimableAmount]);

  return (
    <>
      <div className="flex flex-1 flex-col rounded border p-5 relative pt-10 gap-1 justify-around">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">Welcome to Flare Universe!</h1>
          <p>Auto-claim fee is zero</p>
        </div>
        <div className="flex gap-4 flex-col justify-start align-start mb-5">
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>
              <label>Account Address:</label> <span className="pl-6">{address}</span>
            </div>
            <div>
              <Button variant="outlined" sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}>
                View in Explorer
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>
              <label>SGB Balance: </label>
              <span className="pl-6"> {Number(balance).toFixed(2)}</span>
            </div>
            <div className="flex gap-1">
              <Button variant="outlined" sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}>
                Wrap
              </Button>
              <Button variant="outlined" sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}>
                Send
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>
              <label>WSGB Balance: </label>
              <span className="pl-6">{Number(wSGBBalance).toFixed(2)}</span>
            </div>
            <div className="flex gap-1">
              <Button variant="outlined" sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}>
                Unwrap
              </Button>
              <Button variant="outlined" sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}>
                Send
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>Delegate to FTSO provider: </div>
            <div>
              <Button variant="outlined" sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}>
                Delegate
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>Auto-claim (fee: 0) </div>
            <div>
              <Button variant="outlined" sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}>
                Set
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div className="flex-1 text-start">Current Earnings: {_curUserRewardAmountEther}</div>
            <div className="flex-1 text-start">Claimable: {_curUserClaimableAmountEther}</div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-[#0b6bcb] p-5 rounded-md">
          <div>
            <h2 className="text-white">Claim your delegation reward manually</h2>
          </div>
          <div className="gap-1 flex justify-end items-center">
            <div className="flex-1">
              {isRewardClaimable ? (
                <Button color="danger" onClick={function () {}} variant="outlined" sx={{ bgcolor: "white", borderRadius: "2em" }}>
                  Claim {_curUserClaimableAmountEther} {symbol}
                </Button>
              ) : (
                <Button
                  color="danger"
                  onClick={function () {}}
                  variant="outlined"
                  disabled
                  sx={{ bgcolor: "white", borderRadius: "2em" }}
                >
                  Pending {_curUserRewardAmountEther}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
