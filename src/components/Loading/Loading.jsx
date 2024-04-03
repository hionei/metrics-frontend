import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import ReportIcon from "@mui/icons-material/Report";
import WarningIcon from "@mui/icons-material/Warning";

const Loading = () => {
  return (
    <>
      <CircularProgress color="danger" sx={{ "--CircularProgress-size": "80px" }}>
        <ReportIcon color="danger" />
      </CircularProgress>
    </>
  );
};

export default Loading;
