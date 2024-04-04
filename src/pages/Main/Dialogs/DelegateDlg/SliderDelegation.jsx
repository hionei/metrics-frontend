import { Button } from "@mui/material";
import React, { useState, forwardRef, useEffect } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";

function valuetext(value) {
  return `${value}%`;
}

const SliderDelegation = forwardRef(({ onValueChange, defaultValue, totalBip, selectedProvider }, ref) => {
  const [value, setValue] = useState(defaultValue);
  const [marks, setMarks] = useState([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    let marksList = [];
    if (selectedProvider) {
      for (let i = 0; i <= 100 - selectedProvider.otherBip / 100; i = i + 10) {
        marksList.push({
          value: i,
          label: `${i}%`,
        });
      }
      setMaxValue(100 - selectedProvider.otherBip / 100);
    } else {
      for (let i = 0; i <= 100 - totalBip / 100; i = i + 10) {
        marksList.push({
          value: i,
          label: `${i}%`,
        });
      }
      setMaxValue(100 - totalBip / 100);
    }

    setMarks(marksList);
  }, [totalBip, selectedProvider]);

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
          step={1}
          max={maxValue}
          onChange={handleChange}
          marks={marks}
          valueLabelDisplay="on"
        />
      </div>
    </div>
  );
});

export default SliderDelegation;
