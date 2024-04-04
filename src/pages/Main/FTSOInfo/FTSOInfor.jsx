import Chip from "@mui/joy/Chip";
import Sun from "@mui/icons-material/LightMode";
import { Avatar } from "@mui/joy";
import TimeLeft from "../../../components/TimeLeft";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const FTSOInfo = ({ epochID, endsIn, duration }) => {
  return (
    <div className="flex flex-col justify-center align-center gap-10 mb-5">
      <div className="flex justify-center gap-3 flex-wrap">
        <Chip variant="soft" startDecorator={<Sun />} color="primary">
          Reward Epoch: {epochID}
        </Chip>

        <Chip variant="soft" startDecorator={<AccessTimeIcon />} color="primary" sx={{ minWidth: "195px" }}>
          <TimeLeft endsIn={endsIn} duration={duration} />
        </Chip>
      </div>
    </div>
  );
};

export default FTSOInfo;
