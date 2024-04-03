import { Button } from "@mui/material";
import React, { useState, forwardRef, useEffect } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 10,
    label: "10%",
  },
  {
    value: 20,
    label: "20%",
  },
  {
    value: 30,
    label: "30%",
  },
  {
    value: 40,
    label: "40%",
  },
  {
    value: 50,
    label: "50%",
  },
  {
    value: 60,
    label: "60%",
  },
  {
    value: 70,
    label: "70%",
  },
  {
    value: 80,
    label: "80%",
  },
  {
    value: 90,
    label: "90%",
  },
  {
    value: 100,
    label: "100%",
  },
];

function valuetext(value) {
  return `${value}%`;
}

const SliderDelegation = forwardRef(({ onValueChange, defaultValue }, ref) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    onValueChange(event.target.value);
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mb-10">% to delegate:</span>
        <Slider
          aria-label="Always visible"
          value={value}
          ref={ref}
          getAriaValueText={valuetext}
          step={10}
          onChange={handleChange}
          marks={marks}
          valueLabelDisplay="on"
        />
      </div>
    </div>
  );
});

export default SliderDelegation;
