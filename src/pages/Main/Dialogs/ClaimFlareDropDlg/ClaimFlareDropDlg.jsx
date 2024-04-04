import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const ClaimFlareDropDlg = ({ open, handleClose, balance, onClaimFlareDrop, loading, unClaimedMonths, unclaimedReward }) => {
  const [_loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(0);

  React.useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const _onClaim = () => {
    onClaimFlareDrop();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
        {"Claim your delegation rewards"}
      </DialogTitle>
      <DialogContent>
        <h4 className="mb-2">Unclaimed Epochs:</h4>
        <div className="flex flex-wrap gap-1">
          {unClaimedMonths?.map((epoch) => {
            return <Chip key={Number(epoch)} size="small" label={Number(epoch)} color="primary" variant="outlined" />;
          })}
        </div>

        <div className="flex">
          <h4>Unclaimed Reward Amount: </h4>
          <p>
            <b>{unclaimedReward}</b>
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

export default ClaimFlareDropDlg;
