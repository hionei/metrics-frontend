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
import { isValidEthereumAddress } from "../../../../utils/helpers";

const SendWSGBDlg = ({ open, handleClose, balance, onSendWSGB, loading }) => {
  const inputElement = React.useRef();
  const addressElement = React.useRef();
  const [_loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(0);
  const [addressError, setAddressError] = React.useState(0);

  React.useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const _onWrapSGB = () => {
    const inputValue = inputElement.current.value;
    const address = addressElement.current.value;
    console.log(inputValue, address);

    if (!isValidEthereumAddress(address)) {
      setAddressError(1);
      return;
    }

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
    setAddressError(0);
    onSendWSGB(inputElement.current.value, address);
  };

  const onValueChange = (value) => {
    if (Number(value) > Number(balance)) {
      setError(1);
      return;
    } else {
      setError(0);
    }
  };

  const handleAddressInputChange = (eve) => {
    if (isValidEthereumAddress(eve.target.value)) setAddressError(0);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
        {"Send WSGB tokens"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Chip
            sx={{
              height: "auto",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
              fontSize: "0.9em",
            }}
            label="You can send WSGB tokens to recipient."
          ></Chip>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <div className="flex flex-1 flex-col gap-10 p-4">
          <div>
            <NumberInput balance={balance} ref={inputElement} onValueChange={onValueChange} />

            {error == 1 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Note that!: </span> Exceed of your balance.
              </p>
            )}
            {error == 2 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Note that!: </span> Input amount of SGB
              </p>
            )}
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient Address</label>
            <input
              ref={addressElement}
              type="text"
              onChange={handleAddressInputChange}
              placeholder="Enter an address: 0x"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {addressError == 1 && (
              <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                <span class="font-medium">Note that!: </span> Invalid Address Format
              </p>
            )}
          </div>

          <LoadingButton onClick={_onWrapSGB} autoFocus color="primary" variant="contained" loading={_loading}>
            Send
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default SendWSGBDlg;
