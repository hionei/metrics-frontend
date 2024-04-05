import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { useSelector } from "react-redux";
import Chip from "@mui/joy/Chip";
import Sun from "@mui/icons-material/LightMode";
import TimeLeft from "../../components/TimeLeft";
import { truncateString } from "../../utils/helpers";
import Table from "./Table";
import Web3 from "web3";
import Switcher from "../../components/Switcher";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
        console.log(API_URL[19] + "/providers");
        const rawResult = await axios.get(API_URL[19] + "/providers");
        console.log(rawResult);
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
      console.log(rawResult);

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
