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
        .getDataProviderPerformanceInfo(rewardEpochID, PROVIDER_ADDRESS)
        .call();

      try {
        const curUserRewardInfo = await ftsoRewardManagerContract.methods
          .getStateOfRewards(address, rewardEpochID)
          .call();

        let curUserReward = new BigNumber(0);
        curUserRewardInfo[1].forEach((reward) => {
          curUserReward = curUserReward.plus(new BigNumber(reward));
        });

        setCurUserRewardAmount(curUserReward.toString());

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

        const lockedBlock = await ftsoManagerContract.methods
          .getRewardEpochVotePowerBlock(rewardEpochID)
          .call();

        const lockedVP = await wNatContract.methods
          .votePowerOf(PROVIDER_ADDRESS)
          .call();

        const curUserVPToGod = await wNatContract.methods
          .votePowerFromTo(address, PROVIDER_ADDRESS)
          .call();

        setCurUserVPtoGodState(
          Math.floor(web3.utils.fromWei(curUserVPToGod, "ether"))
        );

        const curUserLockedVPToGod = await wNatContract.methods
          .votePowerFromToAt(address, PROVIDER_ADDRESS, lockedBlock)
          .call();

        setCurUserLockedVPtoGodState(
          Math.floor(web3.utils.fromWei(curUserLockedVPToGod, "ether"))
        );

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
      } catch (err) {
        console.log(err);
      }
    };

    if (isConnected) promise();
  }, [isConnected]);

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
          <AccountInfo
            currentReward={currentReward}
            curUserVPToGodState={curUserVPToGodState}
            curUserLockedVPToGodState={curUserLockedVPToGodState}
            curUserRewardAmount={curUserRewardAmount}
          />
        </div>

        <div className="mt-5">
          <Top10 />
        </div>
      </div>
    </>
  );
};

export default Main;
