import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { getWeb3 } from "../../../utils/web3";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Skeleton from "@mui/material/Skeleton";
import DelegateDlg from "../Dialogs/DelegateDlg";
import { EXPLORER_URL, SYMBOLS, WRAPSYMBOLS } from "../../../config";
import LinearProgress from "@mui/material/LinearProgress";
import RoundedLabel from "../../../components/RoundedLabel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GetAppIcon from "@mui/icons-material/GetApp";
import Chip from "@mui/material/Chip";

const AccountInfo = ({
  curUserRewardAmount,
  curUserClaimableAmount,
  isRewardClaimable,
  onSgbWrapClicked,
  onSgbSendClicked,
  onWsgbUnwrapClicked,
  onWsgbSendClicked,
  onDelegateClicked,
  onUnDelegateClicked,
  onAutoClaimClicked,
  onClaimRewardClicked,
  onFlareDropClaimClicked,
  claimFlareDropAmount,
  balance,
  delegatees,
  wsgbBalance,
  onDelegate,
  connectedExecutors,
  loading,
  delegatorsLoading,
  autoClaimersLoading,
}) => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [_balance, setBalance] = useState(balance);
  const [_wSGBBalance, setWSGBBalance] = useState(wsgbBalance);
  const [_curUserRewardAmountEther, setCurUserRewardAmountEther] = useState(0);
  const [_curUserClaimableAmountEther, setCurUserClaimableAmountEther] = useState(0);
  const net = useSelector((state) => state.network.value);
  const providerInfo = useSelector((state) => state.providersInfo.data);
  const registeredExecutors = useSelector((state) => state.executorsInfo.data);
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
      {!isConnected && <div className="w-full h-full bg-[#ffffff00] absolute z-[100]"></div>}

      <div className="flex flex-1 flex-col rounded border p-5 relative pt-10 gap-1 justify-around">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">Welcome to Flare Universe!</h1>
          <p>Manage your assets easily!</p>
        </div>
        <div className="flex gap-4 flex-col justify-start align-start mb-5">
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div className="flex items-center justify-between">
              <RoundedLabel>Account Address:</RoundedLabel> <span className="pl-6">{address}</span>
            </div>
            <div>
              <Button
                variant="outlined"
                sx={{ borderRadius: "2em", textTransform: "none" }}
                onClick={() => {
                  window.open(EXPLORER_URL[chainId] + "address/" + address, "_blank").focus();
                }}
              >
                View in Explorer
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div className="flex items-center justify-between">
              <RoundedLabel>{SYMBOLS[chainId]} Balance: </RoundedLabel>
              <span className="pl-6"> {Number(_balance).toFixed(2)}</span>
            </div>
            <div className="flex gap-1">
              <ButtonGroup>
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: "2em", textTransform: "none" }}
                  onClick={onSgbWrapClicked}
                >
                  Wrap
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: "2em", textTransform: "none" }}
                  onClick={onSgbSendClicked}
                >
                  Send
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div className="flex items-center justify-between">
              <RoundedLabel>{WRAPSYMBOLS[chainId]} Balance: </RoundedLabel>
              <span className="pl-6">{Number(_wSGBBalance).toFixed(2)}</span>
            </div>
            <div className="flex gap-1">
              <ButtonGroup>
                <Button variant="outlined" sx={{ borderRadius: "2em", textTransform: "none" }} onClick={onWsgbUnwrapClicked}>
                  Unwrap
                </Button>
                <Button variant="outlined" sx={{ borderRadius: "2em", textTransform: "none" }} onClick={onWsgbSendClicked}>
                  Send
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <RoundedLabel>Delegate To: </RoundedLabel>
            <div>
              {delegatorsLoading ? (
                <Skeleton variant="rectangular" width="100%">
                  <label>
                    <span>Flare Universe</span>"0xBe7AD281aEF0405a252b12D5251e99c95f58799a"<span>100%</span>
                  </label>
                </Skeleton>
              ) : (
                delegatees.map((delegatee, index) => {
                  return (
                    <div key={"deletee" + index}>
                      {`${
                        providerInfo.filter((provider) => provider.address == delegatee.address && provider.chainId == chainId)[0]
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
                })
              )}
            </div>
            <div>
              {delegatees.length >= 2 ? (
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: "2em", textTransform: "none" }}
                  onClick={onUnDelegateClicked}
                >
                  Undelegate All
                </Button>
              ) : delegatees.length == 1 ? (
                <div>
                  <ButtonGroup>
                    <Button
                      color="secondary"
                      variant="outlined"
                      sx={{ borderRadius: "2em", textTransform: "none" }}
                      onClick={onUnDelegateClicked}
                    >
                      Undelegate
                    </Button>{" "}
                    <Button
                      color="secondary"
                      variant="outlined"
                      sx={{ borderRadius: "2em", textTransform: "none" }}
                      onClick={onDelegateClicked}
                    >
                      Delegate
                    </Button>
                  </ButtonGroup>
                </div>
              ) : (
                <Button
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: "2em", textTransform: "none" }}
                  onClick={onDelegateClicked}
                >
                  Delegate
                </Button>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <RoundedLabel>Auto-claim (fee: 0 {SYMBOLS[chainId]}): </RoundedLabel>
            <div className="flex flex-col">
              {autoClaimersLoading ? (
                <Skeleton>
                  <label>0xBe7AD281aEF0405a252b12D5251e99c95f58799a : Manual</label>
                </Skeleton>
              ) : (
                connectedExecutors.map((executor, index) => {
                  return (
                    <label key={executor + index}>
                      {executor} :
                      {registeredExecutors.filter((reEx) => reEx.address == executor).length > 0 ? (
                        <span>
                          (Registered Fee: {registeredExecutors.filter((reEx) => reEx.address == executor)[0]?.fee}{" "}
                          {SYMBOLS[chainId]})
                        </span>
                      ) : (
                        "(Manual)"
                      )}
                    </label>
                  );
                })
              )}
            </div>
            <div>
              <Button variant="outlined" sx={{ borderRadius: "2em", textTransform: "none" }} onClick={onAutoClaimClicked}>
                Set
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#e7e7e74f] p-2 rounded-[2em]">
            <div className="flex-1 text-start">
              <Chip
                color="secondary"
                variant="outlined"
                icon={<MonetizationOnIcon />}
                label={` Current Earnings: ${_curUserRewardAmountEther}`}
              />
            </div>
            <div className="flex-1 text-end">
              <Chip
                color="secondary"
                variant="outlined"
                icon={<GetAppIcon />}
                label={` Claimable: ${_curUserClaimableAmountEther}`}
              />
            </div>
          </div>
        </div>

        {chainId == 14 && (
          <div className="flex justify-between items-center bg-[#0b6bcb] p-5 rounded-br-xl  rounded-bl-xl">
            <div className="flex flex-col gap-1">
              <div>
                <h2 className="text-white">Claim your delegation reward manually</h2>
              </div>
              <div className="gap-1 flex justify-end items-center">
                <div className="flex-1">
                  {isRewardClaimable ? (
                    <Button
                      onClick={onClaimRewardClicked}
                      variant="contained"
                      color="secondary"
                      sx={{ borderRadius: "2em", textTransform: "none" }}
                    >
                      Claim {_curUserClaimableAmountEther} {SYMBOLS[chainId]}
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      disabled
                      sx={{ bgcolor: "white", borderRadius: "2em", fontWeight: "700", textTransform: "none" }}
                    >
                      Pending {_curUserRewardAmountEther}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <h2 className="text-white">Claim your FlareDrop distribution</h2>
              </div>
              <div className="gap-1 flex justify-end items-center">
                <div className="flex-1">
                  {Number(claimFlareDropAmount) != 0 ? (
                    <Button
                      onClick={onFlareDropClaimClicked}
                      variant="contained"
                      color="secondary"
                      sx={{ borderRadius: "2em", textTransform: "none" }}
                    >
                      Claim {claimFlareDropAmount} {SYMBOLS[chainId]}
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      disabled
                      sx={{ bgcolor: "white", borderRadius: "2em", textTransform: "none", fontWeight: "600" }}
                    >
                      Nothing to claim
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {chainId == 19 && (
          <div className="flex justify-between items-center bg-[#0b6bcb] p-5 rounded-md">
            <div>
              <h2 className="text-white">Claim your delegation reward manually</h2>
            </div>
            <div className="gap-1 flex justify-end items-center">
              <div className="flex-1">
                {isRewardClaimable ? (
                  <Button
                    onClick={onClaimRewardClicked}
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: "2em", textTransform: "none", fontWeight: "600" }}
                  >
                    Claim {_curUserClaimableAmountEther} {SYMBOLS[chainId]}
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    disabled
                    sx={{ bgcolor: "#fff", borderRadius: "2em", textTransform: "none", fontWeight: "600" }}
                  >
                    Pending {_curUserRewardAmountEther}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountInfo;
