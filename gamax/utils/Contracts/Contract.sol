// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTMarketplace {
    struct Asset {
        address seller;
        address buyer;
        string assetName;
        string category;
        string price;
        string gameName;
        string assetImage;
        string description;
        string rarities;
        string ProfileStatus;
        string MarketStatus;
        string TransactionStatus;
    }

    Asset[] private assets;

    event AssetAdded(
        uint256 indexed assetId,
        address indexed seller,
        string assetName,
        string category,
        string price,
        string gameName,
        string assetImage,
        string description,
        string rarities
    );

    event AssetSold(
        uint256 indexed assetId,
        address indexed seller,
        address indexed buyer,
        string price
    );

    event AssetStatusUpdated(
        uint256 indexed assetId,
        string ProfileStatus,
        string MarketStatus,
        string TransactionStatus
    );

    function addAsset(
        string memory _assetName,
        string memory _category,
        string memory _assetImage,
        string memory _price,
        string memory _gameName,
        string memory _description,
        string memory _rarities
    ) public {
        uint256 assetId = assets.length;

        assets.push(
            Asset({
                seller: msg.sender,
                buyer: address(0),
                assetName: _assetName,
                category: _category,
                price: _price,
                gameName: _gameName,
                assetImage: _assetImage,
                description: _description,
                rarities: _rarities,
                ProfileStatus: "Active",
                MarketStatus: "UnAvailable",
                TransactionStatus: "NotCompleted"
            })
        );

        emit AssetAdded(
            assetId,
            msg.sender,
            _assetName,
            _category,
            _price,
            _gameName,
            _assetImage,
            _description,
            _rarities
        );
    }

    function sellAsset(uint256 _indexId) public {
        require(_indexId < assets.length, "Asset does not exist");
        require(assets[_indexId].seller == msg.sender, "Only seller can sell");

        assets[_indexId].ProfileStatus = "Market";
        assets[_indexId].MarketStatus = "Available";

        emit AssetStatusUpdated(
            _indexId,
            "Market",
            "Available",
            assets[_indexId].TransactionStatus
        );
    }

    function buyAsset(uint256 _indexId) public {
        require(_indexId < assets.length, "Asset does not exist");
        assets[_indexId].buyer = msg.sender;
        assets[_indexId].ProfileStatus = "Sold";
        assets[_indexId].MarketStatus = "UnAvailable";
        assets[_indexId].TransactionStatus = "Completed";

        emit AssetSold(
            _indexId,
            assets[_indexId].seller,
            msg.sender,
            assets[_indexId].price
        );

        emit AssetStatusUpdated(_indexId, "Sold", "UnAvailable", "Completed");
    }

    function unlistAsset(uint256 _indexId) public {
        require(_indexId < assets.length, "Asset does not exist");
        require(
            assets[_indexId].seller == msg.sender,
            "Only seller can unlist"
        );

        assets[_indexId].ProfileStatus = "Active";
        assets[_indexId].MarketStatus = "UnAvailable";

        emit AssetStatusUpdated(
            _indexId,
            "Active",
            "UnAvailable",
            assets[_indexId].TransactionStatus
        );
    }

    function reSell(uint256 _indexId, string memory _newPrice) public {
        require(_indexId < assets.length, "Asset does not exist");
        require(assets[_indexId].buyer == msg.sender, "Only buyer can resell");
        require(
            keccak256(bytes(assets[_indexId].ProfileStatus)) ==
                keccak256(bytes("Sold")),
            "Asset must be in Sold status"
        );

        assets[_indexId].seller = msg.sender;
        assets[_indexId].buyer = address(0);
        assets[_indexId].price = _newPrice;
        assets[_indexId].ProfileStatus = "Market";
        assets[_indexId].MarketStatus = "Available";
        assets[_indexId].TransactionStatus = "NotCompleted";

        emit AssetStatusUpdated(
            _indexId,
            "Market",
            "Available",
            "NotCompleted"
        );
    }

    function viewAllAssets() public view returns (Asset[] memory) {
        return assets;
    }

    function getAsset(uint256 _indexId) public view returns (Asset memory) {
        require(_indexId < assets.length, "Asset does not exist");
        return assets[_indexId];
    }
}
