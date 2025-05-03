// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfileContract {
    struct ProfileAsset {
        address user;
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

    ProfileAsset[] private profileAssets;

    event ProfileAssetAdded(
        address indexed user,
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

    event ProfileAssetUpdated(
        uint indexed index,
        string status
    );

    function addProfileAsset(
        address _user,
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
        ProfileAsset memory newAsset = ProfileAsset(
            _user,
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

        profileAssets.push(newAsset);

        emit ProfileAssetAdded(
            _user,
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

    function getAllProfileAssets() public view returns (ProfileAsset[] memory) {
        return profileAssets;
    }

    function updateStatusByIndex(
        uint _index,
        string memory _status
    ) public {
        require(_index < profileAssets.length, "Index out of bounds");
        
        profileAssets[_index].status = _status;

        emit ProfileAssetUpdated(
            _index,
            _status
        );
    }
}