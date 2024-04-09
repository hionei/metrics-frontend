import { getAbi, getWeb3, getWeb3Contract } from "../../utils/web3";
import { useEffect, useState } from "react";
import TimeBar from "../../components/TimeBar";
import { SUBMITTER_CONTRACT_ADDRESS, WSGBAddress, DISTRIBUTION_CONTRACT_ADDRESS, API_URL, CONTRACTS_ADDRESS } from "../../config";
import { currentUnixTime } from "../../utils/helpers";
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
import Chip from "@mui/joy/Chip";
import DelegateDlg from "./Dialogs/DelegateDlg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProvidersInfo } from "../../store/reducers/bitforstSlice";
import { setIsLoading } from "../../store/reducers/loaderSlice";
import SetAutoClaimDlg from "./Dialogs/SetAutoClaimDlg";
import { setExecutorsInfo } from "../../store/reducers/executorsSlice";
import ClaimRewardDlg from "./Dialogs/ClaimRewardDlg/";
import ClaimFlareDropDlg from "./Dialogs/ClaimFlareDropDlg";

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
  const [unClaimedEpochs, setUnClaimedEpochs] = useState([]);
  const [flareDropReward, setFlareDropReward] = useState(0);
  const [flareDropMonths, setFlareDropMonths] = useState([]);
  const [isRewardClaimable, setIsRewardClaimable] = useState(false);
  const [isOpenWrapDlg, setIsOpenWrapDlg] = useState(false);
  const [isOpenSendSGBDlg, setIsOpenSendSGBDlg] = useState(false);
  const [isOpenUnwrapDlg, setIsOpenUnwrapDlg] = useState(false);
  const [isOpenSendWSGBDlg, setIsOpenSendWSGBDlg] = useState(false);
  const [isOpenDelegateDlg, setIsOpenDelegateDlg] = useState(false);
  const [isOpenSetAutoClaimDlg, setIsOpenSetAutoClaimDlg] = useState(false);
  const [isOpenClaimDlg, setIsOpenClaimDlg] = useState(false);
  const [isOpenClaimFlareDropDlg, setIsOpenClaimFlareDrop] = useState(false);

  const { walletProvider } = useWeb3ModalProvider();
  const [balance, setBalance] = useState(0);
  const [wSGBBalance, setWSGBBalance] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  // contract
  const [wnatContract, setWNatContract] = useState({ contract: null, address: null });
  const [CSMContract, setCSMContract] = useState({ contract: null, address: "" });
  const [ftsoRewardManagerContract, setFtsoRewardManagerContract] = useState({ contract: null, address: null });
  const [DTDContract, setDTDContract] = useState({ contract: null, address: null });

  const [delegatees, setDelegatees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delegatorLoading, setDelegatorsLoading] = useState(false);
  const [autoClaimersLoading, setAutoClaimersLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(0);
  const [connectedExecutors, setConnectedExecutors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isConnected) {
      const addNewUser = async () => {
        try {
          await axios.post(API_URL[chainId] + "/add-new-user", { address: address });
        } catch (err) {
          console.log(err.message);
        }
      };

      addNewUser();
    }
    if (!isConnected) {
      setBalance("");
      setWSGBBalance("");
      setDelegatees([]);
      setConnectedExecutors([]);
    }
  }, [isConnected, address]);

  async function getBalance() {
    if (!isConnected) {
      console.log("User disconnected");
      return 0;
    }

    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const balance = await ethersProvider.getBalance(address);
      setBalance(formatUnits(balance, 18));
      const signer = await ethersProvider.getSigner();
      const WSGBContract = new Contract(WSGBAddress[chainId], WSGBAbi, signer);
      const WSGBBalance = await WSGBContract.balanceOf(address);
      setWSGBBalance(formatUnits(WSGBBalance, 18));
    } catch (err) {
      console.log(err);
    }
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
      try {
        setDelegatorsLoading(true);
        setAutoClaimersLoading(true);
        const web3 = getWeb3(walletProvider);

        // const priceSubmitterContract = await getWeb3Contract(web3, SUBMITTER_CONTRACT_ADDRESS, "PriceSubmitter");
        const ftsoManagerContract = await getWeb3Contract(web3, CONTRACTS_ADDRESS[chainId].FtsoManager, "FtsoManager");
        const ftsoRewardManagerContract = await getWeb3Contract(
          web3,
          CONTRACTS_ADDRESS[chainId].FtsoRewardManager,
          "FtsoRewardManager"
        );

        setFtsoRewardManagerContract({
          contract: ftsoRewardManagerContract,
          address: CONTRACTS_ADDRESS[chainId].FtsoRewardManager,
        });

        const wNatContract = await getWeb3Contract(web3, CONTRACTS_ADDRESS[chainId].WNat, "WNat");
        setWNatContract({ contract: wNatContract, address: CONTRACTS_ADDRESS[chainId].WNat });

        const claimSetupManagerContract = await getWeb3Contract(
          web3,
          CONTRACTS_ADDRESS[chainId].ClaimSetupManager,
          "ClaimSetupManager"
        );

        setCSMContract({ contract: claimSetupManagerContract, address: CONTRACTS_ADDRESS[chainId].ClaimSetupManager });

        const rewardEpochID = await ftsoManagerContract.methods.getCurrentRewardEpoch().call();
        const rewardEpochDurationSeconds = await ftsoManagerContract.methods.rewardEpochDurationSeconds().call();
        const currentRewardEpochEnds = await ftsoManagerContract.methods.currentRewardEpochEnds().call();

        if (chainId == 14) {
          const distributionToDelegatorsContract = await getWeb3Contract(
            web3,
            DISTRIBUTION_CONTRACT_ADDRESS,
            "DistributionToDelegators"
          );

          setDTDContract({ contract: distributionToDelegatorsContract, address: DISTRIBUTION_CONTRACT_ADDRESS });

          const months = await distributionToDelegatorsContract.methods.getClaimableMonths().call();
          const curMonth = await distributionToDelegatorsContract.methods.getCurrentMonth().call();
          setCurrentMonth(Number(curMonth));
          let sumOfFlareDropReward = 0;
          let startMonth = Number(months[0]);
          let endMonth = Number(months[1]);

          let monthsIntList = [];
          for (let i = startMonth; i <= endMonth; i++) {
            const amount = await distributionToDelegatorsContract.methods.getClaimableAmount(i).call();
            const amountEther = web3.utils.fromWei(amount, "ether");
            monthsIntList.push(Number(i));
            sumOfFlareDropReward += Number(amountEther);
          }
          setFlareDropReward(sumOfFlareDropReward);
          setFlareDropMonths(monthsIntList);
        }

        const rawResult = await claimSetupManagerContract.methods.getRegisteredExecutors(0, 10).call();
        let executersInfo = [];
        for (let executerAddr of rawResult[0]) {
          const feeWei = await claimSetupManagerContract.methods.getExecutorCurrentFeeValue(executerAddr).call();
          const fee = web3.utils.fromWei(feeWei, "ether");
          executersInfo.push({ address: executerAddr, fee: fee });
        }

        dispatch(setExecutorsInfo(executersInfo));

        const _connectedExecutors = await claimSetupManagerContract.methods.claimExecutors(address).call();
        setConnectedExecutors(_connectedExecutors);
        setAutoClaimersLoading(false);

        const unClaimedEpochs = await ftsoRewardManagerContract.methods.getEpochsWithUnclaimedRewards(address).call();
        let totalReward = new BigNumber(0);

        setUnClaimedEpochs(unClaimedEpochs);

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
        const myDelegatees = await wNatContract.methods.delegatesOf(address).call();
        const delegateesInfo = myDelegatees[0].map((delegatee, index) => {
          return {
            address: delegatee,
            bip: myDelegatees[1][index],
          };
        });

        setDelegatees(delegateesInfo);
        setDelegatorsLoading(false);
        setDuration(Number(rewardEpochDurationSeconds));
        setEpochID(Number(rewardEpochID));
        const endsin = Number(currentRewardEpochEnds) - currentUnixTime();
        setEndsIn(endsin);
      } catch (err) {
        console.log(err);
        setDelegatorsLoading(false);
        setAutoClaimersLoading(false);
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
  const onClaimRewardClicked = () => {
    setIsOpenClaimDlg(true);
  };
  const onFlareDropClaimClicked = () => {
    setIsOpenClaimFlareDrop(true);
  };

  const handleClose = () => {
    setIsOpenWrapDlg(false);
    setIsOpenSendSGBDlg(false);
    setIsOpenUnwrapDlg(false);
    setIsOpenSendWSGBDlg(false);
    setIsOpenDelegateDlg(false);
    setIsOpenSetAutoClaimDlg(false);
    setIsOpenClaimDlg(false);
    setIsOpenClaimFlareDrop(false);
  };

  const onWrapSGB = async (value) => {
    const web3 = getWeb3(walletProvider);

    let estimatedGas = await wnatContract.contract.methods
      .deposit()
      .estimateGas({ from: address, to: wnatContract.address, value: web3.utils.toWei(String(value), "ether") });

    estimatedGas = Math.round(Number(estimatedGas) * 1.2);

    try {
      dispatch(setIsLoading(true));
      const wrapTransaction = await wnatContract.contract.methods
        .deposit()
        .send({ from: address, gas: estimatedGas, value: web3.utils.toWei(String(value), "ether") });
      dispatch(setIsLoading(false));
      setRefresh(!refresh);
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

  const onUnDelegateClicked = async () => {
    let estimatedGas = await wnatContract.contract.methods
      .undelegateAll()
      .estimateGas({ from: address, to: wnatContract.address });

    estimatedGas = Math.round(Number(estimatedGas) * 1.2);

    try {
      dispatch(setIsLoading(true));
      await wnatContract.contract.methods.undelegateAll().send({ from: address, gas: estimatedGas });
      dispatch(setIsLoading(false));

      setRefresh((state) => !state);
      handleClose();
    } catch (err) {
      dispatch(setIsLoading(false));
      console.log(err);
      handleClose();
    }
  };

  const onEnableAutoClaim = async (executorsInfo, enableAutoClaim) => {
    const web3 = getWeb3(walletProvider);
    if (enableAutoClaim) {
      try {
        if (executorsInfo.length == 0) {
          setError(1);
          return;
        }

        let executorsParam = [];
        let feeParam = 0;

        for (let executor of executorsInfo) {
          executorsParam.push(executor.address);
          feeParam += Number(executor.fee);
        }

        console.log(executorsInfo);

        let estimatedGas = await CSMContract.contract.methods
          .setClaimExecutors(executorsParam, feeParam)
          .estimateGas({ from: address, to: CSMContract.address, value: web3.utils.toWei(feeParam, "ether") });

        estimatedGas = Math.round(Number(estimatedGas) * 1.2);

        dispatch(setIsLoading(true));

        await CSMContract.contract.methods
          .setClaimExecutors(executorsParam, feeParam)
          .send({ from: address, gas: estimatedGas, value: web3.utils.toWei(feeParam, "ether") });
        setRefresh((state) => !state);

        if (chainId == 14) {
          try {
            const result = await axios.post(API_URL[chainId] + "/enable-auto-claim", {
              address: address,
            });
          } catch (err) {
            console.log(err.message);
            alert(err.message);
          }
        } else if (chainId == 19) {
          try {
            const result = await axios.post(API_URL[chainId] + "/enable-auto-claim", {
              address: address,
            });
          } catch (err) {
            console.log(err.message);
            alert(err.message);
          }
        }

        dispatch(setIsLoading(false));
      } catch (err) {
        dispatch(setIsLoading(false));
      }
    } else {
      try {
        let executorsParam = [];
        let feeParam = 0;

        for (let executor of executorsInfo) {
          executorsParam.push(executor.address);
          feeParam += Number(executor.fee);
        }

        let estimatedGas = await CSMContract.contract.methods
          .setClaimExecutors(executorsParam, feeParam)
          .estimateGas({ from: address, to: CSMContract.address, value: web3.utils.toWei(feeParam, "ether") });

        estimatedGas = Math.round(Number(estimatedGas) * 1.2);

        dispatch(setIsLoading(true));

        await CSMContract.contract.methods
          .setClaimExecutors(executorsParam, feeParam)
          .send({ from: address, gas: estimatedGas, value: web3.utils.toWei(feeParam, "ether") });

        if (chainId == 14) {
          try {
            const result = await axios.post(API_URL[chainId] + "/remove-auto-claim", {
              address: address,
            });
          } catch (err) {
            console.log(err.message);
            alert(err.message);
          }
        } else if (chainId == 19) {
          try {
            const result = await axios.post(API_URL[chainId] + "/remove-auto-claim", {
              address: address,
            });
          } catch (err) {
            console.log(err.message);
            alert(err.message);
          }
        }
        setRefresh((state) => !state);

        dispatch(setIsLoading(false));
      } catch (err) {
        dispatch(setIsLoading(false));
      }
    }
  };

  const onClaimFlareDrop = async () => {
    let estimatedGas = await DTDContract.contract.methods
      .claim(address, address, currentMonth - 1, false)
      .estimateGas({ from: address, to: DTDContract.address });

    estimatedGas = Math.round(Number(estimatedGas) * 1.2);

    try {
      dispatch(setIsLoading(true));
      await DTDContract.contract.methods
        .claim(address, address, currentMonth - 1, false)
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

  const onClaim = async () => {
    let estimatedGas = await ftsoRewardManagerContract.contract.methods
      .claim(address, address, epochID - 1, false)
      .estimateGas({ from: address, to: ftsoRewardManagerContract.address });

    estimatedGas = Math.round(Number(estimatedGas) * 1.2);

    try {
      dispatch(setIsLoading(true));
      await ftsoRewardManagerContract.contract.methods
        .claim(address, address, epochID - 1, false)
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

  const setErrorChanged = (value) => {
    setError(value);
  };

  return (
    <>
      <div className="w-full px-[10%]">
        {/* <div>
          <FTSOInfo epochID={epochID} endsIn={endsIn} duration={duration} />
        </div> */}

        <div className="flex gap-2 pt-8 relative">
          {/* <RewardInfo currentReward={currentReward} /> */}
          <AccountInfo
            balance={balance}
            wsgbBalance={wSGBBalance}
            currentReward={currentReward}
            curUserRewardAmount={curUserRewardAmount}
            curUserClaimableAmount={curUserClaimableAmount}
            isRewardClaimable={isRewardClaimable}
            delegatees={delegatees}
            connectedExecutors={connectedExecutors}
            claimFlareDropAmount={flareDropReward}
            onUnDelegateClicked={onUnDelegateClicked}
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
            delegatorsLoading={delegatorLoading}
            autoClaimersLoading={autoClaimersLoading}
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
            delegatees={delegatees}
            loading={loading}
          />
          <SetAutoClaimDlg
            open={isOpenSetAutoClaimDlg}
            handleClose={handleClose}
            balance={wSGBBalance}
            onEnableAutoClaim={onEnableAutoClaim}
            loading={loading}
            error={error}
            setError={setErrorChanged}
          />
          <ClaimRewardDlg
            unClaimedEpochs={unClaimedEpochs}
            curUserRewardAmount={curUserRewardAmount}
            unclaimedReward={curUserClaimableAmount}
            open={isOpenClaimDlg}
            handleClose={handleClose}
            balance={balance}
            onClaim={onClaim}
            loading={loading}
          />
          <ClaimFlareDropDlg
            unClaimedMonths={flareDropMonths}
            unclaimedReward={flareDropReward}
            open={isOpenClaimFlareDropDlg}
            handleClose={handleClose}
            balance={balance}
            onClaimFlareDrop={onClaimFlareDrop}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
