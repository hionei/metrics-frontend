import Chip from "@mui/joy/Chip";
import Sun from "@mui/icons-material/LightMode";

const FTSOInfo = ({ epochID, curVotePower, lockedVotePower }) => {
  return (
    <div className="flex justify-center gap-10 mb-5">
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
  );
};

export default FTSOInfo;
