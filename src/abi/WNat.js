export default {
  _format: "hh-sol-artifact-1",
  contractName: "WNat",
  sourceName: "contracts/token/implementation/WNat.sol",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_governance",
          type: "address",
        },
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "string",
          name: "_symbol",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "CreatedTotalSupplyCache",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "dst",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Deposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "proposedGovernance",
          type: "address",
        },
      ],
      name: "GovernanceProposed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "oldGovernance",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "newGoveranance",
          type: "address",
        },
      ],
      name: "GovernanceUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "_contractType",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_oldContractAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_newContractAddress",
          type: "address",
        },
      ],
      name: "VotePowerContractChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "src",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdrawal",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_count",
          type: "uint256",
        },
      ],
      name: "balanceHistoryCleanup",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "balanceOfAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_owners",
          type: "address[]",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "batchVotePowerOfAt",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "claimGovernance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "cleanupBlockNumber",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_bips",
          type: "uint256",
        },
      ],
      name: "delegate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "delegateExplicit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
      ],
      name: "delegatesOf",
      outputs: [
        {
          internalType: "address[]",
          name: "_delegateAddresses",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "_bips",
          type: "uint256[]",
        },
        {
          internalType: "uint256",
          name: "_count",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_delegationMode",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "delegatesOfAt",
      outputs: [
        {
          internalType: "address[]",
          name: "_delegateAddresses",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "_bips",
          type: "uint256[]",
        },
        {
          internalType: "uint256",
          name: "_count",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_delegationMode",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_who",
          type: "address",
        },
      ],
      name: "delegationModeOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
      ],
      name: "depositTo",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "governance",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "governanceVotePower",
      outputs: [
        {
          internalType: "contract IGovernanceVotePower",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_governance",
          type: "address",
        },
      ],
      name: "initialise",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_governance",
          type: "address",
        },
      ],
      name: "proposeGovernance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "proposedGovernance",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "readVotePowerContract",
      outputs: [
        {
          internalType: "contract IVPContractEvents",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_who",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "revokeDelegationAt",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_cleanerContract",
          type: "address",
        },
      ],
      name: "setCleanerContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "setCleanupBlockNumber",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_cleanupBlockNumberManager",
          type: "address",
        },
      ],
      name: "setCleanupBlockNumberManager",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IIGovernanceVotePower",
          name: "_governanceVotePower",
          type: "address",
        },
      ],
      name: "setGovernanceVotePower",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IIVPContract",
          name: "_vpContract",
          type: "address",
        },
      ],
      name: "setReadVpContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract IIVPContract",
          name: "_vpContract",
          type: "address",
        },
      ],
      name: "setWriteVpContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "totalSupplyAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "totalSupplyCacheCleanup",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_count",
          type: "uint256",
        },
      ],
      name: "totalSupplyHistoryCleanup",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "totalVotePower",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "totalVotePowerAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "totalVotePowerAtCached",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_governance",
          type: "address",
        },
      ],
      name: "transferGovernance",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "undelegateAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_delegateAddresses",
          type: "address[]",
        },
      ],
      name: "undelegateAllExplicit",
      outputs: [
        {
          internalType: "uint256",
          name: "_remainingDelegation",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
      ],
      name: "undelegatedVotePowerOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "undelegatedVotePowerOfAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
      ],
      name: "votePowerFromTo",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_from",
          type: "address",
        },
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "votePowerFromToAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
      ],
      name: "votePowerOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "votePowerOfAt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "votePowerOfAtCached",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_blockNumber",
          type: "uint256",
        },
      ],
      name: "votePowerOfAtIgnoringRevocation",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "vpContractInitialized",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "writeVotePowerContract",
      outputs: [
        {
          internalType: "contract IVPContractEvents",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
  bytecode:
    "0x60806040526011805460ff60a01b191690553480156200001e57600080fd5b5060405162004a1038038062004a10833981810160405260608110156200004457600080fd5b8151602083018051604051929492938301929190846401000000008211156200006c57600080fd5b9083019060208201858111156200008257600080fd5b82516401000000008111828201881017156200009d57600080fd5b82525081516020918201929091019080838360005b83811015620000cc578181015183820152602001620000b2565b50505050905090810190601f168015620000fa5780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200011e57600080fd5b9083019060208201858111156200013457600080fd5b82516401000000008111828201881017156200014f57600080fd5b82525081516020918201929091019080838360005b838110156200017e57818101518382015260200162000164565b50505050905090810190601f168015620001ac5780820380516001836020036101000a031916815260200191505b50604052505050828282828083838160039080519060200190620001d292919062000354565b508051620001e890600490602084019062000354565b50506005805460ff19166012179055506001600160a01b038116156200021357620002138162000270565b506001600160a01b03811662000263576040805162461bcd60e51b815260206004820152601060248201526f5f676f7665726e616e6365207a65726f60801b604482015290519081900360640190fd5b5050505050505062000400565b600d54600160a01b900460ff1615620002d0576040805162461bcd60e51b815260206004820152601460248201527f696e697469616c6973656420213d2066616c7365000000000000000000000000604482015290519081900360640190fd5b600d805460ff60a01b1916600160a01b179055600c54604080516001600160a01b039283168152918316602083015280517f434a2db650703b36c824e745330d6397cdaa9ee2cc891a4938ae853e1c50b68d9281900390910190a1600c80546001600160a01b039092166001600160a01b0319928316179055600d80549091169055565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826200038c5760008555620003d7565b82601f10620003a757805160ff1916838001178555620003d7565b82800160010185558215620003d7579182015b82811115620003d7578251825591602001919060010190620003ba565b50620003e5929150620003e9565b5090565b5b80821115620003e55760008155600101620003ea565b61460080620004106000396000f3fe60806040526004361061037a5760003560e01c80639470b0bd116101d1578063caeb942b11610102578063e587497e116100a0578063f5f3d4f71161006f578063f5f3d4f714610f6f578063f62f8f3a14610f84578063f683776714610fae578063f6a494af14610fe157610389565b8063e587497e14610e81578063e64767aa14610eba578063ed475a7914610efd578063f0e292c914610f3657610389565b8063d38bfff4116100dc578063d38bfff414610dcb578063d6aa0b7714610dfe578063dd62ed3e14610e31578063deea13e714610e6c57610389565b8063caeb942b14610d60578063d06dc3ad14610d8a578063d0e30db014610dc357610389565b8063a9059cbb1161016f578063bbd6fbf811610149578063bbd6fbf814610ca4578063be0ca74714610cdd578063c373a08e14610d18578063c787a8fc14610d4b57610389565b8063a9059cbb14610c30578063b302f39314610c69578063b760faf914610c7e57610389565b80639b3baa0e116101ab5780639b3baa0e14610b7c5780639ca2231a14610b915780639d6a890f14610bc4578063a457c2d714610bf757610389565b80639470b0bd14610b0457806395d89b4114610b3d578063981b24d014610b5257610389565b806343ea370b116102ab57806370a08231116102495780637f4fcaa9116102235780637f4fcaa914610a4a57806383035a8214610a7d5780638c2b8ae114610ab657806392bfe6d814610acb57610389565b806370a082311461090a578063755d10a41461093d5780637de5b8ed1461097057610389565b80635aa6e675116102855780635aa6e6751461081d5780635d36b190146108325780635d6d11eb1461084757806360f7ac97146108f557610389565b806343ea370b146106ba57806349e3c7e5146106e45780634ee2cd7e146107e457610389565b80631fec092a11610318578063313ce567116102f2578063313ce567146105f957806331d12a161461062457806339509351146106575780633e5aa26a1461069057610389565b80631fec092a1461055b57806323b872dd1461058c5780632e1a7d4d146105cf57610389565b8063095ea7b311610354578063095ea7b31461049c57806313de97f5146104e9578063142d10181461051357806318160ddd1461054657610389565b8063026e402b1461038e57806304bb4e43146103c757806306fdde031461041257610389565b3661038957610387611014565b005b600080fd5b34801561039a57600080fd5b50610387600480360360408110156103b157600080fd5b506001600160a01b038135169060200135611056565b3480156103d357600080fd5b50610400600480360360408110156103ea57600080fd5b506001600160a01b0381351690602001356110f1565b60408051918252519081900360200190f35b34801561041e57600080fd5b50610427611184565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610461578181015183820152602001610449565b50505050905090810190601f16801561048e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104a857600080fd5b506104d5600480360360408110156104bf57600080fd5b506001600160a01b038135169060200135611193565b604080519115158252519081900360200190f35b3480156104f557600080fd5b506103876004803603602081101561050c57600080fd5b50356111b0565b34801561051f57600080fd5b506104006004803603602081101561053657600080fd5b50356001600160a01b03166113b4565b34801561055257600080fd5b5061040061143e565b34801561056757600080fd5b50610570611444565b604080516001600160a01b039092168252519081900360200190f35b34801561059857600080fd5b506104d5600480360360608110156105af57600080fd5b506001600160a01b03813581169160208101359091169060400135611453565b3480156105db57600080fd5b50610387600480360360208110156105f257600080fd5b50356114db565b34801561060557600080fd5b5061060e61154c565b6040805160ff9092168252519081900360200190f35b34801561063057600080fd5b506103876004803603602081101561064757600080fd5b50356001600160a01b0316611556565b34801561066357600080fd5b506104d56004803603604081101561067a57600080fd5b506001600160a01b0381351690602001356116f6565b34801561069c57600080fd5b50610400600480360360208110156106b357600080fd5b5035611744565b3480156106c657600080fd5b50610400600480360360208110156106dd57600080fd5b503561174f565b3480156106f057600080fd5b506107946004803603604081101561070757600080fd5b810190602081018135600160201b81111561072157600080fd5b82018360208201111561073357600080fd5b803590602001918460208302840111600160201b8311171561075457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550509135925061180a915050565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156107d05781810151838201526020016107b8565b505050509050019250505060405180910390f35b3480156107f057600080fd5b506104006004803603604081101561080757600080fd5b506001600160a01b03813516906020013561196c565b34801561082957600080fd5b50610570611978565b34801561083e57600080fd5b50610387611987565b34801561085357600080fd5b506104006004803603602081101561086a57600080fd5b810190602081018135600160201b81111561088457600080fd5b82018360208201111561089657600080fd5b803590602001918460208302840111600160201b831117156108b757600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550611a49945050505050565b34801561090157600080fd5b50610570611afb565b34801561091657600080fd5b506104006004803603602081101561092d57600080fd5b50356001600160a01b0316611b0a565b34801561094957600080fd5b506103876004803603602081101561096057600080fd5b50356001600160a01b0316611b25565b34801561097c57600080fd5b506109a36004803603602081101561099357600080fd5b50356001600160a01b0316611d8d565b604051808060200180602001858152602001848152602001838103835287818151815260200191508051906020019060200280838360005b838110156109f35781810151838201526020016109db565b50505050905001838103825286818151815260200191508051906020019060200280838360005b83811015610a32578181015183820152602001610a1a565b50505050905001965050505050505060405180910390f35b348015610a5657600080fd5b5061038760048036036020811015610a6d57600080fd5b50356001600160a01b0316611f50565b348015610a8957600080fd5b5061040060048036036040811015610aa057600080fd5b506001600160a01b038135169060200135611f7a565b348015610ac257600080fd5b50610570611fe9565b348015610ad757600080fd5b5061040060048036036040811015610aee57600080fd5b506001600160a01b038135169060200135611ff8565b348015610b1057600080fd5b5061038760048036036040811015610b2757600080fd5b506001600160a01b038135169060200135612056565b348015610b4957600080fd5b50610427612118565b348015610b5e57600080fd5b5061040060048036036020811015610b7557600080fd5b5035612122565b348015610b8857600080fd5b5061057061212d565b348015610b9d57600080fd5b5061038760048036036020811015610bb457600080fd5b50356001600160a01b031661213c565b348015610bd057600080fd5b5061038760048036036020811015610be757600080fd5b50356001600160a01b0316612267565b348015610c0357600080fd5b506104d560048036036040811015610c1a57600080fd5b506001600160a01b038135169060200135612341565b348015610c3c57600080fd5b506104d560048036036040811015610c5357600080fd5b506001600160a01b0381351690602001356123a9565b348015610c7557600080fd5b506103876123bd565b61038760048036036020811015610c9457600080fd5b50356001600160a01b031661243d565b348015610cb057600080fd5b5061038760048036036040811015610cc757600080fd5b506001600160a01b0381351690602001356124e4565b348015610ce957600080fd5b5061040060048036036040811015610d0057600080fd5b506001600160a01b0381358116916020013516612651565b348015610d2457600080fd5b5061038760048036036020811015610d3b57600080fd5b50356001600160a01b03166126c8565b348015610d5757600080fd5b506104d5612724565b348015610d6c57600080fd5b5061040060048036036020811015610d8357600080fd5b5035612734565b348015610d9657600080fd5b5061038760048036036040811015610dad57600080fd5b506001600160a01b03813516906020013561273f565b610387611014565b348015610dd757600080fd5b5061038760048036036020811015610dee57600080fd5b50356001600160a01b0316612760565b348015610e0a57600080fd5b5061040060048036036020811015610e2157600080fd5b50356001600160a01b03166127d9565b348015610e3d57600080fd5b5061040060048036036040811015610e5457600080fd5b506001600160a01b038135811691602001351661283f565b348015610e7857600080fd5b5061040061286a565b348015610e8d57600080fd5b5061040060048036036040811015610ea457600080fd5b506001600160a01b038135169060200135612874565b348015610ec657600080fd5b5061040060048036036060811015610edd57600080fd5b506001600160a01b038135811691602081013590911690604001356128e8565b348015610f0957600080fd5b506109a360048036036040811015610f2057600080fd5b506001600160a01b03813516906020013561299c565b348015610f4257600080fd5b5061040060048036036040811015610f5957600080fd5b506001600160a01b038135169060200135612b68565b348015610f7b57600080fd5b50610400612bd5565b348015610f9057600080fd5b5061040060048036036020811015610fa757600080fd5b5035612bdf565b348015610fba57600080fd5b5061040060048036036020811015610fd157600080fd5b50356001600160a01b0316612c4a565b348015610fed57600080fd5b506103876004803603602081101561100457600080fd5b50356001600160a01b0316612ca0565b61101e3334612e1f565b60408051348152905133917fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c919081900360200190a2565b61105e612f0f565b6001600160a01b0316636230001a338461107733611b0a565b856040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b1580156110d557600080fd5b505af11580156110e9573d6000803e3d6000fd5b505050505050565b60006110fb612f70565b6001600160a01b03166304bb4e4384846040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b15801561114f57600080fd5b505afa158015611163573d6000803e3d6000fd5b505050506040513d602081101561117957600080fd5b505190505b92915050565b606061118e612fd1565b905090565b60006111a76111a0613067565b848461306b565b50600192915050565b600c546001600160a01b03163314806111d357506011546001600160a01b031633145b611224576040805162461bcd60e51b815260206004820152601a60248201527f6f6e6c7920676f7665726e616e6365206f72206d616e61676572000000000000604482015290519081900360640190fd5b61122d81613157565b600e546001600160a01b0316156112a457600e54604080516313de97f560e01b81526004810184905290516001600160a01b03909216916313de97f59160248082019260009290919082900301818387803b15801561128b57600080fd5b505af115801561129f573d6000803e3d6000fd5b505050505b600f546001600160a01b0316158015906112cf5750600e54600f546001600160a01b03908116911614155b1561133a57600f54604080516313de97f560e01b81526004810184905290516001600160a01b03909216916313de97f59160248082019260009290919082900301818387803b15801561132157600080fd5b505af1158015611335573d6000803e3d6000fd5b505050505b6010546001600160a01b0316156113b157601054604080516313de97f560e01b81526004810184905290516001600160a01b03909216916313de97f59160248082019260009290919082900301818387803b15801561139857600080fd5b505af11580156113ac573d6000803e3d6000fd5b505050505b50565b60006113be612f70565b6001600160a01b031663142d1018836040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561140a57600080fd5b505afa15801561141e573d6000803e3d6000fd5b505050506040513d602081101561143457600080fd5b505190505b919050565b60025490565b600f546001600160a01b031690565b60006114608484846131db565b6114d08461146c613067565b6114cb85604051806060016040528060288152602001614485602891396001600160a01b038a166000908152600160205260408120906114aa613067565b6001600160a01b031681526020810191909152604001600020549190613336565b61306b565b5060015b9392505050565b6114e533826133cd565b60408051828152905133917f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65919081900360200190a2604051339082156108fc029083906000818181858888f19350505050158015611548573d6000803e3d6000fd5b5050565b600061118e6134c9565b61155e6134d2565b6001600160a01b0381161561168757306001600160a01b0316816001600160a01b031663653718836040518163ffffffff1660e01b815260040160206040518083038186803b1580156115b057600080fd5b505afa1580156115c4573d6000803e3d6000fd5b505050506040513d60208110156115da57600080fd5b50516001600160a01b0316146116215760405162461bcd60e51b81526004018080602001828103825260228152602001806145a96022913960400191505060405180910390fd5b806001600160a01b03166313de97f5611638613525565b6040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561166e57600080fd5b505af1158015611682573d6000803e3d6000fd5b505050505b600e5460408051600081526001600160a01b03928316602082015291831682820152517fbec98a6c0f609cda6b9f23b95824ba6ac733cb57edd17d344f2f2796844007399181900360600190a1600e80546001600160a01b0319166001600160a01b0392909216919091179055565b60006111a7611703613067565b846114cb8560016000611714613067565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549061352b565b600061117e82612122565b600b546000906001600160a01b031633146117a9576040805162461bcd60e51b815260206004820152601560248201527413db9b1e4818db19585b995c8818dbdb9d1c9858dd605a1b604482015290519081900360640190fd5b600a5482106117ff576040805162461bcd60e51b815260206004820152601e60248201527f4e6f20636c65616e757020616674657220636c65616e757020626c6f636b0000604482015290519081900360640190fd5b61117e600983613585565b6060611814612f70565b6001600160a01b03166349e3c7e584846040518363ffffffff1660e01b81526004018080602001838152602001828103825284818151815260200191508051906020019060200280838360005b83811015611879578181015183820152602001611861565b50505050905001935050505060006040518083038186803b15801561189d57600080fd5b505afa1580156118b1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260208110156118da57600080fd5b8101908080516040519392919084600160201b8211156118f957600080fd5b90830190602082018581111561190e57600080fd5b82518660208202830111600160201b8211171561192a57600080fd5b82525081516020918201928201910280838360005b8381101561195757818101518382015260200161193f565b50505050905001604052505050905092915050565b60006114d483836135b9565b600c546001600160a01b031681565b600d546001600160a01b031633146119d6576040805162461bcd60e51b815260206004820152600d60248201526c1b9bdd0818db185a5b585a5b9d609a1b604482015290519081900360640190fd5b600c54600d54604080516001600160a01b03938416815292909116602083015280517f434a2db650703b36c824e745330d6397cdaa9ee2cc891a4938ae853e1c50b68d9281900390910190a1600d8054600c80546001600160a01b03199081166001600160a01b03841617909155169055565b6000611a53612f0f565b6001600160a01b0316630f8b8af733846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019060200280838360005b83811015611ac1578181015183820152602001611aa9565b505050509050019350505050602060405180830381600087803b158015611ae757600080fd5b505af115801561141e573d6000803e3d6000fd5b600d546001600160a01b031681565b6001600160a01b031660009081526020819052604090205490565b611b2d6134d2565b6001600160a01b03811615611d1e57306001600160a01b0316816001600160a01b031663653718836040518163ffffffff1660e01b815260040160206040518083038186803b158015611b7f57600080fd5b505afa158015611b93573d6000803e3d6000fd5b505050506040513d6020811015611ba957600080fd5b50516001600160a01b031614611bf05760405162461bcd60e51b81526004018080602001828103825260228152602001806145a96022913960400191505060405180910390fd5b601154600160a01b900460ff161580611c6a5750806001600160a01b031663aa94d3f26040518163ffffffff1660e01b815260040160206040518083038186803b158015611c3d57600080fd5b505afa158015611c51573d6000803e3d6000fd5b505050506040513d6020811015611c6757600080fd5b50515b611ca55760405162461bcd60e51b81526004018080602001828103825260298152602001806144366029913960400191505060405180910390fd5b806001600160a01b03166313de97f5611cbc613525565b6040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b158015611cf257600080fd5b505af1158015611d06573d6000803e3d6000fd5b50506011805460ff60a01b1916600160a01b17905550505b600f5460408051600181526001600160a01b03928316602082015291831682820152517fbec98a6c0f609cda6b9f23b95824ba6ac733cb57edd17d344f2f2796844007399181900360600190a1600f80546001600160a01b0319166001600160a01b0392909216919091179055565b606080600080611d9b612f70565b6001600160a01b0316637de5b8ed866040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060006040518083038186803b158015611de757600080fd5b505afa158015611dfb573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526080811015611e2457600080fd5b8101908080516040519392919084600160201b821115611e4357600080fd5b908301906020820185811115611e5857600080fd5b82518660208202830111600160201b82111715611e7457600080fd5b82525081516020918201928201910280838360005b83811015611ea1578181015183820152602001611e89565b5050505090500160405260200180516040519392919084600160201b821115611ec957600080fd5b908301906020820185811115611ede57600080fd5b82518660208202830111600160201b82111715611efa57600080fd5b82525081516020918201928201910280838360005b83811015611f27578181015183820152602001611f0f565b505050509190910160409081526020830151920151959b949a5090985093965091945050505050565b611f586134d2565b601180546001600160a01b0319166001600160a01b0392909216919091179055565b6000611f84612f70565b6001600160a01b0316633150392784611f9d868661196c565b856040518463ffffffff1660e01b815260040180846001600160a01b03168152602001838152602001828152602001935050505060206040518083038186803b15801561114f57600080fd5b6010546001600160a01b031690565b6000612002612f70565b6001600160a01b03166392bfe6d884846040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b15801561114f57600080fd5b61209d82336114cb8460405180604001604052806014815260200173616c6c6f77616e63652062656c6f77207a65726f60601b815250612096883361283f565b9190613336565b6120a782826133cd565b6040805182815290516001600160a01b038416917f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65919081900360200190a2604051339082156108fc029083906000818181858888f19350505050158015612113573d6000803e3d6000fd5b505050565b606061118e613611565b600061117e82613672565b600e546001600160a01b031690565b6121446134d2565b306001600160a01b0316816001600160a01b031663653718836040518163ffffffff1660e01b815260040160206040518083038186803b15801561218757600080fd5b505afa15801561219b573d6000803e3d6000fd5b505050506040513d60208110156121b157600080fd5b50516001600160a01b0316146121f85760405162461bcd60e51b815260040180806020018281038252603d8152602001806144ad603d913960400191505060405180910390fd5b60105460408051600281526001600160a01b03928316602082015291831682820152517fbec98a6c0f609cda6b9f23b95824ba6ac733cb57edd17d344f2f2796844007399181900360600190a1601080546001600160a01b0319166001600160a01b0392909216919091179055565b600d54600160a01b900460ff16156122bd576040805162461bcd60e51b8152602060048201526014602482015273696e697469616c6973656420213d2066616c736560601b604482015290519081900360640190fd5b600d805460ff60a01b1916600160a01b179055600c54604080516001600160a01b039283168152918316602083015280517f434a2db650703b36c824e745330d6397cdaa9ee2cc891a4938ae853e1c50b68d9281900390910190a1600c80546001600160a01b039092166001600160a01b0319928316179055600d80549091169055565b60006111a761234e613067565b846114cb856040518060600160405280602581526020016145846025913960016000612378613067565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190613336565b60006111a76123b6613067565b84846131db565b6123c5612f0f565b6001600160a01b03166305109ecf336123dd33611b0a565b6040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050600060405180830381600087803b15801561242357600080fd5b505af1158015612437573d6000803e3d6000fd5b50505050565b6001600160a01b038116612498576040805162461bcd60e51b815260206004820152601e60248201527f43616e6e6f74206465706f73697420746f207a65726f20616464726573730000604482015290519081900360640190fd5b6124a28134612e1f565b6040805134815290516001600160a01b038316917fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c919081900360200190a250565b600f54600e546001600160a01b039182169116811561258f57816001600160a01b031663c7c62fab3386612518338861196c565b876040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b15801561257657600080fd5b505af115801561258a573d6000803e3d6000fd5b505050505b816001600160a01b0316816001600160a01b0316141580156125b957506001600160a01b03811615155b1561243757806001600160a01b031663c7c62fab33866125d9338861196c565b876040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b15801561263757600080fd5b505af1925050508015612648575060015b61243757612437565b600061265b612f70565b6001600160a01b0316639dc6b9f2848461267487611b0a565b6040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b03168152602001828152602001935050505060206040518083038186803b15801561114f57600080fd5b6126d06134d2565b600d80546001600160a01b0383166001600160a01b0319909116811790915560408051918252517f1f95fb40be3a947982072902a887b521248d1d8931a39eb38f84f4d6fd758b699181900360200190a150565b601154600160a01b900460ff1681565b600061117e826136c1565b612747612f0f565b6001600160a01b031663404d9e82338461107733611b0a565b6127686134d2565b600c54604080516001600160a01b039283168152918316602083015280517f434a2db650703b36c824e745330d6397cdaa9ee2cc891a4938ae853e1c50b68d9281900390910190a1600c80546001600160a01b039092166001600160a01b0319928316179055600d80549091169055565b60006127e3612f70565b6001600160a01b0316634a03d556836127fb85611b0a565b6040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b15801561140a57600080fd5b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600061118e613525565b600061287e612f70565b6001600160a01b031663e587497e84846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b1580156128d457600080fd5b505af1158015611163573d6000803e3d6000fd5b60006128f2612f70565b6001600160a01b031663833aca92858561290c888761196c565b866040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b0316815260200183815260200182815260200194505050505060206040518083038186803b15801561296857600080fd5b505afa15801561297c573d6000803e3d6000fd5b505050506040513d602081101561299257600080fd5b5051949350505050565b6060806000806129aa612f70565b6001600160a01b031663ed475a7987876040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060006040518083038186803b1580156129fe57600080fd5b505afa158015612a12573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526080811015612a3b57600080fd5b8101908080516040519392919084600160201b821115612a5a57600080fd5b908301906020820185811115612a6f57600080fd5b82518660208202830111600160201b82111715612a8b57600080fd5b82525081516020918201928201910280838360005b83811015612ab8578181015183820152602001612aa0565b5050505090500160405260200180516040519392919084600160201b821115612ae057600080fd5b908301906020820185811115612af557600080fd5b82518660208202830111600160201b82111715612b1157600080fd5b82525081516020918201928201910280838360005b83811015612b3e578181015183820152602001612b26565b505050509190910160409081526020830151920151959c949b509099509397509195505050505050565b600b546000906001600160a01b03163314612bc2576040805162461bcd60e51b815260206004820152601560248201527413db9b1e4818db19585b995c8818dbdb9d1c9858dd605a1b604482015290519081900360640190fd5b600a546114d490600690859085906137af565b600061118e61143e565b600b546000906001600160a01b03163314612c39576040805162461bcd60e51b815260206004820152601560248201527413db9b1e4818db19585b995c8818dbdb9d1c9858dd605a1b604482015290519081900360640190fd5b600a5461117e9060079084906137f5565b6000612c54612f70565b6001600160a01b031663f6837767836040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561140a57600080fd5b612ca86134d2565b612cb1816138e2565b600e546001600160a01b031615612d2957600e546040805163f6a494af60e01b81526001600160a01b0384811660048301529151919092169163f6a494af91602480830192600092919082900301818387803b158015612d1057600080fd5b505af1158015612d24573d6000803e3d6000fd5b505050505b600f546001600160a01b031615801590612d545750600e54600f546001600160a01b03908116911614155b15612dc057600f546040805163f6a494af60e01b81526001600160a01b0384811660048301529151919092169163f6a494af91602480830192600092919082900301818387803b158015612da757600080fd5b505af1158015612dbb573d6000803e3d6000fd5b505050505b6010546001600160a01b0316156113b1576010546040805163f6a494af60e01b81526001600160a01b0384811660048301529151919092169163f6a494af91602480830192600092919082900301818387803b15801561139857600080fd5b6001600160a01b038216612e7a576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b612e8660008383613904565b600254612e93908261352b565b6002556001600160a01b038216600090815260208190526040902054612eb9908261352b565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b600f546000906001600160a01b03168061118e576040805162461bcd60e51b815260206004820152601e60248201527f546f6b656e206d697373696e67207772697465205650436f6e74726163740000604482015290519081900360640190fd5b600e546000906001600160a01b03168061118e576040805162461bcd60e51b815260206004820152601d60248201527f546f6b656e206d697373696e672072656164205650436f6e7472616374000000604482015290519081900360640190fd5b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561305d5780601f106130325761010080835404028352916020019161305d565b820191906000526020600020905b81548152906001019060200180831161304057829003601f168201915b5050505050905090565b3390565b6001600160a01b0383166130b05760405162461bcd60e51b81526004018080602001828103825260248152602001806145306024913960400191505060405180910390fd5b6001600160a01b0382166130f55760405162461bcd60e51b81526004018080602001828103825260228152602001806143996022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600a548110156131985760405162461bcd60e51b81526004018080602001828103825260288152602001806143e16028913960400191505060405180910390fd5b4381106131d65760405162461bcd60e51b81526004018080602001828103825260218152602001806143786021913960400191505060405180910390fd5b600a55565b6001600160a01b0383166132205760405162461bcd60e51b815260040180806020018281038252602581526020018061450b6025913960400191505060405180910390fd5b6001600160a01b0382166132655760405162461bcd60e51b81526004018080602001828103825260238152602001806143336023913960400191505060405180910390fd5b613270838383613904565b6132ad816040518060600160405280602681526020016143bb602691396001600160a01b0386166000908152602081905260409020549190613336565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546132dc908261352b565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156133c55760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561338a578181015183820152602001613372565b50505050905090810190601f1680156133b75780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b0382166134125760405162461bcd60e51b81526004018080602001828103825260218152602001806144ea6021913960400191505060405180910390fd5b61341e82600083613904565b61345b81604051806060016040528060228152602001614356602291396001600160a01b0385166000908152602081905260409020549190613336565b6001600160a01b0383166000908152602081905260409020556002546134819082613b13565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b60055460ff1690565b600c546001600160a01b03163314613523576040805162461bcd60e51b815260206004820152600f60248201526e6f6e6c7920676f7665726e616e636560881b604482015290519081900360640190fd5b565b600a5490565b6000828201838110156114d4576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600081815260208390526040812054156135b05750600081815260208390526040812055600161117e565b50600092915050565b600081600a548110156135fd5760405162461bcd60e51b815260040180806020018281038252602d815260200180614409602d913960400191505060405180910390fd5b61360960068585613b70565b949350505050565b60048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561305d5780601f106130325761010080835404028352916020019161305d565b600081600a548110156136b65760405162461bcd60e51b815260040180806020018281038252602d815260200180614409602d913960400191505060405180910390fd5b6114d4600784613b9b565b600081600a548110156137055760405162461bcd60e51b815260040180806020018281038252602d815260200180614409602d913960400191505060405180910390fd5b438310613759576040805162461bcd60e51b815260206004820181905260248201527f43616e206f6e6c79206265207573656420666f72207061737420626c6f636b73604482015290519081900360640190fd5b6000806137696009600787613cde565b9150915080156137a7576040805186815290517ffec477a10b4fcdfdf1114eb32b3caf6118b2d76d20e1fcb70007274bb4b616be9181900360200190a15b509392505050565b60006001600160a01b038416156137ea576001600160a01b03841660009081526020869052604090206137e39084846137f5565b9050613609565b506000949350505050565b600081613804575060006114d4565b6001840154600160401b90046001600160401b0316806138285760009150506114d4565b60018501546001600160401b0316600061384e613845838861352b565b60018503613d3c565b9050815b8181108015613883575060018101600090815260208990526040902054600160c01b90046001600160401b03168610155b1561389f57600081815260208990526040812055600101613852565b828111156138d4576138b081613d52565b60018901805467ffffffffffffffff19166001600160401b03929092169190911790555b919091039695505050505050565b600b80546001600160a01b0319166001600160a01b0392909216919091179055565b816001600160a01b0316836001600160a01b0316141561396b576040805162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000604482015290519081900360640190fd5b60006001600160a01b03841661398257600061398b565b61398b84611b0a565b905060006001600160a01b0384166139a45760006139ad565b6139ad84611b0a565b600f549091506001600160a01b03168015613a47576040805163756da1b160e11b81526001600160a01b038881166004830152878116602483015260448201869052606482018590526084820187905291519183169163eadb43629160a48082019260009290919082900301818387803b158015613a2a57600080fd5b505af1158015613a3e573d6000803e3d6000fd5b50505050613a6c565b601154600160a01b900460ff16613a6c576011805460ff60a01b1916600160a01b1790555b6010546001600160a01b03168015613aff576040805163756da1b160e11b81526001600160a01b038981166004830152888116602483015260448201879052606482018690526084820188905291519183169163eadb43629160a48082019260009290919082900301818387803b158015613ae657600080fd5b505af1158015613afa573d6000803e3d6000fd5b505050505b613b0a878787613d9a565b50505050505050565b600082821115613b6a576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6001600160a01b0382166000908152602084905260408120613b928184613b9b565b95945050505050565b6001820154600090600160401b90046001600160401b031680613bc257600091505061117e565b4383101580613bf457506000198101600090815260208590526040902054600160c01b90046001600160401b03168310155b15613c1c57600019016000908152602084905260409020546001600160c01b0316905061117e565b60018401546001600160401b039081166000818152602087905260409020549091600160c01b90910416841015613c95578015613c8a5760405162461bcd60e51b81526004018080602001828103825260308152602001806145546030913960400191505060405180910390fd5b60009250505061117e565b6001850154600090613cbb9087908490600160401b90046001600160401b031688613dda565b6000908152602087905260409020546001600160c01b0316935050505092915050565b60008181526020849052604081205481908015613d045760001901915060009050613d34565b6000613d108686613b9b565b9050613d1d81600161352b565b600086815260208990526040902055925060019150505b935093915050565b6000818310613d4b57816114d4565b5090919050565b6000600160401b8210613d965760405162461bcd60e51b815260040180806020018281038252602681526020018061445f6026913960400191505060405180910390fd5b5090565b6001600160a01b038316613db757613db28282613e64565b612113565b6001600160a01b038216613dcf57613db28382613ec1565b612113838383613f69565b60008381613de9856001613b13565b90505b81811115613e5a576000613e166002613e106001613e0a868861352b565b9061352b565b90613f9f565b600081815260208a90526040902054909150600160c01b90046001600160401b03168510613e4657809250613e54565b613e51816001613b13565b91505b50613dec565b5095945050505050565b6000613e7482613e0a854361196c565b9050613e8260068483614006565b600a54613e969060069085906002906137af565b50613eaf613ea783613e0a43612122565b600790614024565b600a54612437906007906002906137f5565b6000613f008260405180604001604052806016815260200175213ab937103a37b7903134b3903337b91037bbb732b960511b815250612096864361196c565b9050613f0e60068483614006565b600a54613f229060069085906002906137af565b50613eaf613ea7836040518060400160405280601d81526020017f4275726e20746f6f2062696720666f7220746f74616c20737570706c7900000081525061209643612122565b613f7660068484846141e5565b600a54613f8a9060069085906002906137af565b50600a546124379060069084906002906137af565b6000808211613ff5576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381613ffe57fe5b049392505050565b6001600160a01b038216600090815260208490526040902061243781835b6001820154600160401b90046001600160401b0316806140db57604051806040016040528061405284614274565b6001600160c01b0316815260200161406943613d52565b6001600160401b03908116909152600080805260208681526040909120835181549490920151909216600160c01b026001600160c01b039182166001600160c01b0319909416939093171691909117905560018301805467ffffffffffffffff60401b1916600160401b179055612113565b600019810160009081526020849052604090208054600160c01b90046001600160401b0316438114156141315761411184614274565b82546001600160c01b0319166001600160c01b03919091161782556113ac565b80431161413a57fe5b604051806040016040528061414e86614274565b6001600160c01b0316815260200161416543613d52565b6001600160401b039081169091526000858152602088815260409091208351815494909201518316600160c01b026001600160c01b039283166001600160c01b0319909516949094179091169290921790915560018087018054918601909216600160401b0267ffffffffffffffff60401b199091161790555050505050565b806141ef57612437565b6001600160a01b03831615801561420d57506001600160a01b038216155b1561421457fe5b6001600160a01b038316156142485760006142398261423387876142ce565b90613b13565b9050614246858583614006565b505b6001600160a01b0382161561243757600061426782613e0a87866142ce565b90506113ac858483614006565b6000600160c01b8210613d96576040805162461bcd60e51b815260206004820152601d60248201527f76616c756520646f65736e27742066697420696e203139322062697473000000604482015290519081900360640190fd5b6001600160a01b0381166000908152602083905260408120613609816001810154600090600160401b90046001600160401b031680614311576000915050611439565b6000190160009081526020929092525060409020546001600160c01b03169056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e6365436c65616e757020626c6f636b206d75737420626520696e20746865207061737445524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365436c65616e757020626c6f636b206e756d626572206d757374206e65766572206465637265617365436865636b506f696e7461626c653a2072656164696e672066726f6d20636c65616e65642d757020626c6f636b5650436f6e7472616374206e6f7420636f6e6669677572656420666f72207265706c6163656d656e7453616665436173743a2076616c756520646f65736e27742066697420696e203634206269747345524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365476f7665726e616e636520766f746520706f77657220636f6e747261637420646f6573206e6f742062656c6f6e6720746f207468697320746f6b656e2e45524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373436865636b506f696e74486973746f72793a2072656164696e672066726f6d20636c65616e65642d757020626c6f636b45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f5650436f6e7472616374206e6f74206f776e6564206279207468697320746f6b656ea26469706673582212203d7d32d1c7513fe9400879b42eef0f4a05e75bdf9318dd7af45953143cbedb2b64736f6c63430007060033",
  deployedBytecode:
    "0x60806040526004361061037a5760003560e01c80639470b0bd116101d1578063caeb942b11610102578063e587497e116100a0578063f5f3d4f71161006f578063f5f3d4f714610f6f578063f62f8f3a14610f84578063f683776714610fae578063f6a494af14610fe157610389565b8063e587497e14610e81578063e64767aa14610eba578063ed475a7914610efd578063f0e292c914610f3657610389565b8063d38bfff4116100dc578063d38bfff414610dcb578063d6aa0b7714610dfe578063dd62ed3e14610e31578063deea13e714610e6c57610389565b8063caeb942b14610d60578063d06dc3ad14610d8a578063d0e30db014610dc357610389565b8063a9059cbb1161016f578063bbd6fbf811610149578063bbd6fbf814610ca4578063be0ca74714610cdd578063c373a08e14610d18578063c787a8fc14610d4b57610389565b8063a9059cbb14610c30578063b302f39314610c69578063b760faf914610c7e57610389565b80639b3baa0e116101ab5780639b3baa0e14610b7c5780639ca2231a14610b915780639d6a890f14610bc4578063a457c2d714610bf757610389565b80639470b0bd14610b0457806395d89b4114610b3d578063981b24d014610b5257610389565b806343ea370b116102ab57806370a08231116102495780637f4fcaa9116102235780637f4fcaa914610a4a57806383035a8214610a7d5780638c2b8ae114610ab657806392bfe6d814610acb57610389565b806370a082311461090a578063755d10a41461093d5780637de5b8ed1461097057610389565b80635aa6e675116102855780635aa6e6751461081d5780635d36b190146108325780635d6d11eb1461084757806360f7ac97146108f557610389565b806343ea370b146106ba57806349e3c7e5146106e45780634ee2cd7e146107e457610389565b80631fec092a11610318578063313ce567116102f2578063313ce567146105f957806331d12a161461062457806339509351146106575780633e5aa26a1461069057610389565b80631fec092a1461055b57806323b872dd1461058c5780632e1a7d4d146105cf57610389565b8063095ea7b311610354578063095ea7b31461049c57806313de97f5146104e9578063142d10181461051357806318160ddd1461054657610389565b8063026e402b1461038e57806304bb4e43146103c757806306fdde031461041257610389565b3661038957610387611014565b005b600080fd5b34801561039a57600080fd5b50610387600480360360408110156103b157600080fd5b506001600160a01b038135169060200135611056565b3480156103d357600080fd5b50610400600480360360408110156103ea57600080fd5b506001600160a01b0381351690602001356110f1565b60408051918252519081900360200190f35b34801561041e57600080fd5b50610427611184565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610461578181015183820152602001610449565b50505050905090810190601f16801561048e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156104a857600080fd5b506104d5600480360360408110156104bf57600080fd5b506001600160a01b038135169060200135611193565b604080519115158252519081900360200190f35b3480156104f557600080fd5b506103876004803603602081101561050c57600080fd5b50356111b0565b34801561051f57600080fd5b506104006004803603602081101561053657600080fd5b50356001600160a01b03166113b4565b34801561055257600080fd5b5061040061143e565b34801561056757600080fd5b50610570611444565b604080516001600160a01b039092168252519081900360200190f35b34801561059857600080fd5b506104d5600480360360608110156105af57600080fd5b506001600160a01b03813581169160208101359091169060400135611453565b3480156105db57600080fd5b50610387600480360360208110156105f257600080fd5b50356114db565b34801561060557600080fd5b5061060e61154c565b6040805160ff9092168252519081900360200190f35b34801561063057600080fd5b506103876004803603602081101561064757600080fd5b50356001600160a01b0316611556565b34801561066357600080fd5b506104d56004803603604081101561067a57600080fd5b506001600160a01b0381351690602001356116f6565b34801561069c57600080fd5b50610400600480360360208110156106b357600080fd5b5035611744565b3480156106c657600080fd5b50610400600480360360208110156106dd57600080fd5b503561174f565b3480156106f057600080fd5b506107946004803603604081101561070757600080fd5b810190602081018135600160201b81111561072157600080fd5b82018360208201111561073357600080fd5b803590602001918460208302840111600160201b8311171561075457600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550509135925061180a915050565b60408051602080825283518183015283519192839290830191858101910280838360005b838110156107d05781810151838201526020016107b8565b505050509050019250505060405180910390f35b3480156107f057600080fd5b506104006004803603604081101561080757600080fd5b506001600160a01b03813516906020013561196c565b34801561082957600080fd5b50610570611978565b34801561083e57600080fd5b50610387611987565b34801561085357600080fd5b506104006004803603602081101561086a57600080fd5b810190602081018135600160201b81111561088457600080fd5b82018360208201111561089657600080fd5b803590602001918460208302840111600160201b831117156108b757600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550611a49945050505050565b34801561090157600080fd5b50610570611afb565b34801561091657600080fd5b506104006004803603602081101561092d57600080fd5b50356001600160a01b0316611b0a565b34801561094957600080fd5b506103876004803603602081101561096057600080fd5b50356001600160a01b0316611b25565b34801561097c57600080fd5b506109a36004803603602081101561099357600080fd5b50356001600160a01b0316611d8d565b604051808060200180602001858152602001848152602001838103835287818151815260200191508051906020019060200280838360005b838110156109f35781810151838201526020016109db565b50505050905001838103825286818151815260200191508051906020019060200280838360005b83811015610a32578181015183820152602001610a1a565b50505050905001965050505050505060405180910390f35b348015610a5657600080fd5b5061038760048036036020811015610a6d57600080fd5b50356001600160a01b0316611f50565b348015610a8957600080fd5b5061040060048036036040811015610aa057600080fd5b506001600160a01b038135169060200135611f7a565b348015610ac257600080fd5b50610570611fe9565b348015610ad757600080fd5b5061040060048036036040811015610aee57600080fd5b506001600160a01b038135169060200135611ff8565b348015610b1057600080fd5b5061038760048036036040811015610b2757600080fd5b506001600160a01b038135169060200135612056565b348015610b4957600080fd5b50610427612118565b348015610b5e57600080fd5b5061040060048036036020811015610b7557600080fd5b5035612122565b348015610b8857600080fd5b5061057061212d565b348015610b9d57600080fd5b5061038760048036036020811015610bb457600080fd5b50356001600160a01b031661213c565b348015610bd057600080fd5b5061038760048036036020811015610be757600080fd5b50356001600160a01b0316612267565b348015610c0357600080fd5b506104d560048036036040811015610c1a57600080fd5b506001600160a01b038135169060200135612341565b348015610c3c57600080fd5b506104d560048036036040811015610c5357600080fd5b506001600160a01b0381351690602001356123a9565b348015610c7557600080fd5b506103876123bd565b61038760048036036020811015610c9457600080fd5b50356001600160a01b031661243d565b348015610cb057600080fd5b5061038760048036036040811015610cc757600080fd5b506001600160a01b0381351690602001356124e4565b348015610ce957600080fd5b5061040060048036036040811015610d0057600080fd5b506001600160a01b0381358116916020013516612651565b348015610d2457600080fd5b5061038760048036036020811015610d3b57600080fd5b50356001600160a01b03166126c8565b348015610d5757600080fd5b506104d5612724565b348015610d6c57600080fd5b5061040060048036036020811015610d8357600080fd5b5035612734565b348015610d9657600080fd5b5061038760048036036040811015610dad57600080fd5b506001600160a01b03813516906020013561273f565b610387611014565b348015610dd757600080fd5b5061038760048036036020811015610dee57600080fd5b50356001600160a01b0316612760565b348015610e0a57600080fd5b5061040060048036036020811015610e2157600080fd5b50356001600160a01b03166127d9565b348015610e3d57600080fd5b5061040060048036036040811015610e5457600080fd5b506001600160a01b038135811691602001351661283f565b348015610e7857600080fd5b5061040061286a565b348015610e8d57600080fd5b5061040060048036036040811015610ea457600080fd5b506001600160a01b038135169060200135612874565b348015610ec657600080fd5b5061040060048036036060811015610edd57600080fd5b506001600160a01b038135811691602081013590911690604001356128e8565b348015610f0957600080fd5b506109a360048036036040811015610f2057600080fd5b506001600160a01b03813516906020013561299c565b348015610f4257600080fd5b5061040060048036036040811015610f5957600080fd5b506001600160a01b038135169060200135612b68565b348015610f7b57600080fd5b50610400612bd5565b348015610f9057600080fd5b5061040060048036036020811015610fa757600080fd5b5035612bdf565b348015610fba57600080fd5b5061040060048036036020811015610fd157600080fd5b50356001600160a01b0316612c4a565b348015610fed57600080fd5b506103876004803603602081101561100457600080fd5b50356001600160a01b0316612ca0565b61101e3334612e1f565b60408051348152905133917fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c919081900360200190a2565b61105e612f0f565b6001600160a01b0316636230001a338461107733611b0a565b856040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b1580156110d557600080fd5b505af11580156110e9573d6000803e3d6000fd5b505050505050565b60006110fb612f70565b6001600160a01b03166304bb4e4384846040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b15801561114f57600080fd5b505afa158015611163573d6000803e3d6000fd5b505050506040513d602081101561117957600080fd5b505190505b92915050565b606061118e612fd1565b905090565b60006111a76111a0613067565b848461306b565b50600192915050565b600c546001600160a01b03163314806111d357506011546001600160a01b031633145b611224576040805162461bcd60e51b815260206004820152601a60248201527f6f6e6c7920676f7665726e616e6365206f72206d616e61676572000000000000604482015290519081900360640190fd5b61122d81613157565b600e546001600160a01b0316156112a457600e54604080516313de97f560e01b81526004810184905290516001600160a01b03909216916313de97f59160248082019260009290919082900301818387803b15801561128b57600080fd5b505af115801561129f573d6000803e3d6000fd5b505050505b600f546001600160a01b0316158015906112cf5750600e54600f546001600160a01b03908116911614155b1561133a57600f54604080516313de97f560e01b81526004810184905290516001600160a01b03909216916313de97f59160248082019260009290919082900301818387803b15801561132157600080fd5b505af1158015611335573d6000803e3d6000fd5b505050505b6010546001600160a01b0316156113b157601054604080516313de97f560e01b81526004810184905290516001600160a01b03909216916313de97f59160248082019260009290919082900301818387803b15801561139857600080fd5b505af11580156113ac573d6000803e3d6000fd5b505050505b50565b60006113be612f70565b6001600160a01b031663142d1018836040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561140a57600080fd5b505afa15801561141e573d6000803e3d6000fd5b505050506040513d602081101561143457600080fd5b505190505b919050565b60025490565b600f546001600160a01b031690565b60006114608484846131db565b6114d08461146c613067565b6114cb85604051806060016040528060288152602001614485602891396001600160a01b038a166000908152600160205260408120906114aa613067565b6001600160a01b031681526020810191909152604001600020549190613336565b61306b565b5060015b9392505050565b6114e533826133cd565b60408051828152905133917f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65919081900360200190a2604051339082156108fc029083906000818181858888f19350505050158015611548573d6000803e3d6000fd5b5050565b600061118e6134c9565b61155e6134d2565b6001600160a01b0381161561168757306001600160a01b0316816001600160a01b031663653718836040518163ffffffff1660e01b815260040160206040518083038186803b1580156115b057600080fd5b505afa1580156115c4573d6000803e3d6000fd5b505050506040513d60208110156115da57600080fd5b50516001600160a01b0316146116215760405162461bcd60e51b81526004018080602001828103825260228152602001806145a96022913960400191505060405180910390fd5b806001600160a01b03166313de97f5611638613525565b6040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561166e57600080fd5b505af1158015611682573d6000803e3d6000fd5b505050505b600e5460408051600081526001600160a01b03928316602082015291831682820152517fbec98a6c0f609cda6b9f23b95824ba6ac733cb57edd17d344f2f2796844007399181900360600190a1600e80546001600160a01b0319166001600160a01b0392909216919091179055565b60006111a7611703613067565b846114cb8560016000611714613067565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549061352b565b600061117e82612122565b600b546000906001600160a01b031633146117a9576040805162461bcd60e51b815260206004820152601560248201527413db9b1e4818db19585b995c8818dbdb9d1c9858dd605a1b604482015290519081900360640190fd5b600a5482106117ff576040805162461bcd60e51b815260206004820152601e60248201527f4e6f20636c65616e757020616674657220636c65616e757020626c6f636b0000604482015290519081900360640190fd5b61117e600983613585565b6060611814612f70565b6001600160a01b03166349e3c7e584846040518363ffffffff1660e01b81526004018080602001838152602001828103825284818151815260200191508051906020019060200280838360005b83811015611879578181015183820152602001611861565b50505050905001935050505060006040518083038186803b15801561189d57600080fd5b505afa1580156118b1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405260208110156118da57600080fd5b8101908080516040519392919084600160201b8211156118f957600080fd5b90830190602082018581111561190e57600080fd5b82518660208202830111600160201b8211171561192a57600080fd5b82525081516020918201928201910280838360005b8381101561195757818101518382015260200161193f565b50505050905001604052505050905092915050565b60006114d483836135b9565b600c546001600160a01b031681565b600d546001600160a01b031633146119d6576040805162461bcd60e51b815260206004820152600d60248201526c1b9bdd0818db185a5b585a5b9d609a1b604482015290519081900360640190fd5b600c54600d54604080516001600160a01b03938416815292909116602083015280517f434a2db650703b36c824e745330d6397cdaa9ee2cc891a4938ae853e1c50b68d9281900390910190a1600d8054600c80546001600160a01b03199081166001600160a01b03841617909155169055565b6000611a53612f0f565b6001600160a01b0316630f8b8af733846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019060200280838360005b83811015611ac1578181015183820152602001611aa9565b505050509050019350505050602060405180830381600087803b158015611ae757600080fd5b505af115801561141e573d6000803e3d6000fd5b600d546001600160a01b031681565b6001600160a01b031660009081526020819052604090205490565b611b2d6134d2565b6001600160a01b03811615611d1e57306001600160a01b0316816001600160a01b031663653718836040518163ffffffff1660e01b815260040160206040518083038186803b158015611b7f57600080fd5b505afa158015611b93573d6000803e3d6000fd5b505050506040513d6020811015611ba957600080fd5b50516001600160a01b031614611bf05760405162461bcd60e51b81526004018080602001828103825260228152602001806145a96022913960400191505060405180910390fd5b601154600160a01b900460ff161580611c6a5750806001600160a01b031663aa94d3f26040518163ffffffff1660e01b815260040160206040518083038186803b158015611c3d57600080fd5b505afa158015611c51573d6000803e3d6000fd5b505050506040513d6020811015611c6757600080fd5b50515b611ca55760405162461bcd60e51b81526004018080602001828103825260298152602001806144366029913960400191505060405180910390fd5b806001600160a01b03166313de97f5611cbc613525565b6040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b158015611cf257600080fd5b505af1158015611d06573d6000803e3d6000fd5b50506011805460ff60a01b1916600160a01b17905550505b600f5460408051600181526001600160a01b03928316602082015291831682820152517fbec98a6c0f609cda6b9f23b95824ba6ac733cb57edd17d344f2f2796844007399181900360600190a1600f80546001600160a01b0319166001600160a01b0392909216919091179055565b606080600080611d9b612f70565b6001600160a01b0316637de5b8ed866040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060006040518083038186803b158015611de757600080fd5b505afa158015611dfb573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526080811015611e2457600080fd5b8101908080516040519392919084600160201b821115611e4357600080fd5b908301906020820185811115611e5857600080fd5b82518660208202830111600160201b82111715611e7457600080fd5b82525081516020918201928201910280838360005b83811015611ea1578181015183820152602001611e89565b5050505090500160405260200180516040519392919084600160201b821115611ec957600080fd5b908301906020820185811115611ede57600080fd5b82518660208202830111600160201b82111715611efa57600080fd5b82525081516020918201928201910280838360005b83811015611f27578181015183820152602001611f0f565b505050509190910160409081526020830151920151959b949a5090985093965091945050505050565b611f586134d2565b601180546001600160a01b0319166001600160a01b0392909216919091179055565b6000611f84612f70565b6001600160a01b0316633150392784611f9d868661196c565b856040518463ffffffff1660e01b815260040180846001600160a01b03168152602001838152602001828152602001935050505060206040518083038186803b15801561114f57600080fd5b6010546001600160a01b031690565b6000612002612f70565b6001600160a01b03166392bfe6d884846040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b15801561114f57600080fd5b61209d82336114cb8460405180604001604052806014815260200173616c6c6f77616e63652062656c6f77207a65726f60601b815250612096883361283f565b9190613336565b6120a782826133cd565b6040805182815290516001600160a01b038416917f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65919081900360200190a2604051339082156108fc029083906000818181858888f19350505050158015612113573d6000803e3d6000fd5b505050565b606061118e613611565b600061117e82613672565b600e546001600160a01b031690565b6121446134d2565b306001600160a01b0316816001600160a01b031663653718836040518163ffffffff1660e01b815260040160206040518083038186803b15801561218757600080fd5b505afa15801561219b573d6000803e3d6000fd5b505050506040513d60208110156121b157600080fd5b50516001600160a01b0316146121f85760405162461bcd60e51b815260040180806020018281038252603d8152602001806144ad603d913960400191505060405180910390fd5b60105460408051600281526001600160a01b03928316602082015291831682820152517fbec98a6c0f609cda6b9f23b95824ba6ac733cb57edd17d344f2f2796844007399181900360600190a1601080546001600160a01b0319166001600160a01b0392909216919091179055565b600d54600160a01b900460ff16156122bd576040805162461bcd60e51b8152602060048201526014602482015273696e697469616c6973656420213d2066616c736560601b604482015290519081900360640190fd5b600d805460ff60a01b1916600160a01b179055600c54604080516001600160a01b039283168152918316602083015280517f434a2db650703b36c824e745330d6397cdaa9ee2cc891a4938ae853e1c50b68d9281900390910190a1600c80546001600160a01b039092166001600160a01b0319928316179055600d80549091169055565b60006111a761234e613067565b846114cb856040518060600160405280602581526020016145846025913960016000612378613067565b6001600160a01b03908116825260208083019390935260409182016000908120918d16815292529020549190613336565b60006111a76123b6613067565b84846131db565b6123c5612f0f565b6001600160a01b03166305109ecf336123dd33611b0a565b6040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050600060405180830381600087803b15801561242357600080fd5b505af1158015612437573d6000803e3d6000fd5b50505050565b6001600160a01b038116612498576040805162461bcd60e51b815260206004820152601e60248201527f43616e6e6f74206465706f73697420746f207a65726f20616464726573730000604482015290519081900360640190fd5b6124a28134612e1f565b6040805134815290516001600160a01b038316917fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c919081900360200190a250565b600f54600e546001600160a01b039182169116811561258f57816001600160a01b031663c7c62fab3386612518338861196c565b876040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b15801561257657600080fd5b505af115801561258a573d6000803e3d6000fd5b505050505b816001600160a01b0316816001600160a01b0316141580156125b957506001600160a01b03811615155b1561243757806001600160a01b031663c7c62fab33866125d9338861196c565b876040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b03168152602001838152602001828152602001945050505050600060405180830381600087803b15801561263757600080fd5b505af1925050508015612648575060015b61243757612437565b600061265b612f70565b6001600160a01b0316639dc6b9f2848461267487611b0a565b6040518463ffffffff1660e01b815260040180846001600160a01b03168152602001836001600160a01b03168152602001828152602001935050505060206040518083038186803b15801561114f57600080fd5b6126d06134d2565b600d80546001600160a01b0383166001600160a01b0319909116811790915560408051918252517f1f95fb40be3a947982072902a887b521248d1d8931a39eb38f84f4d6fd758b699181900360200190a150565b601154600160a01b900460ff1681565b600061117e826136c1565b612747612f0f565b6001600160a01b031663404d9e82338461107733611b0a565b6127686134d2565b600c54604080516001600160a01b039283168152918316602083015280517f434a2db650703b36c824e745330d6397cdaa9ee2cc891a4938ae853e1c50b68d9281900390910190a1600c80546001600160a01b039092166001600160a01b0319928316179055600d80549091169055565b60006127e3612f70565b6001600160a01b0316634a03d556836127fb85611b0a565b6040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060206040518083038186803b15801561140a57600080fd5b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b600061118e613525565b600061287e612f70565b6001600160a01b031663e587497e84846040518363ffffffff1660e01b815260040180836001600160a01b0316815260200182815260200192505050602060405180830381600087803b1580156128d457600080fd5b505af1158015611163573d6000803e3d6000fd5b60006128f2612f70565b6001600160a01b031663833aca92858561290c888761196c565b866040518563ffffffff1660e01b815260040180856001600160a01b03168152602001846001600160a01b0316815260200183815260200182815260200194505050505060206040518083038186803b15801561296857600080fd5b505afa15801561297c573d6000803e3d6000fd5b505050506040513d602081101561299257600080fd5b5051949350505050565b6060806000806129aa612f70565b6001600160a01b031663ed475a7987876040518363ffffffff1660e01b815260040180836001600160a01b031681526020018281526020019250505060006040518083038186803b1580156129fe57600080fd5b505afa158015612a12573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526080811015612a3b57600080fd5b8101908080516040519392919084600160201b821115612a5a57600080fd5b908301906020820185811115612a6f57600080fd5b82518660208202830111600160201b82111715612a8b57600080fd5b82525081516020918201928201910280838360005b83811015612ab8578181015183820152602001612aa0565b5050505090500160405260200180516040519392919084600160201b821115612ae057600080fd5b908301906020820185811115612af557600080fd5b82518660208202830111600160201b82111715612b1157600080fd5b82525081516020918201928201910280838360005b83811015612b3e578181015183820152602001612b26565b505050509190910160409081526020830151920151959c949b509099509397509195505050505050565b600b546000906001600160a01b03163314612bc2576040805162461bcd60e51b815260206004820152601560248201527413db9b1e4818db19585b995c8818dbdb9d1c9858dd605a1b604482015290519081900360640190fd5b600a546114d490600690859085906137af565b600061118e61143e565b600b546000906001600160a01b03163314612c39576040805162461bcd60e51b815260206004820152601560248201527413db9b1e4818db19585b995c8818dbdb9d1c9858dd605a1b604482015290519081900360640190fd5b600a5461117e9060079084906137f5565b6000612c54612f70565b6001600160a01b031663f6837767836040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561140a57600080fd5b612ca86134d2565b612cb1816138e2565b600e546001600160a01b031615612d2957600e546040805163f6a494af60e01b81526001600160a01b0384811660048301529151919092169163f6a494af91602480830192600092919082900301818387803b158015612d1057600080fd5b505af1158015612d24573d6000803e3d6000fd5b505050505b600f546001600160a01b031615801590612d545750600e54600f546001600160a01b03908116911614155b15612dc057600f546040805163f6a494af60e01b81526001600160a01b0384811660048301529151919092169163f6a494af91602480830192600092919082900301818387803b158015612da757600080fd5b505af1158015612dbb573d6000803e3d6000fd5b505050505b6010546001600160a01b0316156113b1576010546040805163f6a494af60e01b81526001600160a01b0384811660048301529151919092169163f6a494af91602480830192600092919082900301818387803b15801561139857600080fd5b6001600160a01b038216612e7a576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b612e8660008383613904565b600254612e93908261352b565b6002556001600160a01b038216600090815260208190526040902054612eb9908261352b565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b600f546000906001600160a01b03168061118e576040805162461bcd60e51b815260206004820152601e60248201527f546f6b656e206d697373696e67207772697465205650436f6e74726163740000604482015290519081900360640190fd5b600e546000906001600160a01b03168061118e576040805162461bcd60e51b815260206004820152601d60248201527f546f6b656e206d697373696e672072656164205650436f6e7472616374000000604482015290519081900360640190fd5b60038054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561305d5780601f106130325761010080835404028352916020019161305d565b820191906000526020600020905b81548152906001019060200180831161304057829003601f168201915b5050505050905090565b3390565b6001600160a01b0383166130b05760405162461bcd60e51b81526004018080602001828103825260248152602001806145306024913960400191505060405180910390fd5b6001600160a01b0382166130f55760405162461bcd60e51b81526004018080602001828103825260228152602001806143996022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600a548110156131985760405162461bcd60e51b81526004018080602001828103825260288152602001806143e16028913960400191505060405180910390fd5b4381106131d65760405162461bcd60e51b81526004018080602001828103825260218152602001806143786021913960400191505060405180910390fd5b600a55565b6001600160a01b0383166132205760405162461bcd60e51b815260040180806020018281038252602581526020018061450b6025913960400191505060405180910390fd5b6001600160a01b0382166132655760405162461bcd60e51b81526004018080602001828103825260238152602001806143336023913960400191505060405180910390fd5b613270838383613904565b6132ad816040518060600160405280602681526020016143bb602691396001600160a01b0386166000908152602081905260409020549190613336565b6001600160a01b0380851660009081526020819052604080822093909355908416815220546132dc908261352b565b6001600160a01b038084166000818152602081815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600081848411156133c55760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561338a578181015183820152602001613372565b50505050905090810190601f1680156133b75780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6001600160a01b0382166134125760405162461bcd60e51b81526004018080602001828103825260218152602001806144ea6021913960400191505060405180910390fd5b61341e82600083613904565b61345b81604051806060016040528060228152602001614356602291396001600160a01b0385166000908152602081905260409020549190613336565b6001600160a01b0383166000908152602081905260409020556002546134819082613b13565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b60055460ff1690565b600c546001600160a01b03163314613523576040805162461bcd60e51b815260206004820152600f60248201526e6f6e6c7920676f7665726e616e636560881b604482015290519081900360640190fd5b565b600a5490565b6000828201838110156114d4576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b600081815260208390526040812054156135b05750600081815260208390526040812055600161117e565b50600092915050565b600081600a548110156135fd5760405162461bcd60e51b815260040180806020018281038252602d815260200180614409602d913960400191505060405180910390fd5b61360960068585613b70565b949350505050565b60048054604080516020601f600260001961010060018816150201909516949094049384018190048102820181019092528281526060939092909183018282801561305d5780601f106130325761010080835404028352916020019161305d565b600081600a548110156136b65760405162461bcd60e51b815260040180806020018281038252602d815260200180614409602d913960400191505060405180910390fd5b6114d4600784613b9b565b600081600a548110156137055760405162461bcd60e51b815260040180806020018281038252602d815260200180614409602d913960400191505060405180910390fd5b438310613759576040805162461bcd60e51b815260206004820181905260248201527f43616e206f6e6c79206265207573656420666f72207061737420626c6f636b73604482015290519081900360640190fd5b6000806137696009600787613cde565b9150915080156137a7576040805186815290517ffec477a10b4fcdfdf1114eb32b3caf6118b2d76d20e1fcb70007274bb4b616be9181900360200190a15b509392505050565b60006001600160a01b038416156137ea576001600160a01b03841660009081526020869052604090206137e39084846137f5565b9050613609565b506000949350505050565b600081613804575060006114d4565b6001840154600160401b90046001600160401b0316806138285760009150506114d4565b60018501546001600160401b0316600061384e613845838861352b565b60018503613d3c565b9050815b8181108015613883575060018101600090815260208990526040902054600160c01b90046001600160401b03168610155b1561389f57600081815260208990526040812055600101613852565b828111156138d4576138b081613d52565b60018901805467ffffffffffffffff19166001600160401b03929092169190911790555b919091039695505050505050565b600b80546001600160a01b0319166001600160a01b0392909216919091179055565b816001600160a01b0316836001600160a01b0316141561396b576040805162461bcd60e51b815260206004820152601760248201527f43616e6e6f74207472616e7366657220746f2073656c66000000000000000000604482015290519081900360640190fd5b60006001600160a01b03841661398257600061398b565b61398b84611b0a565b905060006001600160a01b0384166139a45760006139ad565b6139ad84611b0a565b600f549091506001600160a01b03168015613a47576040805163756da1b160e11b81526001600160a01b038881166004830152878116602483015260448201869052606482018590526084820187905291519183169163eadb43629160a48082019260009290919082900301818387803b158015613a2a57600080fd5b505af1158015613a3e573d6000803e3d6000fd5b50505050613a6c565b601154600160a01b900460ff16613a6c576011805460ff60a01b1916600160a01b1790555b6010546001600160a01b03168015613aff576040805163756da1b160e11b81526001600160a01b038981166004830152888116602483015260448201879052606482018690526084820188905291519183169163eadb43629160a48082019260009290919082900301818387803b158015613ae657600080fd5b505af1158015613afa573d6000803e3d6000fd5b505050505b613b0a878787613d9a565b50505050505050565b600082821115613b6a576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b6001600160a01b0382166000908152602084905260408120613b928184613b9b565b95945050505050565b6001820154600090600160401b90046001600160401b031680613bc257600091505061117e565b4383101580613bf457506000198101600090815260208590526040902054600160c01b90046001600160401b03168310155b15613c1c57600019016000908152602084905260409020546001600160c01b0316905061117e565b60018401546001600160401b039081166000818152602087905260409020549091600160c01b90910416841015613c95578015613c8a5760405162461bcd60e51b81526004018080602001828103825260308152602001806145546030913960400191505060405180910390fd5b60009250505061117e565b6001850154600090613cbb9087908490600160401b90046001600160401b031688613dda565b6000908152602087905260409020546001600160c01b0316935050505092915050565b60008181526020849052604081205481908015613d045760001901915060009050613d34565b6000613d108686613b9b565b9050613d1d81600161352b565b600086815260208990526040902055925060019150505b935093915050565b6000818310613d4b57816114d4565b5090919050565b6000600160401b8210613d965760405162461bcd60e51b815260040180806020018281038252602681526020018061445f6026913960400191505060405180910390fd5b5090565b6001600160a01b038316613db757613db28282613e64565b612113565b6001600160a01b038216613dcf57613db28382613ec1565b612113838383613f69565b60008381613de9856001613b13565b90505b81811115613e5a576000613e166002613e106001613e0a868861352b565b9061352b565b90613f9f565b600081815260208a90526040902054909150600160c01b90046001600160401b03168510613e4657809250613e54565b613e51816001613b13565b91505b50613dec565b5095945050505050565b6000613e7482613e0a854361196c565b9050613e8260068483614006565b600a54613e969060069085906002906137af565b50613eaf613ea783613e0a43612122565b600790614024565b600a54612437906007906002906137f5565b6000613f008260405180604001604052806016815260200175213ab937103a37b7903134b3903337b91037bbb732b960511b815250612096864361196c565b9050613f0e60068483614006565b600a54613f229060069085906002906137af565b50613eaf613ea7836040518060400160405280601d81526020017f4275726e20746f6f2062696720666f7220746f74616c20737570706c7900000081525061209643612122565b613f7660068484846141e5565b600a54613f8a9060069085906002906137af565b50600a546124379060069084906002906137af565b6000808211613ff5576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381613ffe57fe5b049392505050565b6001600160a01b038216600090815260208490526040902061243781835b6001820154600160401b90046001600160401b0316806140db57604051806040016040528061405284614274565b6001600160c01b0316815260200161406943613d52565b6001600160401b03908116909152600080805260208681526040909120835181549490920151909216600160c01b026001600160c01b039182166001600160c01b0319909416939093171691909117905560018301805467ffffffffffffffff60401b1916600160401b179055612113565b600019810160009081526020849052604090208054600160c01b90046001600160401b0316438114156141315761411184614274565b82546001600160c01b0319166001600160c01b03919091161782556113ac565b80431161413a57fe5b604051806040016040528061414e86614274565b6001600160c01b0316815260200161416543613d52565b6001600160401b039081169091526000858152602088815260409091208351815494909201518316600160c01b026001600160c01b039283166001600160c01b0319909516949094179091169290921790915560018087018054918601909216600160401b0267ffffffffffffffff60401b199091161790555050505050565b806141ef57612437565b6001600160a01b03831615801561420d57506001600160a01b038216155b1561421457fe5b6001600160a01b038316156142485760006142398261423387876142ce565b90613b13565b9050614246858583614006565b505b6001600160a01b0382161561243757600061426782613e0a87866142ce565b90506113ac858483614006565b6000600160c01b8210613d96576040805162461bcd60e51b815260206004820152601d60248201527f76616c756520646f65736e27742066697420696e203139322062697473000000604482015290519081900360640190fd5b6001600160a01b0381166000908152602083905260408120613609816001810154600090600160401b90046001600160401b031680614311576000915050611439565b6000190160009081526020929092525060409020546001600160c01b03169056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e6365436c65616e757020626c6f636b206d75737420626520696e20746865207061737445524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e6365436c65616e757020626c6f636b206e756d626572206d757374206e65766572206465637265617365436865636b506f696e7461626c653a2072656164696e672066726f6d20636c65616e65642d757020626c6f636b5650436f6e7472616374206e6f7420636f6e6669677572656420666f72207265706c6163656d656e7453616665436173743a2076616c756520646f65736e27742066697420696e203634206269747345524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365476f7665726e616e636520766f746520706f77657220636f6e747261637420646f6573206e6f742062656c6f6e6720746f207468697320746f6b656e2e45524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373436865636b506f696e74486973746f72793a2072656164696e672066726f6d20636c65616e65642d757020626c6f636b45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726f5650436f6e7472616374206e6f74206f776e6564206279207468697320746f6b656ea26469706673582212203d7d32d1c7513fe9400879b42eef0f4a05e75bdf9318dd7af45953143cbedb2b64736f6c63430007060033",
  linkReferences: {},
  deployedLinkReferences: {},
};
