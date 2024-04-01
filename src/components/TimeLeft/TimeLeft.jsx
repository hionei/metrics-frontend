import * as React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Slider from "@mui/joy/Slider";
import { useEffect, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import { formatTime } from "../../utils/helpers";

export default function TimeLeft({ endsIn, duration }) {
  const [timeFormat, setTimeFormat] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let interval;
    const startCountDown = (secondsTimestamp) => {
      interval = setInterval(() => {
        if (secondsTimestamp <= 0) {
          clearInterval(interval);
        }

        let time = formatTime(secondsTimestamp);
        setTimeFormat(time);
        secondsTimestamp--;
      }, 1000);
    };

    startCountDown(endsIn);

    return () => clearInterval(interval);
  }, [endsIn]);

  return (
    <Box sx={{ width: "100%" }}>
      Ends In: {timeFormat.days}d {timeFormat.hours}h {timeFormat.minutes}m {timeFormat.seconds}s
    </Box>
  );
}
