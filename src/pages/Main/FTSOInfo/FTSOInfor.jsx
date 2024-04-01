import Chip from "@mui/joy/Chip";
import Sun from "@mui/icons-material/LightMode";
import { Avatar } from "@mui/joy";

const FTSOInfo = ({ epochID, curVotePower, lockedVotePower }) => {
  return (
    <div className="flex flex-col justify-center align-center gap-10 mb-5">
      <div className="flex justify-center gap-2 flex-wrap">
        <Chip
          variant="soft"
          startDecorator={<Avatar size="sm" src={"/static/images/SGB.svg"} />}
          color="primary"
        >
          Songbird Address: 0x020D146ba1F11356b96a18C9F67445d2eA957C4f
        </Chip>
        <Chip
          variant="soft"
          startDecorator={<Avatar size="sm" src={"/static/images/FLR.svg"} />}
          color="primary"
        >
          Flare Address: 0x020D146ba1F11356b96a18C9F67445d2eA957C4f
        </Chip>
      </div>
      <div className="flex justify-center gap-3 flex-wrap">
        <Chip variant="soft" startDecorator={<Sun />}>
          Reward Epoch: {epochID}
        </Chip>
        <Chip variant="soft" startDecorator={<Sun />}>
          Current Vote Power: {curVotePower}
        </Chip>
        <Chip variant="soft" startDecorator={<Sun />}>
          Locked Vote Power: {lockedVotePower}
        </Chip>
      </div>
    </div>
  );
};

export default FTSOInfo;
