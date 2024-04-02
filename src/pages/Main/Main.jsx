import { getWeb3, getWeb3Contract } from "../../utils/web3";
import { useEffect, useState } from "react";
import TimeBar from "../../components/TimeBar";
import { SUBMITTER_CONTRACT_ADDRESS, PROVIDER_ADDRESS } from "../../config";
import { currentUnixTime } from "../../utils/helpers";
import Top10 from "./Top10";
import FTSOInfo from "./FTSOInfo";
import RewardInfo from "./RewardInfo";
import AccountInfo from "./AccountInfo";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import BigNumber from "bignumber.js";

const Main = () => {
  const [epochID, setEpochID] = useState(0);
  const [curVotePower, setCurVotePower] = useState(0);
  const [lockedVotePower, setLockedVotePower] = useState(0);
  const [currentReward, setCurrentReward] = useState(0);
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [curUserVPToGodState, setCurUserVPtoGodState] = useState(0);
  const [curUserLockedVPToGodState, setCurUserLockedVPtoGodState] = useState(0);
  const [endsIn, setEndsIn] = useState(0);
  const [curUserRewardAmount, setCurUserRewardAmount] = useState("0");
  const [duration, setDuration] = useState(0);
  const [curUserClaimableAmount, setCurUserClaimableAmount] = useState("0");
  const [isRewardClaimable, setIsRewardClaimable] = useState(false);

  useEffect(() => {
    setIsRewardClaimable(false);
    const promise = async () => {
      const web3 = getWeb3();
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

        setDuration(Number(rewardEpochDurationSeconds));
        setEpochID(Number(rewardEpochID));
        const endsin = Number(currentRewardEpochEnds) - currentUnixTime();
        setEndsIn(endsin);
      } catch (err) {
        console.log(err);
      }
    };

    if (isConnected) promise();
  }, [isConnected, address]);

  return (
    <>
      <div className="w-full px-[10%]">
        <FTSOInfo
          epochID={epochID}
          curVotePower={curVotePower.toLocaleString()}
          lockedVotePower={lockedVotePower.toLocaleString()}
        />

        <TimeBar endsIn={endsIn} duration={duration} />

        <div className="flex gap-2 pt-8">
          {/* <RewardInfo currentReward={currentReward} /> */}
          <AccountInfo
            currentReward={currentReward}
            curUserVPToGodState={curUserVPToGodState}
            curUserLockedVPToGodState={curUserLockedVPToGodState}
            curUserRewardAmount={curUserRewardAmount}
            curUserClaimableAmount={curUserClaimableAmount}
            isRewardClaimable={isRewardClaimable}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
