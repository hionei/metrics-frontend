import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import XIcon from "@mui/icons-material/X";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";

const Footer = () => {
  const [showXToolTip, setShowXToolTip] = useState(false);
  const [showEmailToolTip, setShowEmailToolTip] = useState(false);

  const handleMouseOver = (value) => {
    if (value == 1) setShowXToolTip(true);
    if (value == 2) setShowEmailToolTip(true);
  };

  const handleMouseOut = (value) => {
    if (value == 1) setShowXToolTip(false);
    if (value == 2) setShowEmailToolTip(false);
  };

  return (
    <>
      <footer className="my-3">
        <div>
          <IconButton
            onMouseOver={() => handleMouseOver(1)}
            onMouseOut={() => handleMouseOut(1)}
            title="@SasankBharadwaj"
            aria-label="delete"
            size="medium"
            sx={{ color: "black" }}
            onClick={() => {
              window.open("https://twitter.com/SasankBharadwaj/", "_blank");
            }}
          >
            <XIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            onMouseOver={() => handleMouseOver(2)}
            onMouseOut={() => handleMouseOut(2)}
            title="admin@flareuniverse.xyz"
            aria-label="delete"
            size="medium"
            sx={{ color: "black" }}
            onClick={() => {
              window.open("mailto: admin@flareuniverse.xyz", "_blank");
            }}
          >
            <EmailIcon fontSize="inherit" />
          </IconButton>
          {showXToolTip && (
            <div className="fixed bottom-1 left-1 bg-gray-700 text-white text-xs p-1 rounded">
              https://twitter.com/SasankBharadwaj/
            </div>
          )}
          {showEmailToolTip && (
            <div className="fixed bottom-1 left-1 bg-gray-700 text-white text-xs p-1 rounded">admin@flareuniverse.xyz</div>
          )}
        </div>
        © 2024 Flare Universe. All Rights Reserved.
      </footer>
    </>
  );
};

export default Footer;
