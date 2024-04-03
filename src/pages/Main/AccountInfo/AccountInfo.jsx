import Button from "@mui/joy/Button";
import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { getWeb3 } from "../../../utils/web3";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DelegateDlg from "../Dialogs/DelegateDlg";

const AccountInfo = ({
  curUserRewardAmount,
  curUserClaimableAmount,
  isRewardClaimable,
  onSgbWrapClicked,
  onSgbSendClicked,
  onWsgbUnwrapClicked,
  onWsgbSendClicked,
  onDelegateClicked,
  onAutoClaimClicked,
  onClaimRewardClicked,
  onFlareDropClaimClicked,
  balance,
  delegatees,
  wsgbBalance,
  onDelegate,
  loading,
}) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [_balance, setBalance] = useState(balance);
  const [_wSGBBalance, setWSGBBalance] = useState(wsgbBalance);
  const [_curUserRewardAmountEther, setCurUserRewardAmountEther] = useState(0);
  const [_curUserClaimableAmountEther, setCurUserClaimableAmountEther] = useState(0);
  const symbol = useSelector((state) => state.network.symbol);
  const providerInfo = useSelector((state) => state.providersInfo.data);
  const [sumOfBip, setSumOfBip] = useState(0);
  const [isOpenDelegateDlg, setIsOpenDelegateDlg] = useState(false);
  const [selectedAddr, setSelectedAddr] = useState("");
  const [selectedAddrBip, setSelectedAddrBip] = useState(0);
  const [selectedAddrOtherBip, setSelectedAddrOtherBip] = useState(0);

  useEffect(() => {
    let bipSum = 0;
    delegatees.forEach((delegatee) => {
      bipSum += Number(delegatee.bip);
    });
    setSumOfBip(bipSum);
  }, [delegatees]);

  useEffect(() => {
    setBalance(balance);
    setWSGBBalance(wsgbBalance);
  }, [balance, wsgbBalance]);

  useEffect(() => {
    const web3 = getWeb3();
    setCurUserRewardAmountEther(Number(web3.utils.fromWei(curUserRewardAmount, "ether")).toFixed(4));
    setCurUserClaimableAmountEther(Number(web3.utils.fromWei(curUserClaimableAmount, "ether")).toFixed(4));
  }, [curUserRewardAmount, curUserClaimableAmount]);

  const _onDelegate = async (toAddress, bip) => {
    onDelegate(toAddress, bip);
  };

  const onEdit = (addr, bip, otherBip) => {
    setSelectedAddr(addr);
    setSelectedAddrBip(bip);
    setSelectedAddrOtherBip(otherBip);

    console.log(addr, bip, otherBip);
    setIsOpenDelegateDlg(true);
  };

  const handleClose = () => {
    setIsOpenDelegateDlg(false);
  };

  return (
    <>
      <DelegateDlg
        open={isOpenDelegateDlg}
        handleClose={handleClose}
        balance={0}
        onDelegate={_onDelegate}
        loading={loading}
        selectedProvider={{ addr: selectedAddr, bip: selectedAddrBip, otherBip: selectedAddrOtherBip }}
      />
      <div className="flex flex-1 flex-col rounded border p-5 relative pt-10 gap-1 justify-around">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">Welcome to Flare Universe!</h1>
          <p>Manage your assets easily!</p>
        </div>
        <div className="flex gap-4 flex-col justify-start align-start mb-5">
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>
              <label>Account Address:</label> <span className="pl-6">{address}</span>
            </div>
            <div>
              <Button variant="outlined" sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}>
                View in Explorer
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>
              <label>SGB Balance: </label>
              <span className="pl-6"> {Number(_balance).toFixed(2)}</span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outlined"
                sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}
                onClick={onSgbWrapClicked}
              >
                Wrap
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}
                onClick={onSgbSendClicked}
              >
                Send
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>
              <label>WSGB Balance: </label>
              <span className="pl-6">{Number(_wSGBBalance).toFixed(2)}</span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outlined"
                sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}
                onClick={onWsgbUnwrapClicked}
              >
                Unwrap
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}
                onClick={onWsgbSendClicked}
              >
                Send
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div>Delegate to FTSO provider: </div>
            <div>
              {delegatees.map((delegatee, index) => {
                return (
                  <div key={"deletee" + index}>
                    {`${
                      providerInfo.filter((provider) => provider.address == delegatee.address && provider.chainId == "19")[0]
                        ?.name || ""
                    } - ${delegatee.address}`}{" "}
                    {`(${Number(delegatee.bip) / 100}%)`}
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => onEdit(delegatee.address, Number(delegatee.bip), sumOfBip - Number(delegatee.bip))}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </div>
                );
              })}
            </div>
            <div>
              <Button
                variant="outlined"
                sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}
                onClick={onDelegateClicked}
              >
                Delegate
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div className="">Auto-claim (fee: 0.1 {symbol}) </div>
            <div>
              <Button
                variant="outlined"
                sx={{ borderRadius: "2em", color: "#000", borderColor: "#000" }}
                onClick={onAutoClaimClicked}
              >
                Set
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div className="flex-1 text-start">Current Earnings: {_curUserRewardAmountEther}</div>
            <div className="flex-1 text-start">Claimable: {_curUserClaimableAmountEther}</div>
          </div>
        </div>

        <div className="flex justify-between items-center bg-[#0b6bcb] p-5 rounded-md">
          <div>
            <h2 className="text-white">Claim your delegation reward manually</h2>
          </div>
          <div className="gap-1 flex justify-end items-center">
            <div className="flex-1">
              {isRewardClaimable ? (
                <Button
                  color="danger"
                  onClick={onClaimRewardClicked}
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: "2em" }}
                >
                  Claim {_curUserClaimableAmountEther} {symbol}
                </Button>
              ) : (
                <Button color="danger" variant="outlined" disabled sx={{ bgcolor: "white", borderRadius: "2em" }}>
                  Pending {_curUserRewardAmountEther}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
