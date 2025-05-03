import { ethers } from "ethers";

const contractABI = [
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
				"name": "_gameProfile",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_assetImage",
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
				"name": "_status",
				"type": "string"
			}
		],
		"name": "addAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
				"name": "gameProfile",
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
				"name": "status",
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
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "status",
				"type": "string"
			}
		],
		"name": "AssetUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_assetId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_buyer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			}
		],
		"name": "updateAssetStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAssets",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "seller",
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
						"name": "gameProfile",
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
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct MarketPlace.Asset[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0xFe72508c2002803e7fA7c26f8e156E8cbEa7241d";

export const getContract = () => {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const addAsset = async (assetData) => {
  const contract = getContract();
  const tx = await contract.addAsset(
    assetData.seller,
    assetData.assetName,
    assetData.category,
    assetData.price,
    assetData.gameName,
    assetData.gameProfile,
    assetData.assetImage,
    assetData.description,
    assetData.rarities,
    assetData.status
  );
  await tx.wait();
  return tx;
};

export const getAllAssets = async () => {
  const contract = getContract();
  const assets = await contract.getAllAssets();
  return assets;
};

export const purchaseAsset = async (index, buyer, status) => {
  const contract = getContract();
  const tx = await contract.updateStatusAndBuyerByIndex(index, buyer, status);
  await tx.wait();
  return tx;
};