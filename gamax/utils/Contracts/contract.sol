// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameAssetMarketplace is ERC721URIStorage, Ownable {
    uint256 public nextTokenId = 1;

    struct Asset {
        uint256 tokenId;
        address owner;
        uint256 price;
        bool isListed;
        bool isSold;
    }

    struct GamePlatform {
        string name;
        string gameURL;
        address creator;
    }

    mapping(uint256 => Asset) public assets;
    mapping(address => uint256[]) public userAssets;
    mapping(address => GamePlatform) public gamePlatforms;
    GamePlatform[] public allPlatforms;

    event AssetMinted(uint256 tokenId, address owner, string tokenURI);
    event AssetListed(uint256 tokenId, uint256 price);
    event AssetBought(uint256 tokenId, address buyer, uint256 price);
    event GamePlatformRegistered(address creator, string name);

    constructor() ERC721("GamaXAsset", "GAMAX") {}

    // ====== NFT Minting ======
    function mintAsset(string memory tokenURI) public {
        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        assets[tokenId] = Asset(tokenId, msg.sender, 0, false, false);
        userAssets[msg.sender].push(tokenId);

        emit AssetMinted(tokenId, msg.sender, tokenURI);
    }

    // ====== Marketplace ======
    function listAssetForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Not asset owner");
        require(price > 0, "Price must be > 0");

        assets[tokenId].isListed = true;
        assets[tokenId].price = price;

        emit AssetListed(tokenId, price);
    }

    function buyAsset(uint256 tokenId) public payable {
        Asset storage asset = assets[tokenId];
        require(asset.isListed, "Asset not listed for sale");
        require(!asset.isSold, "Already sold");
        require(msg.value >= asset.price, "Insufficient payment");

        address seller = ownerOf(tokenId);
        _transfer(seller, msg.sender, tokenId);

        payable(seller).transfer(msg.value);

        asset.owner = msg.sender;
        asset.isListed = false;
        asset.isSold = true;

        userAssets[msg.sender].push(tokenId);

        emit AssetBought(tokenId, msg.sender, asset.price);
    }

    function getMarketAssets() public view returns (uint256[] memory) {
        uint256 count = 0;

        for (uint256 i = 1; i < nextTokenId; i++) {
            if (assets[i].isListed && !assets[i].isSold) {
                count++;
            }
        }

        uint256[] memory listed = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i < nextTokenId; i++) {
            if (assets[i].isListed && !assets[i].isSold) {
                listed[index++] = i;
            }
        }

        return listed;
    }

    function getAssetDetails(uint256 tokenId) public view returns (
        address owner,
        uint256 price,
        bool isListed,
        bool isSold,
        string memory tokenURI
    ) {
        Asset memory a = assets[tokenId];
        return (a.owner, a.price, a.isListed, a.isSold, tokenURI(tokenId));
    }

    // ====== Collaborator Section ======
    function registerGamePlatform(string memory name, string memory gameURL) public {
        require(bytes(name).length > 0, "Name required");
        require(bytes(gameURL).length > 0, "URL required");

        gamePlatforms[msg.sender] = GamePlatform(name, gameURL, msg.sender);
        allPlatforms.push(gamePlatforms[msg.sender]);

        emit GamePlatformRegistered(msg.sender, name);
    }

    function getGamePlatforms() public view returns (GamePlatform[] memory) {
        return allPlatforms;
    }

    // ====== Profile Section ======
    function getOwnedAssets(address user) public view returns (uint256[] memory) {
        return userAssets[user];
    }

    function getUserTransactionHistory(address user) public view returns (uint256[] memory owned) {
        return userAssets[user]; // Simplified for demo
    }

    // Withdraw (if needed in future)
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}