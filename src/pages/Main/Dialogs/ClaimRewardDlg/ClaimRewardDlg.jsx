import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { getWeb3 } from "../../../../utils/web3";

const ClaimRewardDlg = ({
  open,
  handleClose,
  balance,
  onClaim,
  loading,
  unClaimedEpochs,
  unclaimedReward,
  curUserRewardAmount,
}) => {
  const inputElement = React.useRef();
  const [_loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(0);

  const [rewardEther, setRewardEther] = React.useState(0);
  const [curRewardEther, setCurRewardEther] = React.useState(0);

  React.useEffect(() => {
    const web3 = getWeb3();
    const eth = web3.utils.fromWei(unclaimedReward, "ether");
    setRewardEther(Number(eth));

    const curEth = web3.utils.fromWei(curUserRewardAmount, "ether");
    setCurRewardEther(curEth);
  }, [unclaimedReward, curUserRewardAmount]);

  React.useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const _onClaim = () => {
    onClaim();
  };

  const onValueChange = (value) => {
    if (Number(value) > Number(balance)) {
      setError(1);
      return;
    } else {
      setError(0);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
        {"Claim your delegation rewards"}
      </DialogTitle>
      <DialogContent>
        <h4 className="mb-2">Unclaimed Epochs:</h4>
        <div className="flex flex-wrap gap-1">
          {unClaimedEpochs.map((epoch) => {
            return <Chip key={Number(epoch)} size="small" label={Number(epoch)} color="primary" variant="outlined" />;
          })}
        </div>

        <div className="flex">
          <h4>Unclaimed Reward Amount: </h4>
          <p>
            <b>{rewardEther}</b>
          </p>
        </div>

        <div className="flex">
          <h4>Pending Reward Amount: </h4>
          <p>
            <b>{curRewardEther}</b>
          </p>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="flex flex-1 flex-col gap-2">
          <LoadingButton onClick={_onClaim} autoFocus color="primary" variant="contained" loading={_loading}>
            Claim
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default ClaimRewardDlg;
