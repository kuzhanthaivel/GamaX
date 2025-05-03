import { ethers } from "ethers";

const profileContractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
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
		"name": "addProfile",
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
				"name": "profileId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
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
		"name": "ProfileAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "status",
				"type": "string"
			}
		],
		"name": "ProfileUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_profileId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_status",
				"type": "string"
			}
		],
		"name": "updateProfileStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllProfiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
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
				"internalType": "struct UserProfile.Profile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const profileContractAddress = "0xc89fa65478Ca94804079ff6Dd9A68bEfb974CDa8"; 

export const getProfileContract = () => {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(profileContractAddress, profileContractABI, signer);
};

export const addProfile = async (profileData) => {
  const contract = getProfileContract();
  const tx = await contract.addProfile(
    profileData.user,
    profileData.assetName,
    profileData.category,
    profileData.price,
    profileData.gameName,
    profileData.gameProfile,
    profileData.assetImage,
    profileData.description,
    profileData.rarities,
    profileData.status
  );
  await tx.wait();
  return tx;
};

export const getAllProfiles = async () => {
  const contract = getProfileContract();
  const profiles = await contract.getAllProfiles();
  return profiles;
};

export const updateProfileStatus = async (index, status) => {
  const contract = getProfileContract();
  const tx = await contract.updateProfileStatus(index, status);
  await tx.wait();
  return tx;
};