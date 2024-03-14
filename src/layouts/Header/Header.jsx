import Avatar from "@mui/joy/Avatar";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import React, { useEffect } from "react";
import Button from "@mui/joy/Button";
import { TSONAME } from "../../config";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import { useWeb3Modal } from "@web3modal/ethers/react";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { truncateString } from "../../utils/helpers";

const options = [
  { value: "1", label: "Songbird", src: "/static/images/SGB.svg" },
  { value: "2", label: "Flare", src: "/static/images/FLR.svg" },
];

function renderValue(option) {
  if (!option) {
    return null;
  }

  return (
    <React.Fragment>
      <ListItemDecorator>
        <Avatar
          size="sm"
          src={options.find((o) => o.value === option.value)?.src}
        />
      </ListItemDecorator>
      {option.label}
    </React.Fragment>
  );
}

const Header = () => {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  return (
    <div className="flex flex-row px-4 py-6 align-center">
      <div className="flex-none w-40 flex align-center justify-center">
        <Typography level="h1" color="primary">
          {TSONAME}
        </Typography>
      </div>
      <div className="flex-1 flex gap-4 justify-center">
        <Link level="title-lg" href="/">
          Account
        </Link>
        <Link level="title-lg" href="/delegators">
          Delegators
        </Link>
      </div>
      <div className="flex flex-none w-64 gap-1">
        {isConnected && chainId == 19 && (
          <Button
            variant="outlined"
            onClick={() => open({ view: "Networks" })}
            startDecorator={<Avatar size="sm" src={options[0].src} />}
          >
            Songbird
          </Button>
        )}

        {isConnected && chainId == 14 && (
          <Button
            onClick={() => open({ view: "Networks" })}
            variant="outlined"
            startDecorator={<Avatar size="sm" src={options[1].src} />}
          >
            Flare
          </Button>
        )}

        {isConnected && chainId != 14 && chainId != 19 && (
          <Button
            color="danger"
            onClick={() => open({ view: "Networks" })}
            variant="outlined"
            startDecorator={<FmdBadIcon color="error" />}
          >
            Wrong Network
          </Button>
        )}

        {/* <w3m-button /> */}
        {/* <button onClick={() => open()}>Open Connect Modal</button>
        <button onClick={() => open({ view: "Networks" })}>
          Open Network Modal
        </button> */}
        <Button
          color={!isConnected ? "primary" : "danger"}
          variant={!isConnected ? "solid" : "outlined"}
          disabled={false}
          loading={false}
          onClick={() => {
            open();
          }}
          size="md"
        >
          {isConnected ? truncateString(address, 6) : "Connect"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
