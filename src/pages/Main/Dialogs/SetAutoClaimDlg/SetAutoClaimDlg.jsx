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
import ExecutersSelect from "./ExecutersSelect";

const SetAutoClaimDlg = ({ open, handleClose, balance, onWrapSGB, loading }) => {
  const inputElement = React.useRef();
  const [_loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(0);
  const [dark, setDark] = React.useState(false);
  const [autoClaim, setAutoClaim] = React.useState({ flareUniverse: false, others: false });

  React.useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const _onWrapSGB = () => {
    const inputValue = inputElement.current.value;

    if (Number(inputValue) > Number(balance)) {
      setError(1);
      return;
    } else {
      setError(0);
    }

    if (inputElement.current.value == "") {
      setError(2);
      return;
    }
    setError(0);

    onWrapSGB(inputElement.current.value);
  };

  const onValueChange = (value) => {
    if (Number(value) > Number(balance)) {
      setError(1);
      return;
    } else {
      setError(0);
    }
  };

  const handleChange = (eve) => {
    setAutoClaim({ ...autoClaim, [eve.target.name]: eve.target.checked });
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
        <div>{"Auto Claim"}</div>
        <FormControlLabel
          control={<Switch checked={autoClaim.flareUniverse} onChange={handleChange} name="flareUniverse" />}
          label="- Auto claim by Flare Universe (fee: 0)"
          labelPlacement="start"
        />
      </DialogTitle>

      <DialogContent>
        <Chip
          sx={{
            height: "auto",
            fontSize: "1em",
            fontWeight: "600",
          }}
          label="Fee: 0 SGB"
        ></Chip>
      </DialogContent>
      <DialogContent sx={{ height: "300px", mt: "10px" }}>
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
        <ExecutersSelect disabled={!autoClaim.others} />
      </DialogContent>

      <DialogActions>
        <div className="flex flex-1 flex-col gap-2">
          <LoadingButton
            onClick={_onWrapSGB}
            autoFocus
            color="primary"
            variant="contained"
            loading={_loading}
            disabled={!autoClaim.flareUniverse && !autoClaim.others}
          >
            Enable Auto-claiming by executers
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SetAutoClaimDlg;
