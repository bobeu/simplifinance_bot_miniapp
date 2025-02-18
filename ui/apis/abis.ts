export const getAvailableSlotAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      }
    ],
    "name": "isPoolVacant",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

export const getSafeAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      }
    ],
    "name": "getSafe",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "id",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "ownerHash",
            "type": "bytes32"
          }
        ],
        "internalType": "struct Common.Safe",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

export const getCollateralQuoteAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      }
    ],
    "name": "getCollateralQuote",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "quote",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

export const getCurrentDebtAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getCurrentDebt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "debt",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

export const removeLiquidityPoolAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      }
    ],
    "name": "removeLiquidityPool",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "routers",
    "outputs": [
      {
        "internalType": "enum C3.Router",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

export const paybackAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "payback",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;

export const liquidateAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      }
    ],
    "name": "liquidate",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;

export const getFinanceAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getFinance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;

export const createPermissionlessLiquidityPoolAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newSafe",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "users",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "quorum",
        "type": "uint8"
      },
      {
        "internalType": "uint16",
        "name": "intRate",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "durationInHours",
        "type": "uint16"
      },
      {
        "internalType": "uint24",
        "name": "colCoverage",
        "type": "uint24"
      }
    ],
    "name": "createPermissionlessPool",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;

export const createPermissionedLiquidityPoolAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newSafe",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "users",
        "type": "address[]"
      },
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      },
      {
        "internalType": "uint16",
        "name": "intRate",
        "type": "uint16"
      },
      {
        "internalType": "uint16",
        "name": "durationInHours",
        "type": "uint16"
      },
      {
        "internalType": "uint24",
        "name": "colCoverage",
        "type": "uint24"
      }
    ],
    "name": "createPermissionedPool",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;

export const addToPoolAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "unit",
        "type": "uint256"
      },
      {
        "internalType": "address[]",
        "name": "user",
        "type": "address[]"
      }
    ],
    "name": "addUserToPool",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;

export const getRecordAbi = [
  
] as const;

export const getPoolDataAbi = [
  
] as const;

export const getFactoryDataAbi = [
  
] as const;

export const allowanceAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
] as const;

export const balanceOfAbi = [
  {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
  },
] as const;

export const symbolAbi = [
{
  "inputs": [],
  "name": "symbol",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
] as const;

export const transferFromAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
] as const;
