// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserProfile {
    struct Profile {
        address user;
        string assetName;
        string category;
        string price;
        string gameName;
        string assetImage;
        string description;
        string rarities;
        string status;
    }

    Profile[] private profiles;

    event ProfileAdded(
        uint256 indexed profileId,
        address indexed user,
        string assetName,
        string category,
        string price,
        string gameName,
        string assetImage,
        string description,
        string rarities,
        string status
    );

    event ProfileUpdated(
        uint256 indexed profileId,
        string status
    );

    function addProfile(
        address _user,
        string memory _assetName,
        string memory _category,
        string memory _price,
        string memory _gameName,
        string memory _assetImage,
        string memory _description,
        string memory _rarities,
        string memory _status
    ) public {
        uint256 profileId = profiles.length;
        
        profiles.push(Profile(
            _user,
            _assetName,
            _category,
            _price,
            _gameName,
            _assetImage,
            _description,
            _rarities,
            _status
        ));

        emit ProfileAdded(
            profileId,
            _user,
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

    function getAllProfiles() public view returns (Profile[] memory) {
        return profiles;
    }

    function updateProfileStatus(
        uint256 _profileId,
        string memory _status
    ) public {
        require(_profileId < profiles.length, "Profile does not exist");
        
        profiles[_profileId].status = _status;

        emit ProfileUpdated(
            _profileId,
            _status
        );
    }
}