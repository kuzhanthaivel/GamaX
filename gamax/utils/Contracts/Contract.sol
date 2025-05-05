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
        string rarities,
        string ProfileStatus,
        string MarketStatus,
        string TransactionStatus
    );

    event AssetSold(
        uint256 indexed assetId,
        address indexed seller,
        address indexed buyer,
        string ProfileStatus,
        string MarketStatus,
        string TransactionStatus
    );

    event AssetStatusUpdated(
        uint256 indexed assetId,
        string ProfileStatus,
        string MarketStatus,
        string TransactionStatus
    );

    function addAsset(
        address _seller,
        string memory _assetName,
        string memory _category,
        string memory _assetImage,
        string memory _price,
        string memory _gameName,
        string memory _description,
        string memory _rarities,
        string memory _ProfileStatus,
        string memory _MarketStatus,
        string memory _TransactionStatus
    ) public {
        uint256 assetId = assets.length;

        assets.push(Asset({
            seller: _seller,
            buyer: address(0),
            assetName: _assetName,
            category: _category,
            price: _price,
            gameName: _gameName,
            assetImage: _assetImage,
            description: _description,
            rarities: _rarities,
            ProfileStatus: _ProfileStatus,
            MarketStatus: _MarketStatus,
            TransactionStatus: _TransactionStatus
        }));

        emit AssetAdded(
            assetId,
            _seller,
            _assetName,
            _category,
            _price,
            _gameName,
            _assetImage,
            _description,
            _rarities,
            _ProfileStatus,
            _MarketStatus,
            _TransactionStatus
        );
    }

    function sellAsset(
        uint256 _indexId,
        string memory _ProfileStatus,
        string memory _MarketStatus
    ) public {
        require(_indexId < assets.length, "Asset does not exist");
        
        assets[_indexId].ProfileStatus = _ProfileStatus;
        assets[_indexId].MarketStatus = _MarketStatus;

        emit AssetStatusUpdated(
            _indexId,
            _ProfileStatus,
            _MarketStatus,
            assets[_indexId].TransactionStatus
        );
    }

    function buyAsset(
        uint256 _indexId,
        address _buyer,
        string memory _ProfileStatus,
        string memory _MarketStatus,
        string memory _TransactionStatus
    ) public payable {
        require(_indexId < assets.length, "Asset does not exist");
        assets[_indexId].buyer = _buyer;
        assets[_indexId].ProfileStatus = _ProfileStatus;
        assets[_indexId].MarketStatus = _MarketStatus;
        assets[_indexId].TransactionStatus = _TransactionStatus;

        emit AssetSold(
            _indexId,
            assets[_indexId].seller,
            _buyer,
            _ProfileStatus,
            _MarketStatus,
            _TransactionStatus
        );
    }

    function unlistAsset(
        uint256 _indexId,
        string memory _ProfileStatus,
        string memory _MarketStatus
    ) public {
        require(_indexId < assets.length, "Asset does not exist");
        assets[_indexId].ProfileStatus = _ProfileStatus;
        assets[_indexId].MarketStatus = _MarketStatus;

        emit AssetStatusUpdated(
            _indexId,
            _ProfileStatus,
            _MarketStatus,
            assets[_indexId].TransactionStatus
        );
    }

    function viewAllAssets() public view returns (Asset[] memory) {
        return assets;
    }
}