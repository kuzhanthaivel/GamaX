import { ethers } from "ethers";

const marketContractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "assetId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "assetName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "price",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "gameName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "assetImage",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "rarities",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ProfileStatus",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "MarketStatus",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "TransactionStatus",
				"type": "string"
			}
		],
		"name": "AssetAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "assetId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ProfileStatus",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "MarketStatus",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "TransactionStatus",
				"type": "string"
			}
		],
		"name": "AssetSold",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "assetId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ProfileStatus",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "MarketStatus",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "TransactionStatus",
				"type": "string"
			}
		],
		"name": "AssetStatusUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_seller",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_assetName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_assetImage",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_price",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_gameName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rarities",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ProfileStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_MarketStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_TransactionStatus",
				"type": "string"
			}
		],
		"name": "addAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indexId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_buyer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_ProfileStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_MarketStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_TransactionStatus",
				"type": "string"
			}
		],
		"name": "buyAsset",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indexId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ProfileStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_MarketStatus",
				"type": "string"
			}
		],
		"name": "sellAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indexId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_ProfileStatus",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_MarketStatus",
				"type": "string"
			}
		],
		"name": "unlistAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewAllAssets",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "assetName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "price",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "gameName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "assetImage",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "rarities",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ProfileStatus",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "MarketStatus",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "TransactionStatus",
						"type": "string"
					}
				],
				"internalType": "struct NFTMarketplace.Asset[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const marketContractAddress = "0xDBCad64624704E7884C91F18A46CDaDB0CBeBA9F"; 

export const getMarketContract = () => {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(marketContractAddress, marketContractABI, signer);
};

export const addAsset = async (assetData) => {
  const contract = getMarketContract();
  const tx = await contract.addAsset(
    assetData.seller,
    assetData.assetName,
    assetData.category,
    assetData.assetImage,
    assetData.price,
    assetData.gameName,
    assetData.description,
    assetData.rarities,
    assetData.ProfileStatus,
    assetData.MarketStatus,
    assetData.TransactionStatus
  );
  await tx.wait();
  return tx;
};

export const viewAllAssets = async () => {
  const contract = getMarketContract();
  const assets = await contract.viewAllAssets();
  return assets;
};

export const sellAsset = async (indexId, ProfileStatus, MarketStatus) => {
  const contract = getMarketContract();
  const tx = await contract.sellAsset(
    indexId,
    ProfileStatus,
    MarketStatus
  );
  await tx.wait();
  return tx;
};

export const buyAsset = async (indexId, buyer, ProfileStatus, MarketStatus, TransactionStatus) => {
  const contract = getMarketContract();
  const tx = await contract.buyAsset(
    indexId,
    buyer,
    ProfileStatus,
    MarketStatus,
    TransactionStatus,
    { value: ethers.utils.parseEther("0") } 
  );
  await tx.wait();
  return tx;
};

export const unlistAsset = async (indexId, ProfileStatus, MarketStatus) => {
  const contract = getMarketContract();
  const tx = await contract.unlistAsset(
    indexId,
    ProfileStatus,
    MarketStatus
  );
  await tx.wait();
  return tx;
};
