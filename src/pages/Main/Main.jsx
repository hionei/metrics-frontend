import { getAbi, getWeb3, getWeb3Contract } from "../../utils/web3";
import { useEffect, useState } from "react";
import TimeBar from "../../components/TimeBar";
import { SUBMITTER_CONTRACT_ADDRESS, PROVIDER_ADDRESS } from "../../config";
import { currentUnixTime } from "../../utils/helpers";
import Top10 from "./Top10";
import FTSOInfo from "./FTSOInfo";
import RewardInfo from "./RewardInfo";
import AccountInfo from "./AccountInfo";
import BigNumber from "bignumber.js";
import WrapSGBDlg from "./Dialogs/WrapSGBDlg";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import Web3 from "web3";
import SendSGBDlg from "./Dialogs/SendSGBDlg/SendSGBDlg";
import UnwrapSGBDlg from "./Dialogs/UnwrapSGBDlg";
import SendWSGBDlg from "./Dialogs/SendWSGBDlg";
import DelegateDlg from "./Dialogs/DelegateDlg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProvidersInfo } from "../../store/reducers/bitforstSlice";
import { setIsLoading } from "../../store/reducers/loaderSlice";
import SetAutoClaimDlg from "./Dialogs/SetAutoClaimDlg";
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

const Main = () => {
  const [epochID, setEpochID] = useState(0);
  const [currentReward, setCurrentReward] = useState(0);
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [endsIn, setEndsIn] = useState(0);
  const [curUserRewardAmount, setCurUserRewardAmount] = useState("0");
  const [duration, setDuration] = useState(0);
  const [curUserClaimableAmount, setCurUserClaimableAmount] = useState("0");
  const [isRewardClaimable, setIsRewardClaimable] = useState(false);
  const [isOpenWrapDlg, setIsOpenWrapDlg] = useState(false);
  const [isOpenSendSGBDlg, setIsOpenSendSGBDlg] = useState(false);
  const [isOpenUnwrapDlg, setIsOpenUnwrapDlg] = useState(false);
  const [isOpenSendWSGBDlg, setIsOpenSendWSGBDlg] = useState(false);
  const [isOpenDelegateDlg, setIsOpenDelegateDlg] = useState(false);
  const [isOpenSetAutoClaimDlg, setIsOpenSetAutoClaimDlg] = useState(false);

  const { walletProvider } = useWeb3ModalProvider();
  const [balance, setBalance] = useState(0);
  const [wSGBBalance, setWSGBBalance] = useState(0);
  const [wnatContract, setWNatContract] = useState({ contract: null, address: null });
  const [delegatees, setDelegatees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  async function getBalance() {
    if (!isConnected) {
      console.log("User disconnected");
      return 0;
    }

    const ethersProvider = new BrowserProvider(walletProvider);
    const balance = await ethersProvider.getBalance(address);
    setBalance(formatUnits(balance, 18));
    const signer = await ethersProvider.getSigner();
    const WSGBContract = new Contract(WSGBAddress, WSGBAbi, signer);
    const WSGBBalance = await WSGBContract.balanceOf(address);
    setWSGBBalance(formatUnits(WSGBBalance, 18));
  }

  useEffect(() => {
    const getData = async () => {
      const providersRawData = await axios.get(
        "https://raw.githubusercontent.com/TowoLabs/ftso-signal-providers/master/bifrost-wallet.providerlist.json"
      );
      dispatch(setProvidersInfo(providersRawData.data.providers));
    };
    getData();

    setIsRewardClaimable(false);
    getBalance();
    const promise = async () => {
      const web3 = getWeb3(walletProvider);

      const priceSubmitterContract = await getWeb3Contract(
        web3,
        SUBMITTER_CONTRACT_ADDRESS,
        "PriceSubmitter",
        "contracts/genesis/implementation/PriceSubmitter.sol/PriceSubmitter.json"
      );

      const ftsoManagerAddress = await priceSubmitterContract.methods.getFtsoManager().call();

      const ftsoManagerContract = await getWeb3Contract(
        web3,
        ftsoManagerAddress,
        "FtsoManager",
        "contracts/ftso/implementation/FtsoManager.sol/FtsoManager.json"
      );

      const rewardEpochID = await ftsoManagerContract.methods.getCurrentRewardEpoch().call();
      const rewardEpochDurationSeconds = await ftsoManagerContract.methods.rewardEpochDurationSeconds().call();
      const ftsoRewardManagerAddress = await ftsoManagerContract.methods.rewardManager().call();
      const currentRewardEpochEnds = await ftsoManagerContract.methods.currentRewardEpochEnds().call();

      const ftsoRewardManagerContract = await getWeb3Contract(
        web3,
        ftsoRewardManagerAddress,
        "FtsoRewardManager",
        "contracts/tokenPools/implementation/FtsoRewardManager.sol/FtsoRewardManager.json"
      );

      const claimSetupManagerAddress = await ftsoRewardManagerContract.methods.claimSetupManager();

      const claimSetupManagerContract = await getWeb3Contract(
        web3,
        claimSetupManagerAddress,
        "ClaimSetupManager",
        "contracts/tokenPools/implementation/FtsoRewardManager.sol/FtsoRewardManager.json"
      );

      try {
        const unClaimedEpochs = await ftsoRewardManagerContract.methods.getEpochsWithUnclaimedRewards(address).call();
        let totalReward = new BigNumber(0);

        for (let epoch of unClaimedEpochs) {
          const unClaimedRewards = await ftsoRewardManagerContract.methods.getStateOfRewards(address, Number(epoch)).call();
          setIsRewardClaimable(unClaimedRewards[3] ? true : false);
          for (let reward of unClaimedRewards[1]) {
            totalReward = totalReward.plus(BigNumber(reward));
          }
        }
        setCurUserClaimableAmount(BigNumber(totalReward).toString());

        const curUserRewardInfo = await ftsoRewardManagerContract.methods.getStateOfRewards(address, rewardEpochID).call();

        let curUserReward = new BigNumber(0);
        curUserRewardInfo[1].forEach((reward) => {
          curUserReward = curUserReward.plus(new BigNumber(reward));
        });

        setCurUserRewardAmount(curUserReward.toString());

        const wnatContractAddress = await ftsoRewardManagerContract.methods.wNat().call();

        const wNatContract = await getWeb3Contract(
          web3,
          wnatContractAddress,
          "WNat",
          "contracts/token/implementation/WNat.sol/WNat.json"
        );

        const myDelegatees = await wNatContract.methods.delegatesOf(address).call();

        const delegateesInfo = myDelegatees[0].map((delegatee, index) => {
          return {
            address: delegatee,
            bip: myDelegatees[1][index],
          };
        });

        setDelegatees(delegateesInfo);

        setWNatContract({ contract: wNatContract, address: wnatContractAddress });

        setDuration(Number(rewardEpochDurationSeconds));
        setEpochID(Number(rewardEpochID));
        const endsin = Number(currentRewardEpochEnds) - currentUnixTime();
        setEndsIn(endsin);
      } catch (err) {
        console.log(err);
      }
    };

    if (isConnected) promise();
  }, [isConnected, address, refresh]);

  const onSgbWrapClicked = () => {
    setIsOpenWrapDlg(true);
  };
  const onSgbSendClicked = () => {
    setIsOpenSendSGBDlg(true);
  };
  const onWsgbUnwrapClicked = () => {
    setIsOpenUnwrapDlg(true);
  };
  const onWsgbSendClicked = () => {
    setIsOpenSendWSGBDlg(true);
  };
  const onDelegateClicked = () => {
    setIsOpenDelegateDlg(true);
  };
  const onAutoClaimClicked = () => {
    setIsOpenSetAutoClaimDlg(true);
  };
  const onClaimRewardClicked = () => {};
  const onFlareDropClaimClicked = () => {};

  const handleClose = () => {
    setIsOpenWrapDlg(false);
    setIsOpenSendSGBDlg(false);
    setIsOpenUnwrapDlg(false);
    setIsOpenSendWSGBDlg(false);
    setIsOpenDelegateDlg(false);
    setIsOpenSetAutoClaimDlg(false);
  };

  const onWrapSGB = async (value) => {
    const web3 = getWeb3(walletProvider);

    let estimatedGas = await wnatContract.contract.methods
      .deposit()
      .estimateGas({ from: address, to: wnatContract.address, value: web3.utils.toWei(String(value), "ether") });

    estimatedGas = Math.round(Number(estimatedGas) * 1.2);

    try {
      dispatch(setIsLoading(true));
      await wnatContract.contract.methods
        .deposit()
        .send({ from: address, gas: estimatedGas, value: web3.utils.toWei(String(value), "ether") });
      dispatch(setIsLoading(false));
      setRefresh((state) => !state);
      handleClose();
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
      handleClose();
    }
  };

  const onSendSGB = async (value, toAddress) => {
    try {
      const web3 = getWeb3(walletProvider);
      const amountWei = web3.utils.toWei(value, "ether");
      dispatch(setIsLoading(true));
      await web3.eth.sendTransaction({ from: address, to: toAddress, value: amountWei });
      dispatch(setIsLoading(false));
      setRefresh((state) => !state);
      handleClose();
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
      handleClose();
    }
  };

  const onUnwrapSGB = async (value) => {
    const web3 = getWeb3(walletProvider);

    let estimatedGas = await wnatContract.contract.methods
      .withdraw(web3.utils.toWei(String(value), "ether"))
      .estimateGas({ from: address, to: wnatContract.address });

    estimatedGas = Math.round(Number(estimatedGas) * 1.2);

    try {
      dispatch(setIsLoading(true));
      await wnatContract.contract.methods
        .withdraw(web3.utils.toWei(String(value), "ether"))
        .send({ from: address, gas: estimatedGas });
      dispatch(setIsLoading(false));
      setRefresh((state) => !state);
      handleClose();
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
      handleClose();
    }
  };

  const onSendWSGB = async (value, toAddress) => {
    const web3 = getWeb3(walletProvider);

    let estimatedGas = await wnatContract.contract.methods
      .transfer(toAddress, web3.utils.toWei(String(value), "ether"))
      .estimateGas({ from: address, to: wnatContract.address });

    estimatedGas = Math.round(Number(estimatedGas) * 1.2);

    try {
      dispatch(setIsLoading(true));
      await wnatContract.contract.methods
        .transfer(toAddress, web3.utils.toWei(String(value), "ether"))
        .send({ from: address, gas: estimatedGas });
      dispatch(setIsLoading(false));
      setRefresh((state) => !state);
      handleClose();
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
      handleClose();
    }
  };

  const onDelegate = async (toAddress, value) => {
    let estimatedGas = await wnatContract.contract.methods
      .delegate(toAddress, value * 100)
      .estimateGas({ from: address, to: wnatContract.address });

    estimatedGas = Math.round(Number(estimatedGas) * 1.2);

    try {
      dispatch(setIsLoading(true));
      await wnatContract.contract.methods.delegate(toAddress, value * 100).send({ from: address, gas: estimatedGas });
      dispatch(setIsLoading(false));

      setRefresh((state) => !state);
      handleClose();
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
      handleClose();
    }
  };

  return (
    <>
      <div className="w-full px-[10%]">
        <FTSOInfo epochID={epochID} />

        <TimeBar endsIn={endsIn} duration={duration} />

        <div className="flex gap-2 pt-8">
          {/* <RewardInfo currentReward={currentReward} /> */}
          <AccountInfo
            balance={balance}
            wsgbBalance={wSGBBalance}
            currentReward={currentReward}
            curUserRewardAmount={curUserRewardAmount}
            curUserClaimableAmount={curUserClaimableAmount}
            isRewardClaimable={isRewardClaimable}
            delegatees={delegatees}
            onSgbWrapClicked={onSgbWrapClicked}
            onSgbSendClicked={onSgbSendClicked}
            onWsgbUnwrapClicked={onWsgbUnwrapClicked}
            onWsgbSendClicked={onWsgbSendClicked}
            onDelegateClicked={onDelegateClicked}
            onAutoClaimClicked={onAutoClaimClicked}
            onClaimRewardClicked={onClaimRewardClicked}
            onFlareDropClaimClicked={onFlareDropClaimClicked}
            onDelegate={onDelegate}
            loading={loading}
          />

          <WrapSGBDlg open={isOpenWrapDlg} handleClose={handleClose} balance={balance} onWrapSGB={onWrapSGB} loading={loading} />
          <SendSGBDlg
            open={isOpenSendSGBDlg}
            handleClose={handleClose}
            balance={balance}
            loading={loading}
            onSendSGB={onSendSGB}
          />
          <UnwrapSGBDlg
            open={isOpenUnwrapDlg}
            handleClose={handleClose}
            balance={wSGBBalance}
            onUnwrapSGB={onUnwrapSGB}
            loading={loading}
          />
          <SendWSGBDlg
            open={isOpenSendWSGBDlg}
            handleClose={handleClose}
            balance={wSGBBalance}
            onSendWSGB={onSendWSGB}
            loading={loading}
          />
          <DelegateDlg
            open={isOpenDelegateDlg}
            handleClose={handleClose}
            balance={wSGBBalance}
            onDelegate={onDelegate}
            loading={loading}
          />
          <SetAutoClaimDlg
            open={isOpenSetAutoClaimDlg}
            handleClose={handleClose}
            balance={wSGBBalance}
            onDelegate={onDelegate}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
