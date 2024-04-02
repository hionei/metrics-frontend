import Chip from "@mui/joy/Chip";
import Sun from "@mui/icons-material/LightMode";
import { Avatar } from "@mui/joy";

const FTSOInfo = ({ epochID, curVotePower, lockedVotePower }) => {
  return (
    <div className="flex flex-col justify-center align-center gap-10 mb-5">
      <div className="flex justify-center gap-3 flex-wrap">
        <Chip variant="soft" startDecorator={<Sun />}>
          Reward Epoch: {epochID}
        </Chip>
      </div>
    </div>
  );
};

export default FTSOInfo;
