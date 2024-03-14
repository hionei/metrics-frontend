import { getWeb3, getWeb3Contract } from "../../utils/web3";
import { useEffect, useState } from "react";
import TimeBar from "../../components/TimeBar";
import { SUBMITTER_CONTRACT_ADDRESS, PROVIDER_ADDRESS } from "../../config";
import { currentUnixTime } from "../../utils/helpers";
import Top10 from "./Top10";
import FTSOInfo from "./FTSOInfo";
import RewardInfo from "./RewardInfo";
import AccountInfo from "./AccountInfo";

const Main = () => {
  const [epochID, setEpochID] = useState(0);
  const [curVotePower, setCurVotePower] = useState(0);
  const [lockedVotePower, setLockedVotePower] = useState(0);
  const [currentReward, setCurrentReward] = useState(0);
  const [endsIn, setEndsIn] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lockedBlock, setLockedBlock] = useState(0);

  useEffect(() => {
    const promise = async () => {
      const web3 = getWeb3();
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
      const rewardEpochDurationSeconds = await ftsoManagerContract.methods
        .rewardEpochDurationSeconds()
        .call();

      const ftsoRewardManagerAddress = await ftsoManagerContract.methods
        .rewardManager()
        .call();

      const currentRewardEpochEnds = await ftsoManagerContract.methods
        .currentRewardEpochEnds()
        .call();

      const ftsoRewardManagerContract = await getWeb3Contract(
        web3,
        ftsoRewardManagerAddress,
        "FtsoRewardManager",
        "contracts/tokenPools/implementation/FtsoRewardManager.sol/FtsoRewardManager.json"
      );

      const performanceInfo = await ftsoRewardManagerContract.methods
        .getDataProviderPerformanceInfo(Number(rewardEpochID), PROVIDER_ADDRESS)
        .call();

      const stateOfReward = await ftsoRewardManagerContract.methods
        .getStateOfRewards(PROVIDER_ADDRESS, Number(rewardEpochID))
        .call();

      const wnatContractAddress = await ftsoRewardManagerContract.methods
        .wNat()
        .call();

      const wNatContract = await getWeb3Contract(
        web3,
        wnatContractAddress,
        "WNat",
        "contracts/token/implementation/WNat.sol/WNat.json"
      );

      const lockedVP = await wNatContract.methods
        .votePowerOf(PROVIDER_ADDRESS)
        .call();

      setDuration(Number(rewardEpochDurationSeconds));
      setEpochID(Number(rewardEpochID));

      const lkVP = web3.utils.fromWei(lockedVP, "ether");
      const curTotalReward = web3.utils.fromWei(performanceInfo[0], "ether");
      const curReward = web3.utils.fromWei(stateOfReward[1], "ether");
      const curVP = web3.utils.fromWei(performanceInfo[1], "ether");
      setLockedVotePower(Math.floor(lkVP));
      setCurrentReward(Math.floor(curReward));
      setCurVotePower(Math.floor(curVP));

      const endsin = Number(currentRewardEpochEnds) - currentUnixTime();
      setEndsIn(endsin);
    };

    promise();
  }, []);

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
          <RewardInfo currentReward={currentReward} />
          <AccountInfo currentReward={currentReward} />
        </div>

        <div className="mt-5">
          <Top10 />
        </div>
      </div>
    </>
  );
};

export default Main;
