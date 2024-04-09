import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, TextField } from "@mui/material";
import NumberInput from "./NumberInput";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";
import { AUTO_CLAIM_ADDRESS } from "../../../../config";
import ExecutersSelect from "./ExecutersSelect";

const SetAutoClaimDlg = ({ open, handleClose, balance, onEnableAutoClaim, loading, error, setError }) => {
  const selectRef = React.useRef();
  const [_loading, setLoading] = React.useState(false);
  const [_error, _setError] = React.useState(error);
  const [autoClaim, setAutoClaim] = React.useState({ flareUniverse: false, others: false });
  const [otherExecutors, setOtherExecutors] = React.useState([]);

  React.useEffect(() => {
    _setError(error);
  }, [error]);

  const _onEnableAutoClaim = () => {
    let addresses = [...otherExecutors];
    if (autoClaim.flareUniverse) addresses.push({ address: AUTO_CLAIM_ADDRESS, fee: 0 });

    if (autoClaim.flareUniverse) onEnableAutoClaim(addresses, true);
    else onEnableAutoClaim(addresses, false);
  };

  const handleChange = (eve) => {
    setOtherExecutors([]);
    setAutoClaim({ ...autoClaim, [eve.target.name]: eve.target.checked });
    if (eve.target.name == "others") selectRef.current.clearValue();
  };

  const getSelectedExecutors = (value) => {
    setOtherExecutors(value);
    setError(0);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
        <div>{"Auto Claim"}</div>
        <FormControlLabel
          control={<Switch checked={autoClaim.flareUniverse} onChange={handleChange} name="flareUniverse" />}
          label={`- Auto claim by Flare Universe (fee: 0)`}
          labelPlacement="start"
        />
      </DialogTitle>

      <DialogContent>
        <Chip
          sx={{
            height: "auto",
            fontSize: "0.9em",
          }}
          label="Flare Universe is using manual feature for users to enable auto-claim as free."
        ></Chip>
      </DialogContent>
      <DialogContent sx={{ height: "350px", mt: "10px" }}>
        <FormControlLabel
          control={<Switch checked={autoClaim.others} onChange={handleChange} name="others" />}
          label="- You can add some other executers for auto-claim (for a fee)"
          labelPlacement="start"
        />
        <Chip
          sx={{
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
            fontSize: "0.9em",
            mb: "10px",
          }}
          label="Executor will be able to claim on your behalf (to your account). 
           Below executors will claim for you automatically (for a fee)."
        ></Chip>
        <ExecutersSelect disabled={!autoClaim.others} getSelectedExecutors={getSelectedExecutors} ref={selectRef} />
        {_error == 1 && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Note that!: </span> Invalid Address Format
          </p>
        )}
      </DialogContent>

      <DialogActions>
        <div className="flex flex-1 flex-col gap-2">
          {!autoClaim.flareUniverse && !autoClaim.others ? (
            <LoadingButton
              onClick={_onEnableAutoClaim}
              autoFocus
              sx={{ textTransform: "none" }}
              color="primary"
              variant="contained"
              loading={_loading}
              disableRipple
            >
              Remove Auto-claiming
            </LoadingButton>
          ) : (
            <LoadingButton
              onClick={_onEnableAutoClaim}
              sx={{ textTransform: "none" }}
              autoFocus
              color="primary"
              variant="contained"
              loading={_loading}
              disableRipple
            >
              Enable Auto-claiming
            </LoadingButton>
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SetAutoClaimDlg;
