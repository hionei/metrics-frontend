export default [
  {
    type: "constructor",
    stateMutability: "nonpayable",
    inputs: [
      { type: "address", name: "_governance", internalType: "address" },
      {
        type: "address",
        name: "_flareDaemon",
        internalType: "contract FlareDaemon",
      },
      {
        type: "address",
        name: "_addressUpdater",
        internalType: "address",
      },
      {
        type: "address",
        name: "_oldFtsoManager",
        internalType: "contract IIFtsoManagerV1",
      },
      {
        type: "uint256",
        name: "_firstPriceEpochStartTs",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_priceEpochDurationSeconds",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_revealEpochDurationSeconds",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_firstRewardEpochStartTs",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_rewardEpochDurationSeconds",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_votePowerIntervalFraction",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "event",
    name: "AccruingUnearnedRewardsFailed",
    inputs: [
      {
        type: "uint256",
        name: "epochId",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ChillingNonrevealingDataProvidersFailed",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "CleanupBlockNumberManagerFailedForBlock",
    inputs: [
      {
        type: "uint256",
        name: "blockNumber",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ClosingExpiredRewardEpochFailed",
    inputs: [
      {
        type: "uint256",
        name: "rewardEpoch",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ContractRevertError",
    inputs: [
      {
        type: "address",
        name: "theContract",
        internalType: "address",
        indexed: false,
      },
      {
        type: "uint256",
        name: "atBlock",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "string",
        name: "theMessage",
        internalType: "string",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DistributingRewardsFailed",
    inputs: [
      {
        type: "address",
        name: "ftso",
        internalType: "address",
        indexed: false,
      },
      {
        type: "uint256",
        name: "epochId",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FallbackMode",
    inputs: [
      {
        type: "bool",
        name: "fallbackMode",
        internalType: "bool",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FinalizingPriceEpochFailed",
    inputs: [
      {
        type: "address",
        name: "ftso",
        internalType: "contract IIFtso",
        indexed: false,
      },
      {
        type: "uint256",
        name: "epochId",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint8",
        name: "failingType",
        internalType: "enum IFtso.PriceFinalizationType",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FtsoAdded",
    inputs: [
      {
        type: "address",
        name: "ftso",
        internalType: "contract IIFtso",
        indexed: false,
      },
      {
        type: "bool",
        name: "add",
        internalType: "bool",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FtsoDeactivationFailed",
    inputs: [
      {
        type: "address",
        name: "ftso",
        internalType: "contract IIFtso",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FtsoFallbackMode",
    inputs: [
      {
        type: "address",
        name: "ftso",
        internalType: "contract IIFtso",
        indexed: false,
      },
      {
        type: "bool",
        name: "fallbackMode",
        internalType: "bool",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GovernanceCallTimelocked",
    inputs: [
      {
        type: "bytes4",
        name: "selector",
        internalType: "bytes4",
        indexed: false,
      },
      {
        type: "uint256",
        name: "allowedAfterTimestamp",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "bytes",
        name: "encodedCall",
        internalType: "bytes",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GovernanceInitialised",
    inputs: [
      {
        type: "address",
        name: "initialGovernance",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GovernedProductionModeEntered",
    inputs: [
      {
        type: "address",
        name: "governanceSettings",
        internalType: "address",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "InitializingCurrentEpochStateForRevealFailed",
    inputs: [
      {
        type: "address",
        name: "ftso",
        internalType: "contract IIFtso",
        indexed: false,
      },
      {
        type: "uint256",
        name: "epochId",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PriceEpochFinalized",
    inputs: [
      {
        type: "address",
        name: "chosenFtso",
        internalType: "address",
        indexed: false,
      },
      {
        type: "uint256",
        name: "rewardEpochId",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RewardEpochFinalized",
    inputs: [
      {
        type: "uint256",
        name: "votepowerBlock",
        internalType: "uint256",
        indexed: false,
      },
      {
        type: "uint256",
        name: "startBlock",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TimelockedGovernanceCallCanceled",
    inputs: [
      {
        type: "bytes4",
        name: "selector",
        internalType: "bytes4",
        indexed: false,
      },
      {
        type: "uint256",
        name: "timestamp",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TimelockedGovernanceCallExecuted",
    inputs: [
      {
        type: "bytes4",
        name: "selector",
        internalType: "bytes4",
        indexed: false,
      },
      {
        type: "uint256",
        name: "timestamp",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UpdatingActiveValidatorsTriggerFailed",
    inputs: [
      {
        type: "uint256",
        name: "rewardEpoch",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UseGoodRandomSet",
    inputs: [
      {
        type: "bool",
        name: "useGoodRandom",
        internalType: "bool",
        indexed: false,
      },
      {
        type: "uint256",
        name: "maxWaitForGoodRandomSeconds",
        internalType: "uint256",
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "MAX_TRUSTED_ADDRESSES_LENGTH",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "activate",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "active",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addFtso",
    inputs: [{ type: "address", name: "_ftso", internalType: "contract IIFtso" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "addFtsosBulk",
    inputs: [
      {
        type: "address[]",
        name: "_ftsos",
        internalType: "contract IIFtso[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "cancelGovernanceCall",
    inputs: [{ type: "bytes4", name: "_selector", internalType: "bytes4" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract CleanupBlockNumberManager",
      },
    ],
    name: "cleanupBlockNumberManager",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "currentRewardEpochEnds",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "daemonize",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "deactivateFtsos",
    inputs: [
      {
        type: "address[]",
        name: "_ftsos",
        internalType: "contract IIFtso[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint192",
        name: "totalRevertedErrors",
        internalType: "uint192",
      },
      {
        type: "uint64",
        name: "lastErrorTypeIndex",
        internalType: "uint64",
      },
    ],
    name: "errorData",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "executeGovernanceCall",
    inputs: [{ type: "bytes4", name: "_selector", internalType: "bytes4" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "contract FlareDaemon" }],
    name: "flareDaemon",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IIFtsoRegistry",
      },
    ],
    name: "ftsoRegistry",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "_addressUpdater",
        internalType: "address",
      },
    ],
    name: "getAddressUpdater",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "pure",
    outputs: [{ type: "string", name: "", internalType: "string" }],
    name: "getContractName",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "uint256", name: "_priceEpochId", internalType: "uint256" },
      {
        type: "uint256",
        name: "_priceEpochStartTimestamp",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_priceEpochEndTimestamp",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_priceEpochRevealEndTimestamp",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_currentTimestamp",
        internalType: "uint256",
      },
    ],
    name: "getCurrentPriceEpochData",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "_priceEpochId", internalType: "uint256" }],
    name: "getCurrentPriceEpochId",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getCurrentRewardEpoch",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getElasticBandWidthPPMFtso",
    inputs: [{ type: "address", name: "_ftso", internalType: "contract IIFtso" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      { type: "bool", name: "_fallbackMode", internalType: "bool" },
      {
        type: "address[]",
        name: "_ftsos",
        internalType: "contract IIFtso[]",
      },
      {
        type: "bool[]",
        name: "_ftsoInFallbackMode",
        internalType: "bool[]",
      },
    ],
    name: "getFallbackMode",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address[]",
        name: "_ftsos",
        internalType: "contract IIFtso[]",
      },
    ],
    name: "getFtsos",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "_maxVotePowerNatThresholdFraction",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_maxVotePowerAssetThresholdFraction",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_lowAssetUSDThreshold",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_highAssetUSDThreshold",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_highAssetTurnoutThresholdBIPS",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_lowNatTurnoutThresholdBIPS",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_elasticBandRewardBIPS",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_rewardExpiryOffsetSeconds",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "_trustedAddresses",
        internalType: "address[]",
      },
      { type: "bool", name: "_initialized", internalType: "bool" },
      { type: "bool", name: "_changed", internalType: "bool" },
    ],
    name: "getGovernanceParameters",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "_lastUnprocessedPriceEpoch",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_lastUnprocessedPriceEpochRevealEnds",
        internalType: "uint256",
      },
      {
        type: "bool",
        name: "_lastUnprocessedPriceEpochInitialized",
        internalType: "bool",
      },
    ],
    name: "getLastUnprocessedPriceEpochData",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "_firstPriceEpochStartTs",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_priceEpochDurationSeconds",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_revealEpochDurationSeconds",
        internalType: "uint256",
      },
    ],
    name: "getPriceEpochConfiguration",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IIPriceSubmitter",
      },
    ],
    name: "getPriceSubmitter",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "_firstRewardEpochStartTs",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_rewardEpochDurationSeconds",
        internalType: "uint256",
      },
    ],
    name: "getRewardEpochConfiguration",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "tuple",
        name: "",
        internalType: "struct IIFtsoManager.RewardEpochData",
        components: [
          {
            type: "uint256",
            name: "votepowerBlock",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "startBlock",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "startTimestamp",
            internalType: "uint256",
          },
        ],
      },
    ],
    name: "getRewardEpochData",
    inputs: [{ type: "uint256", name: "_rewardEpochId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getRewardEpochToExpireNext",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "_votepowerBlock",
        internalType: "uint256",
      },
    ],
    name: "getRewardEpochVotePowerBlock",
    inputs: [{ type: "uint256", name: "_rewardEpoch", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getRewardExpiryOffsetSeconds",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getUpdateGovernanceParametersTs",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "getVotePowerIntervalFraction",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "governance",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IGovernanceSettings",
      },
    ],
    name: "governanceSettings",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "initialise",
    inputs: [
      {
        type: "address",
        name: "_initialGovernance",
        internalType: "address",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "address" }],
    name: "lastRewardedFtsoAddress",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "maxWaitForGoodRandomSeconds",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "notInitializedFtsos",
    inputs: [{ type: "address", name: "_ftso", internalType: "contract IIFtso" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IIFtsoManagerV1",
      },
    ],
    name: "oldFtsoManager",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IIPriceSubmitter",
      },
    ],
    name: "priceSubmitter",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "productionMode",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "removeFtso",
    inputs: [{ type: "address", name: "_ftso", internalType: "contract IIFtso" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "replaceFtso",
    inputs: [
      {
        type: "address",
        name: "_ftsoToAdd",
        internalType: "contract IIFtso",
      },
      { type: "bool", name: "_copyCurrentPrice", internalType: "bool" },
      {
        type: "bool",
        name: "_copyAssetOrAssetFtsos",
        internalType: "bool",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "replaceFtsosBulk",
    inputs: [
      {
        type: "address[]",
        name: "_ftsosToAdd",
        internalType: "contract IIFtso[]",
      },
      { type: "bool", name: "_copyCurrentPrice", internalType: "bool" },
      {
        type: "bool",
        name: "_copyAssetOrAssetFtsos",
        internalType: "bool",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "rewardEpochDurationSeconds",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "_votepowerBlock",
        internalType: "uint256",
      },
      { type: "uint256", name: "_startBlock", internalType: "uint256" },
      {
        type: "uint256",
        name: "_startTimestamp",
        internalType: "uint256",
      },
    ],
    name: "rewardEpochs",
    inputs: [{ type: "uint256", name: "_rewardEpochId", internalType: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "rewardEpochsStartTs",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IIFtsoRewardManager",
      },
    ],
    name: "rewardManager",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setElasticBandWidthPPMFtsos",
    inputs: [
      { type: "uint256", name: "_updateTs", internalType: "uint256" },
      {
        type: "address[]",
        name: "_ftsos",
        internalType: "contract IIFtso[]",
      },
      { type: "uint256[]", name: "_widths", internalType: "uint256[]" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setFallbackMode",
    inputs: [{ type: "bool", name: "_fallbackMode", internalType: "bool" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setFtsoAsset",
    inputs: [
      { type: "address", name: "_ftso", internalType: "contract IIFtso" },
      {
        type: "address",
        name: "_asset",
        internalType: "contract IIVPToken",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setFtsoAssetFtsos",
    inputs: [
      { type: "address", name: "_ftso", internalType: "contract IIFtso" },
      {
        type: "address[]",
        name: "_assetFtsos",
        internalType: "contract IIFtso[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setFtsoFallbackMode",
    inputs: [
      { type: "address", name: "_ftso", internalType: "contract IIFtso" },
      { type: "bool", name: "_fallbackMode", internalType: "bool" },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setGovernanceParameters",
    inputs: [
      { type: "uint256", name: "_updateTs", internalType: "uint256" },
      {
        type: "uint256",
        name: "_maxVotePowerNatThresholdFraction",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_maxVotePowerAssetThresholdFraction",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_lowAssetUSDThreshold",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_highAssetUSDThreshold",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_highAssetTurnoutThresholdBIPS",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_lowNatTurnoutThresholdBIPS",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_elasticBandRewardBIPS",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_rewardExpiryOffsetSeconds",
        internalType: "uint256",
      },
      {
        type: "address[]",
        name: "_trustedAddresses",
        internalType: "address[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setInitialRewardData",
    inputs: [
      {
        type: "uint256",
        name: "_nextRewardEpochToExpire",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_rewardEpochsLength",
        internalType: "uint256",
      },
      {
        type: "uint256",
        name: "_currentRewardEpochEnds",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setRewardEpochDurationSeconds",
    inputs: [
      {
        type: "uint256",
        name: "_rewardEpochDurationSeconds",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setUpdateOnRewardEpochSwitchover",
    inputs: [
      {
        type: "address",
        name: "_updateValidators",
        internalType: "contract IUpdateValidators",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setUseGoodRandom",
    inputs: [
      { type: "bool", name: "_useGoodRandom", internalType: "bool" },
      {
        type: "uint256",
        name: "_maxWaitForGoodRandomSeconds",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "setVotePowerIntervalFraction",
    inputs: [
      {
        type: "uint256",
        name: "_votePowerIntervalFraction",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256[]",
        name: "_lastErrorBlock",
        internalType: "uint256[]",
      },
      {
        type: "uint256[]",
        name: "_numErrors",
        internalType: "uint256[]",
      },
      {
        type: "string[]",
        name: "_errorString",
        internalType: "string[]",
      },
      {
        type: "address[]",
        name: "_erroringContract",
        internalType: "address[]",
      },
      {
        type: "uint256",
        name: "_totalRevertedErrors",
        internalType: "uint256",
      },
    ],
    name: "showLastRevertedError",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256[]",
        name: "_lastErrorBlock",
        internalType: "uint256[]",
      },
      {
        type: "uint256[]",
        name: "_numErrors",
        internalType: "uint256[]",
      },
      {
        type: "string[]",
        name: "_errorString",
        internalType: "string[]",
      },
      {
        type: "address[]",
        name: "_erroringContract",
        internalType: "address[]",
      },
      {
        type: "uint256",
        name: "_totalRevertedErrors",
        internalType: "uint256",
      },
    ],
    name: "showRevertedErrors",
    inputs: [
      { type: "uint256", name: "startIndex", internalType: "uint256" },
      {
        type: "uint256",
        name: "numErrorTypesToShow",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "address", name: "", internalType: "contract IISupply" }],
    name: "supply",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "switchToFallbackMode",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "switchToProductionMode",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "uint256",
        name: "allowedAfterTimestamp",
        internalType: "uint256",
      },
      { type: "bytes", name: "encodedCall", internalType: "bytes" },
    ],
    name: "timelockedCalls",
    inputs: [{ type: "bytes4", name: "", internalType: "bytes4" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    outputs: [],
    name: "updateContractAddresses",
    inputs: [
      {
        type: "bytes32[]",
        name: "_contractNameHashes",
        internalType: "bytes32[]",
      },
      {
        type: "address[]",
        name: "_contractAddresses",
        internalType: "address[]",
      },
    ],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IUpdateValidators",
      },
    ],
    name: "updateOnRewardEpochSwitchover",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "bool", name: "", internalType: "bool" }],
    name: "useGoodRandom",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "contract IIVoterWhitelister",
      },
    ],
    name: "voterWhitelister",
    inputs: [],
  },
  {
    type: "function",
    stateMutability: "view",
    outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
    name: "waitingForGoodRandomSinceTs",
    inputs: [],
  },
];
