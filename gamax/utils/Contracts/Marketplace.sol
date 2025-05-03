    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    contract MarketPlace {
        struct Asset {
            address buyer;
            address seller;
            string assetName;
            string category;
            uint price;
            string gameName;
            string gameProfile;
            string assetImage;
            string description;
            string rarities;
            string status;
        }

        Asset[] private assets;

        event AssetAdded(
            address indexed seller,
            string assetName,
            string category,
            uint price,
            string gameName,
            string gameProfile,
            string assetImage,
            string description,
            string rarities,
            string status
        );

        event AssetUpdated(
            uint indexed index,
            address buyer,
            string status
        );

        function addAsset(
            address _seller,
            string memory _assetName,
            string memory _category,
            uint _price,
            string memory _gameName,
            string memory _gameProfile,
            string memory _assetImage,
            string memory _description,
            string memory _rarities,
            string memory _status
        ) public {
            Asset memory newAsset = Asset(
                address(0), // buyer initially empty
                _seller,
                _assetName,
                _category,
                _price,
                _gameName,
                _gameProfile,
                _assetImage,
                _description,
                _rarities,
                _status
            );

            assets.push(newAsset);

            emit AssetAdded(
                _seller,
                _assetName,
                _category,
                _price,
                _gameName,
                _gameProfile,
                _assetImage,
                _description,
                _rarities,
                _status
            );
        }

        function getAllAssets() public view returns (Asset[] memory) {
            return assets;
        }

        function updateStatusAndBuyerByIndex(
            uint _index,
            address _buyer,
            string memory _status
        ) public {
            require(_index < assets.length, "Index out of bounds");
            
            assets[_index].buyer = _buyer;
            assets[_index].status = _status;

            emit AssetUpdated(
                _index,
                _buyer,
                _status
            );
        }
    }