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

const AccountInfo = ({ currentReward }) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [balance, setBalance] = useState(0);
  const [wSGBBalance, setWSGBBalance] = useState(0);

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
  }, [isConnected]);

  return (
    <div className="flex flex-1 rounded border p-5 relative pt-10 gap-1 justify-around">
      <div className="flex gap-4 flex-col justify-center align-center">
        <div>Address: {address}</div>
        <div>SGB Balance: {Number(balance).toFixed(4)}</div>
        <div>WSGB Balance: {Number(wSGBBalance).toFixed(4)}</div>
        <div>Current VP to God</div>
        <div>Locked VP to God</div>
        <div>Locked VP of Top 10</div>
        <div>
          <CircularProgress size="lg" determinate value={14}>
            {14}%
          </CircularProgress>
        </div>

        <div className="flex flex-col gap-2">
          <Chip variant="soft" startDecorator={<Sun />} color="primary">
            Your Locked Amount: {currentReward.toLocaleString()}
          </Chip>
          <Chip variant="soft" startDecorator={<Sun />} color="primary">
            Top 10's Locked Amount: {currentReward.toLocaleString()}
          </Chip>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <Chip
          color="success"
          startDecorator={<WorkspacePremiumIcon />}
          variant="soft"
        >
          VIP
        </Chip>
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
              Pending 302
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
              Pending 302
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountInfo;
