import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useSelector } from "react-redux";
import Chip from "@mui/joy/Chip";
import TimeLeft from "../../components/TimeLeft";
import Table from "./Table";
import Web3 from "web3";
import Switcher from "../../components/Switcher";
import LinearProgress from "@mui/material/LinearProgress";

const Monitor = () => {
  const networkId = useSelector((state) => state.network.value);
  const [epochID, setEpochID] = useState(0);
  const [providersInfo, setProvidersInfo] = useState([]);
  const [originalProvidersInfo, setOriginalProvidersInfo] = useState([]);
  const [endsIn, setEndsIn] = useState(0);
  const [totalVP, setTotalVP] = useState(0);
  const [duration, setDuration] = useState(0);
  const [defaultChecked, setDefaultChecked] = useState(true);

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setShowProgress(false);
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const getSongbirdProvidersInfo = async () => {
      try {
        const rawResult = await axios.get(API_URL[19] + "/providers");
        setProgress(100);
        setEpochID(rawResult.data.epochId);
        setEndsIn(Number(rawResult.data.endsIn));
        setTotalVP(Math.round(Web3.utils.fromWei(rawResult.data.totalVotePower, "ether")));
        setDuration(Number(rawResult.data.duration));
        const intProvidersInfo = rawResult.data.providersInfo?.map((provider) => {
          return {
            ...provider,
            successRate: Number(provider.successRate),
            balance: Number(provider.balance),
            availability: Number(provider.availability),
            totalEpochReward: Math.round(Web3.utils.fromWei(provider.totalEpochReward, "ether")),
            currentVotePower: Math.round(Web3.utils.fromWei(provider.currentVotePower, "ether")),
            lockedVotePower: Math.round(Web3.utils.fromWei(provider.lockedVotePower, "ether")),
            currentEpochReward: provider.currentEpochReward
              ? Math.round(Web3.utils.fromWei(provider.currentEpochReward, "ether"))
              : 0,
          };
        });

        const listedProvidersInfo = intProvidersInfo?.filter((provider) => provider.listed);
        setProvidersInfo(listedProvidersInfo || []);
        setOriginalProvidersInfo(intProvidersInfo || []);
      } catch (err) {
        console.log(err.message);
      }
    };

    const getFlareProvidersInfo = async () => {
      const rawResult = await axios.get(API_URL[14] + "/providers");
      setEpochID(rawResult.data.epochId);
      setEndsIn(Number(rawResult.data.endsIn));
      setTotalVP(Math.round(Web3.utils.fromWei(rawResult.data.totalVotePower, "ether")));
      setDuration(Number(rawResult.data.duration));

      const intProvidersInfo = rawResult.data.providersInfo?.map((provider) => {
        return {
          ...provider,
          successRate: Number(provider.successRate),
          balance: Number(provider.balance),
          availability: Number(provider.availability),
          totalEpochReward: Math.round(Web3.utils.fromWei(provider.totalEpochReward, "ether")),
          currentVotePower: Math.round(Web3.utils.fromWei(provider.currentVotePower, "ether")),
          lockedVotePower: Math.round(Web3.utils.fromWei(provider.lockedVotePower, "ether")),
          currentEpochReward: Math.round(Web3.utils.fromWei(provider.currentEpochReward, "ether")),
        };
      });

      const listedProvidersInfo = intProvidersInfo?.filter((provider) => provider.listed);

      setProvidersInfo(listedProvidersInfo || []);
      setOriginalProvidersInfo(intProvidersInfo || []);
    };

    if (networkId == 2) {
      setDefaultChecked(true);
      getFlareProvidersInfo();
    }

    if (networkId == 1) {
      setDefaultChecked(true);
      getSongbirdProvidersInfo();
    }
  }, [networkId]);

  const handleChange = (event) => {
    const checked = event.target.checked;
    setDefaultChecked(checked);
    if (checked) {
      setProvidersInfo((state) => {
        const newState = state.filter((provider) => {
          return provider.listed;
        });

        return newState;
      });
    } else {
      setProvidersInfo(originalProvidersInfo);
    }
  };

  return (
    <>
      <div className="flex mt-5 gap-3 flex-wrap justify-center">
        <div>
          <Chip variant="soft" color="primary">
            Reward Epoch: {epochID}
          </Chip>
        </div>
        <div>
          <Chip variant="soft" color="primary">
            Total Vote Power: {totalVP.toLocaleString()}
          </Chip>
        </div>
        <div>
          <Chip variant="soft" color="primary" sx={{ minWidth: "195px" }}>
            <TimeLeft endsIn={endsIn} duration={duration} />
          </Chip>
        </div>
      </div>
      <div className="text-start pl-5">
        <Switcher handleChange={handleChange} defaultChecked={defaultChecked} />
      </div>

      <div className="min-h-[70vh]">
        <Table rows={providersInfo} totalVotePower={totalVP} />
        <div>{showProgress && <LinearProgress variant="determinate" value={progress} />}</div>
      </div>
    </>
  );
};

export default Monitor;
