// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MarketPlace {
    struct Asset {
        address buyer;
        address seller;
        string assetName;
        string category;
        string price;
        string gameName;
        string assetImage;
        string description;
        string rarities;
        string status;
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
        string status
    );

    event AssetUpdated(
        uint256 indexed assetId,
        address indexed buyer,
        string status
    );

    event AssetStatusUpdated(uint256 indexed assetId, string status);

    modifier onlySeller(uint256 _assetId) {
        require(_assetId < assets.length, "Asset does not exist");
        require(
            msg.sender == assets[_assetId].seller,
            "Only seller can perform this action"
        );
        _;
    }

    function addAsset(
        string memory _assetName,
        string memory _category,
        string memory _price,
        string memory _gameName,
        string memory _assetImage,
        string memory _description,
        string memory _rarities,
        string memory _status
    ) public {
        uint256 assetId = assets.length;

        assets.push(
            Asset(
                address(0),
                msg.sender,
                _assetName,
                _category,
                _price,
                _gameName,
                _assetImage,
                _description,
                _rarities,
                _status
            )
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
            _rarities,
            _status
        );
    }

    function getAllAssets() public view returns (Asset[] memory) {
        return assets;
    }

    function updateAssetStatusandBuyer(
        uint256 _assetId,
        address _buyer,
        string memory _status
    ) public onlySeller(_assetId) {
        require(_buyer != assets[_assetId].seller, "Seller cannot be buyer");

        assets[_assetId].buyer = _buyer;
        assets[_assetId].status = _status;

        emit AssetUpdated(_assetId, _buyer, _status);
    }

    function updateAssetStatus(
        uint256 _assetId,   
        string memory _status
    ) public onlySeller(_assetId) {
        assets[_assetId].status = _status;

        emit AssetStatusUpdated(_assetId, _status);
    }
}
