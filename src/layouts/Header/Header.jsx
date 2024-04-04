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
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeNetwork } from "../../store/reducers/networkSlice";

const options = [
  { value: 1, label: "Songbird", src: "/static/images/SGB.svg" },
  { value: 2, label: "Flare", src: "/static/images/FLR.svg" },
];

function renderValue(option) {
  if (!option) {
    return null;
  }

  return (
    <React.Fragment>
      <ListItemDecorator>
        <Avatar size="sm" src={options.find((o) => o.value === option.value)?.src} />
      </ListItemDecorator>
      {option.label}
    </React.Fragment>
  );
}

const Header = () => {
  const { open } = useWeb3Modal();
  const location = useLocation();
  const dispatch = useDispatch();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const handleChange = (event, newValue) => {
    dispatch(changeNetwork(newValue));
  };

  return (
    <div className="flex flex-row px-4 py-3 align-center border-b">
      <div className="flex items-center gap-2 align-center justify-center">
        <Avatar src="logo.png" size="md" />
        <Typography level="h4" color="primary">
          {TSONAME}
        </Typography>
      </div>
      <div className="flex-1 flex gap-4 justify-center">
        <Link level="title-lg" href="/" underline={location.pathname == "/" ? "always" : "none"}>
          Account
        </Link>
        <Link level="title-lg" href="/metrics" underline={location.pathname == "/metrics" ? "always" : "none"}>
          Metrics
        </Link>
      </div>
      {location.pathname != "/metrics" ? (
        <div className="flex flex-none justify-end w-64 gap-1">
          {chainId == 19 && (
            <Button
              variant="outlined"
              sx={{ borderRadius: "2em" }}
              onClick={() => open({ view: "Networks" })}
              startDecorator={<Avatar size="sm" src={options[0].src} />}
            >
              Songbird
            </Button>
          )}

          {chainId == 14 && (
            <Button
              onClick={() => open({ view: "Networks" })}
              variant="outlined"
              sx={{ borderRadius: "2em" }}
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
            sx={{ borderRadius: "2em" }}
          >
            {isConnected ? truncateString(address, 6) : "Connect"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-none w-64 gap-1">
          <Select
            defaultValue={1}
            slotProps={{
              listbox: {
                sx: {
                  "--ListItemDecorator-size": "44px",
                },
              },
            }}
            sx={{
              "--ListItemDecorator-size": "44px",
              minWidth: 170,
            }}
            renderValue={renderValue}
            onChange={handleChange}
          >
            {options.map((option, index) => (
              <React.Fragment key={option.value}>
                {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                <Option value={option.value} label={option.label}>
                  <ListItemDecorator>
                    <Avatar size="sm" src={option.src} />
                  </ListItemDecorator>
                  {option.label}
                </Option>
              </React.Fragment>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
};

export default Header;
