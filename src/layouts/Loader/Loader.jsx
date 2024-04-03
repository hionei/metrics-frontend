import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import ReportIcon from "@mui/icons-material/Report";
import WarningIcon from "@mui/icons-material/Warning";
import { Avatar } from "@mui/joy";

const Loader = () => {
  return (
    <>
      <div className="fixed w-full h-full flex justify-center items-center z-[10000] bg-[#51556954] bg-opacity-50">
        <CircularProgress sx={{ "--CircularProgress-size": "80px" }}>
          <Avatar color="danger" src="logo.png" />
        </CircularProgress>
      </div>
    </>
  );
};

export default Loader;
