import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Badge, Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Avatar } from "@mui/joy";
import { useSelector } from "react-redux";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip from "@mui/material/Tooltip";
import DelegatorsTable from "./DelegatorsTable";
import CloseIcon from "@mui/icons-material/Close";

export default function FTSODialog({ status, parentHandleClose, providerInfo }) {
  const [open, setOpen] = React.useState(status);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [ftsoInfo, setFtsoInfo] = React.useState(providerInfo);
  const symbol = useSelector((state) => state.network.symbol);

  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  React.useEffect(() => {
    setFtsoInfo(providerInfo);
    console.log(providerInfo);
  }, [providerInfo]);

  React.useEffect(() => {
    setOpen(status);
  }, [status]);

  const handleClose = () => {
    parentHandleClose();
  };

  return (
    <>
      {ftsoInfo && (
        <Dialog
          fullScreen={fullScreen}
          maxWidth={"lg"}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <div className="flex justify-end">
            <IconButton sx={{ margin: "5px" }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <DialogTitle id="responsive-dialog-title">
            <div className="flex gap-2 justify-start items-center">
              <Badge
                badgeContent={
                  ftsoInfo?.listed ? (
                    <DoneAllIcon sx={{ fontSize: 18 }} color="success" />
                  ) : (
                    <WarningAmberIcon sx={{ color: "#ff9100", fontSize: 18 }} />
                  )
                }
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                overlap="circular"
              >
                <Avatar src={ftsoInfo.logoURI} />
              </Badge>
              <h1 className="text-xl">{ftsoInfo?.name}</h1>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="flex">
              <div className="info-box flex flex-col">
                <label className="flex items-center gap-1">
                  Address: {ftsoInfo.address}{" "}
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                      <Tooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={tooltipOpen}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title="Copied!"
                      >
                        <IconButton
                          aria-label="copy"
                          size="small"
                          onClick={() => {
                            navigator.clipboard.writeText(ftsoInfo.address);
                            handleTooltipOpen();
                          }}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </ClickAwayListener>
                </label>
                <label>
                  Balance: {Number(ftsoInfo.balance).toFixed(2)} {symbol}
                </label>
                <label>
                  URL:{" "}
                  <a href={ftsoInfo.url} target="_blank">
                    {ftsoInfo.url}
                  </a>
                </label>
                <label>Description: {ftsoInfo.desc}</label>
                <label>Success Rate: {ftsoInfo.successRate}%</label>
                <label>Reward Rate: {ftsoInfo.curRewardRate}</label>
                <label>Previous Reward Rate: {ftsoInfo.prevRewardRate}</label>
                <label>Current Earnings: {Number(ftsoInfo.currentEpochReward).toLocaleString()}</label>
                <label>Total Earnings: {Number(ftsoInfo.totalEpochReward).toLocaleString()}</label>
                <label>Current Vote Power: {Number(ftsoInfo.currentVotePower).toLocaleString()}</label>
                <label>Locked Vote Power: {Number(ftsoInfo.lockedVotePower).toLocaleString()}</label>
                <label>Availability: {ftsoInfo.availability}%</label>
                <label>
                  Fee: {Number(ftsoInfo.fee.fee) / 100}
                  {"% "}
                  {ftsoInfo.fee.scheduledFee.fee != ""
                    ? `(${Number(ftsoInfo.fee.scheduledFee.fee) / 100}% from ${ftsoInfo.fee.scheduledFee.from})`
                    : ""}
                </label>
                <div>
                  Whitelisted:
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(ftsoInfo.whitelist).map((symbol) => {
                      if (ftsoInfo.whitelist[symbol]) return <Chip label={symbol} color="success" size="small" />;
                      else return <></>;
                    })}
                  </div>
                </div>
              </div>
              <div className="delegators-box">
                <h2 className="mb-2 text-lg">Delegators</h2>
                <DelegatorsTable address={ftsoInfo.address} />
              </div>
            </div>
          </DialogContent>
          {/* <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Disagree
            </Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions> */}
        </Dialog>
      )}
    </>
  );
}

const EmptyDialog = () => {
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogContent>
        <DialogContentText>No Data</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
