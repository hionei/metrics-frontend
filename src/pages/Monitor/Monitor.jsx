import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useSelector } from "react-redux";
import Chip from "@mui/joy/Chip";
import TimeLeft from "../../components/TimeLeft";
import Table from "./Table";
import Web3 from "web3";
import Switcher from "../../components/Switcher";

const Monitor = () => {
  const networkId = useSelector((state) => state.network.value);
  const [epochID, setEpochID] = useState(0);
  const [providersInfo, setProvidersInfo] = useState([]);
  const [originalProvidersInfo, setOriginalProvidersInfo] = useState([]);
  const [endsIn, setEndsIn] = useState(0);
  const [totalVP, setTotalVP] = useState(0);
  const [duration, setDuration] = useState(0);
  const [defaultChecked, setDefaultChecked] = useState(true);

  useEffect(() => {
    const getSongbirdProvidersInfo = async () => {
      try {
        const rawResult = await axios.get(API_URL[19] + "/providers");
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
      <div className="flex gap-2 flex-wrap justify-center">
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

      <Table rows={providersInfo} totalVotePower={totalVP} />
    </>
  );
};

export default Monitor;
