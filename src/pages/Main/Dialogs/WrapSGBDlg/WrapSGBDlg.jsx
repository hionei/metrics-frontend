import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import NumberInput from "./NumberInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { SYMBOLS, WRAPSYMBOLS } from "../../../../config";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const WrapSGBDlg = ({ open, handleClose, balance, onWrapSGB, loading }) => {
  const inputElement = React.useRef();
  const [_loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(0);
  const { address, chainId, isConnected } = useWeb3ModalAccount();

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

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
        Wrap {SYMBOLS[chainId]} tokens
      </DialogTitle>
      <DialogContent>
        <Chip
          sx={{
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
            fontSize: "0.9em",
          }}
          label={`If you wrap your ${SYMBOLS[chainId]} tokens, you will receive ${WRAPSYMBOLS[chainId]} tokens. And you can do delegate and vote. Note that, you have to
            leave ${SYMBOLS[chainId]} tokens for using gas fee!`}
        ></Chip>
      </DialogContent>
      <DialogActions>
        <div className="flex flex-1 flex-col gap-2">
          <NumberInput balance={balance} ref={inputElement} onValueChange={onValueChange} />
          {error == 1 && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Note that!: </span> Exceed of your balance.
            </p>
          )}
          {error == 2 && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Note that!: </span> Input amount of {SYMBOLS[chainId]}
            </p>
          )}
          <LoadingButton onClick={_onWrapSGB} autoFocus color="primary" variant="contained" loading={_loading}>
            Wrap
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default WrapSGBDlg;
