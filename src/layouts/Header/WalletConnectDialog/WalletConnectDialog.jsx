import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/material/Button";
// import { useConnect } from "wagmi";
import Avatar from "@mui/material/Avatar";

const WalletConnectDialog = ({ open, handleClose }) => {
  // const { connectors, connect } = useConnect();
  // console.log(connectors);
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={(_event, reason) => {
        if (reason === "closeClick") handleClose(false);
      }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
          Wallet connect
        </Typography>
        {/* <div className="flex flex-col gap-1">
          {connectors.map((connector) => (
            <button
              className="button-15 flex items-center gap-4 justify-start"
              key={connector.uid}
              onClick={() => connect({ connector })}
            >
              <Avatar src={connector.icon} />
              {connector.name}
            </button>
          ))}
        </div> */}
      </Sheet>
    </Modal>
  );
};

export default WalletConnectDialog;
