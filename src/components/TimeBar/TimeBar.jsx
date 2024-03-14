import * as React from "react";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Slider from "@mui/joy/Slider";
import { useEffect, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import { formatTime } from "../../utils/helpers";

export default function TimeBar({ endsIn, duration }) {
  const [position, setPosition] = React.useState(0);
  const [timeFormat, setTimeFormat] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startCountDown = (secondsTimestamp) => {
      let interval = setInterval(() => {
        if (secondsTimestamp <= 0) {
          clearInterval(interval);
        }

        let time = formatTime(secondsTimestamp);
        setTimeFormat(time);
        secondsTimestamp--;
        setPosition(duration - secondsTimestamp);
      }, 1000);
    };

    startCountDown(endsIn);
  }, [endsIn]);

  useEffect(() => {
    setPosition(duration - endsIn);
  }, [endsIn, duration]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={1} sx={{ fontSize: "sm" }}>
        {/* <Sheet variant="soft" sx={{ height: 40, borderRadius: "xs" }} /> */}
        <Divider
          sx={{
            "--Divider-childPosition": `${(position / duration) * 100}%`,
          }}
        >
          Ends In: {timeFormat.days} days {timeFormat.hours} hours{" "}
          {timeFormat.minutes} minutes {timeFormat.seconds} seconds
        </Divider>
        {/* <Sheet variant="soft" sx={{ height: 40, borderRadius: "xs" }} /> */}
      </Stack>
      <Slider
        value={position}
        min={0}
        max={duration}
        step={1}
        // valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value}`}
        onChange={(event, value) => setPosition(value)}
      />
    </Box>
  );
}
