import { Button } from "@mui/material";
import React, { useState, forwardRef } from "react";

const NumberInput = forwardRef(({ balance, onValueChange }, ref) => {
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    const re = /[0-9]+([\.,][0-9]+)?/;

    // if value is not blank, then test the regex

    if (inputValue === "" || re.test(inputValue)) {
      setValue(inputValue);
    }
    onValueChange(inputValue);
  };

  const onMaxClicked = () => {
    setValue(balance);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">WSGB Amount to Send</label>
        <Button onClick={onMaxClicked}>MAX</Button>
      </div>

      <input
        type="number"
        value={value}
        ref={ref}
        min="0"
        onChange={handleInputChange}
        pattern="[0-9]+([\.,][0-9]+)?"
        step="0.01"
        placeholder="Enter a number"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
});

export default NumberInput;
