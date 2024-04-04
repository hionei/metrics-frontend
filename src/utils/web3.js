import Web3 from "web3";
import { RPC_URL } from "../config";
import fs from "fs";

export const getWeb3 = (provider = undefined) => {
  const web3 = new Web3(provider || new Web3.providers.HttpProvider(RPC_URL[14]));
  return web3;
};

export async function getAbi(abiPath) {
  const rawtext = await fetch(abiPath);
  const text = await rawtext.text();
  let abi = JSON.parse(text);
  if (abi.abi) {
    abi = abi.abi;
  }
  return abi;
}

export async function getWeb3Contract(web3, address, name, abiPath) {
  // let abiPath = await relativeContractABIPathForContractName(name);
  const abi = await getAbi(`artifacts/${abiPath}`);
  return new web3.eth.Contract(abi, address);
}

export function getWeb3Wallet(web3, privateKey) {
  if (privateKey.indexOf("0x") != 0) {
    privateKey = "0x" + privateKey;
  }
  return web3.eth.accounts.privateKeyToAccount(privateKey);
}

export const weiToEther = (amount) => {
  const web3 = getWeb3();
  return web3.utils.fromWei(amount, "ether");
};
