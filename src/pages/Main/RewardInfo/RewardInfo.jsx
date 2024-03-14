import RewardCard from "../../../components/RewardCard";
import { Chip } from "@mui/joy";
import Sun from "@mui/icons-material/LightMode";

const RewardInfo = ({ currentReward }) => {
  return (
    <div className="flex flex-1 flex-col gap-5 rounded border p-2 pt-10">
      <div>
        <Chip variant="soft" startDecorator={<Sun />} color="primary">
          Current Reward: {currentReward.toLocaleString()}
        </Chip>
      </div>
      <div className="flex gap-4 justify-around px-2">
        <div className="flex-1">
          <RewardCard
            value={60}
            title="Reward for God TSO"
            amount={Math.floor((currentReward * 60) / 100).toLocaleString()}
          />
        </div>

        <div className="flex-1">
          <RewardCard
            value={40}
            title="Reward for Top 10 Delegators"
            amount={Math.floor((currentReward * 40) / 100).toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
};

export default RewardInfo;
