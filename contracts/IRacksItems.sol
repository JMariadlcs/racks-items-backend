// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol"; // to work with COORDINATOR and VRF
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol"; // to use functionalities for Chainlink VRF

interface IRacksItems is ERC1155, AccessControl, VRFConsumerBaseV2 { 

 /**
  * @notice Enum for Contract state -> to let user enter call some functions or not
  */
  

  /// @notice Events
  event RacksTrackMinted(uint baseItemId, uint rackstrackItemId);
  
  // FUNCTIONS RELATED WITH THE CASE

  /**
  * @notice Change price of the box
  * @dev Only callable by the Owner
  */
  function setCasePrice(uint256 price) public;

  /**
  * @notice Used to get an actually Random Number -> to pick an item when openning a case
  * @dev Uses Chainlink VRF -> call requestRandomWords method by using o_vrfCoordinator object
  * set as internal because is going to be called only when a case is opened
  */
  function _randomNumber() internal returns(uint256);

  /**
  * @notice Function to actually pick a winner 
  * @dev 
  * - randomWords -> array of randomWords
  */
  function fulfillRandomWords(uint256 /* requestId */, uint256[] memory randomWords) internal override;

   /**
  * @notice Function used to 'open a case' and get an item
  * @dev 
  * - Internally calls randomNumber() 
  * - Should choose an item
  * - Should check if the item is RacksTrack (special NFT)
  *   - If it is a RacksTrack -> mint ERC721 to users wallet
  */
  function openCase() public payable returns(uint256);


  // FUNCTIONS RELATED TO ITEMS

  /**
  * @notice Returns maxSupply of specific item (by tokenId)
  * @dev - Getter of s_maxSupply mapping
  */
  function supplyOfItem(uint256 tokenId) public view returns(uint);

  /**
  * @notice Check that item exists (by tokenId)
  */
  function _itemExists(uint256 tokenId) internal view returns (bool);

  /**
  * @notice Calculate chance of receiving an specific item
  * @dev - Requires that tokenId exists (item is listed)
  * - chance is calculated as item supply divided by total items supply
  */
  function _chanceOfItem(uint256 tokenId) public virtual view returns(uint256);

  /**
  * @notice Returns all the items inside the user's inventory (Could be used by the
  * user to check his inventory or to check someone else inventory by address)
  * @dev Copy users inventory in an empty array and returns it
  */
  function viewItems(address owner) public view returns(uint256[] memory);

  /**
  * @notice List a new item to the avaliable collection
  * @dev Only callable by the Owner
  */
  function listItem(uint256 itemSupply) public;

  /**
  * @notice Mint supply tokens of each Item
  * @dev Declared internal because it is called inside the contructor
  * - call _mint function
  * - call set maxSupply function
  * - updates TotalMaxSupply of Items
  * - updates s_tokenCount -> Each items has associated an Id (e.g: Jeans -> Id: 0, Hoddie -> Id: 1,
  * we increment s_tokenCount so next time we call _mintSupply a new type of item is going to be minted)
  * - The items (tokens are minted by this contract and deposited into this contract address)
  */
  function _mintSupply(address receiver, uint256 amount) internal;

  /**
  * @notice Function used to set maxSupply of each item
  */
  function _setMaxSupply(uint256 tokenId, uint256 amount) internal;


  // FUNCTIONS RELATED TO "USERS"

  /**
  * @notice Check if user is RacksMembers and owns at least 1 MrCrypto
  * @dev - Require users MrCrypro's balance is > '
  * - Require that RacksMembers user's attribute is true
  */
  function isVip(address user) public view returns(bool);

  /**
  * @notice Check if user is owner of the Contract or has admin role
  * @dev Only callable by the Owner
  */
  function _isOwnerOrAdmin(address user) internal view returns (bool);

  /**
  * @notice Set RacksMember attribute as true for a user that is Member
  * @dev Only callable by the Owner
  * Require comented because maybe owner or admin are trying to set as true some address that was already set as true
  */
  function setSingleRacksMember(address user) public;

  /**
  * @notice Set RacksMember attribute as true for a list of users that are Members (array)
  * @dev Only callable by the Owner
  * Require comented because maybe owner or admin are trying to set as true some address that was already set as true
  */
  function setListRacksMembers(address[] memory users) public;

  /**
  * @notice Set RacksMember attribute as false for a user that was Racks Member before but it is not now
  * @dev Only callable by the Owner
  * Require comented because maybe owner or admin are trying to set as false some address that was already set as false
  */
  function removeSingleRacksMember(address user) public;

  /**
  * @notice Set RacksMember attribute as false for a list of users that are Members (array)
  * @dev Only callable by the Owner
  * Require comented because maybe owner or admin are trying to set as false some address that was already set as false
  */
  function removeListRacksMembers(address[] memory users) public;

  /**
  * @notice Set new Admin
  * @dev Only callable by the Owner
  */
  function setAdmin(address _newAdmin) public;

  // FUNCTIONS RELATED WITH THE CONTRACT

  /**
  * @notice Change contract state from Active to Inactive and viceversa
  * @dev Only callable by the Owner or an admin
  */
  function flipContractState() public;

  // FUNCTIONS RELATED TO ERC1155 TOKENS

  /**
  * @notice Used to return token URI by inserting tokenID
  * @dev - returns information stored in s_uris mapping
  * - Any user can check this information
  */
  function uri(uint256 tokenId) override public view returns (string memory);

  /**
  * @notice Used to set tokenURI to specific item 
  * @dev - Only Owner or Admins can call this function
  * - Need to specify:
  *  - tokenId: specific item you want to set its uri
  *  - uri: uri wanted to be set
  */
  function setTokenUri(uint256 tokenId, string memory _uri) public;
}