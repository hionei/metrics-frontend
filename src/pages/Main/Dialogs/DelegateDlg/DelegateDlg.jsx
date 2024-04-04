import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Chip, TextField } from "@mui/material";
import SliderDelegation from "./SliderDelegation";
import ProviderSelector from "./ProviderSelector";
import LoadingButton from "@mui/lab/LoadingButton";
import { isValidEthereumAddress } from "../../../../utils/helpers";
import { useSelector } from "react-redux";
import { SYMBOLS } from "../../../../config";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const DelegateDlg = ({ open, handleClose, balance, onDelegate, loading, delegatees, selectedProvider = undefined }) => {
  const inputElement = React.useRef();
  const providerSelectRef = React.useRef();
  const [_loading, setLoading] = React.useState(false);
  const [providerError, setProviderError] = React.useState(0);
  const [percentError, setPercentError] = React.useState(0);

  const [providerAddress, setProviderAddress] = React.useState("");
  const [percentage, setPercentage] = React.useState(0);

  const providersInfo = useSelector((state) => state.providersInfo.data);
  const [totalBip, setTotalBip] = React.useState(0);
  const [name, setName] = React.useState("");
  const { chainId } = useWeb3ModalAccount();

  React.useEffect(() => {
    let sumBip = 0;
    delegatees?.forEach((delegatee) => {
      sumBip += Number(delegatee.bip);
    });

    setTotalBip(sumBip);
  }, [delegatees]);

  React.useEffect(() => {
    if (providersInfo?.length > 0 && selectedProvider) {
      const rawname = providersInfo.filter(
        (provider) => provider.address == selectedProvider?.addr && provider.chainId == chainId
      )[0]?.name;
      setName(rawname);
    }
  }, [providersInfo, selectedProvider]);

  React.useEffect(() => {
    setLoading(loading);
  }, [loading]);

  const _onDelegate = () => {
    if (selectedProvider) {
      if (percentage == 0) {
        setPercentError(1);
      }
      setPercentError(0);
      onDelegate(selectedProvider.addr, percentage);
    } else {
      if (!isValidEthereumAddress(providerAddress)) {
        setProviderError(1);
        return;
      }

      if (percentage == 0) {
        setPercentError(1);
      }

      setProviderError(0);
      setPercentError(0);
      onDelegate(providerAddress, percentage);
    }
  };

  const onValueChange = (value) => {
    setPercentage(value);
  };

  const onProviderChanged = (value) => {
    setProviderAddress(value.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 600 }}>
        Delegate {SYMBOLS[chainId]} to ftso data providers
      </DialogTitle>
      <DialogContent sx={{ height: "300px", alignItems: "flex-start", gap: "1em" }}>
        <Chip
          sx={{
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
            fontSize: "0.9em",
          }}
          label="You can delegate up to 100% of your wrapped tokens to one or two data providers for the Flare FTSO and you earn reward for delegation"
        ></Chip>
        <div className="mt-4 flex flex-col gap-10">
          <div>
            {selectedProvider ? (
              <div>
                <h4>
                  {name != "" ? name : selectedProvider?.addr} ({Number(selectedProvider?.bip) / 100}%)
                </h4>
                <p>{name != "" ? selectedProvider?.addr : ""}</p>
              </div>
            ) : (
              <>
                <ProviderSelector ref={providerSelectRef} onChange={onProviderChanged} />
                {providerError == 1 && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Note that!: </span> Invalid Address Format
                  </p>
                )}
              </>
            )}
          </div>
          <div>
            <SliderDelegation
              ref={inputElement}
              onValueChange={onValueChange}
              defaultValue={Number(selectedProvider?.bip) / 100 || 0}
              totalBip={totalBip}
              selectedProvider={selectedProvider}
            />
            {percentError == 1 && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <span className="font-medium">Note that!: </span> Can not be zero
              </p>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="flex flex-1 flex-col gap-2">
          <LoadingButton onClick={_onDelegate} autoFocus color="primary" variant="contained" loading={_loading}>
            Delegate
          </LoadingButton>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default DelegateDlg;
