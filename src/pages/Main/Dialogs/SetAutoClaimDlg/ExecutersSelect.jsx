import React, { useEffect, useRef, useState, forwardRef } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { SYMBOLS } from "../../../../config";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const animatedComponents = makeAnimated();

const ExecutersSelect = forwardRef(({ disabled, getSelectedExecutors }, ref) => {
  const executorsData = useSelector((state) => state.executorsInfo.data);
  const symbol = useSelector((state) => state.network.symbol);
  const [options, setOptions] = useState([]);
  const { chainId } = useWeb3ModalAccount();

  useEffect(() => {
    const opts = executorsData?.map((executor) => {
      return {
        value: executor.address,
        label: <div>{`${executor.address} (fee: ${executor.fee} ${SYMBOLS[chainId]})`}</div>,
      };
    });
    setOptions(opts);
  }, [executorsData]);

  const onChange = (value) => {
    const selectedExecutors = value.map((row) => {
      const temp = executorsData.filter((executor) => executor.address == row.value);
      return { address: row.value, fee: temp[0].fee };
    });
    getSelectedExecutors(selectedExecutors);
  };
  return (
    <Select
      ref={ref}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      clearValue
      options={options}
      isDisabled={disabled}
      onChange={onChange}
    />
  );
});

export default ExecutersSelect;
