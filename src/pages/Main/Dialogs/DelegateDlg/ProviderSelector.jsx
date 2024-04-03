import { Button } from "@mui/material";
import React, { useState, forwardRef, useEffect } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { useSelector } from "react-redux";

const ProviderSelector = forwardRef(({ onChange }, ref) => {
  const providerInfo = useSelector((state) => state.providersInfo.data);
  const getOptionValue = (value) => {
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-10">
      <CreatableSelect
        isClearable
        options={providerInfo
          .filter((provider) => provider.chainId == "19")
          .map((provider) => {
            return {
              value: provider.address,
              label: (
                <div>
                  <h4>{provider.name}</h4>
                  <p>{provider.address}</p>
                </div>
              ),
            };
          })}
        onChange={getOptionValue}
        ref={ref}
      />
    </div>
  );
});

export default ProviderSelector;
