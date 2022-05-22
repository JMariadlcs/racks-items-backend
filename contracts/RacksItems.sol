// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol"; // define roles
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol"; // erc1155 tokens
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol"; // contract should be ERC1155 holder to receive ERC1155 tokens
import "@openzeppelin/contracts/token/ERC721/IERC721.sol"; // to instanciate MrCrypto object
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol"; // to work with COORDINATOR and VRF
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol"; // to use functionalities for Chainlink VRF
import "./IRacksItems.sol"; // RacksItems interface
import "./RacksToken.sol"; // RacksToken

contract RacksItems is ERC1155, ERC1155Holder, AccessControl, VRFConsumerBaseV2 { // VRFv2SubscriptionManager
   
  /**
  * @notice Enum for Contract state -> to let user enter call some functions or not
  */
  enum ContractState {   
    Active,
    Inactive
  }

  /**
  * @notice Struct for Items on the Marketplace
  */
  struct itemOnSale{
        uint tokenId;
        uint marketItemId;
        uint price;
        address seller;
        bool sold;
  }

  /// @notice tokens
  IERC721 MR_CRYPTO;
  address public constant i_MrCryptoAddress = 0xeF453154766505FEB9dBF0a58E6990fd6eB66969;
  IERC20 racksToken;
  
  /// @notice Standard variables
  bytes32 public constant ADMIN_ROLE = 0x00;
  address private _owner;
  uint256 private s_maxTotalSupply;
  uint256 private s_tokenCount;
  uint private _marketCount;
  uint256 public casePrice; // Change to RacksToken
  bool public contractActive = true;
  ContractState public s_contractState;
  itemOnSale[] _marketItems;

  /// @notice VRF Variables
  VRFCoordinatorV2Interface public immutable i_vrfCoordinator; 
  bytes32 public immutable i_gasLane;
  uint64 public immutable i_subscriptionId;
  uint32 public immutable i_callbackGasLimit;
  uint16 public constant REQUEST_CONFIRMATIONS = 3; 
  uint32 public constant NUM_WORDS = 2; 
  uint256 public s_randomWord; // random Number we get from Chainlink VRF
  
  /// @notice Mappings
  mapping(address => bool) private s_gotRacksMembers;
  mapping(uint => uint) private s_maxSupply;
  mapping (uint256 => string) private s_uris; 

  /// @notice Events
  event CaseOpened(address user, uint256 casePrice, uint256 item);
  event casePriceChanged(uint256 newPrice);
  event itemExchanged(address user, uint256 tokenId);
  event sellingItem(address user, uint256 tokenId, uint256 price);
  event itemBought(address buyer, address seller, uint256 marketItemId, uint256 price);
  
  /// @notice Modifiers
  /// @notice Check that person calling a function is the owner of the Contract
  modifier onlyOwner() {
      require(msg.sender == _owner, "User is not the owner");
      _;
  }

  /// @notice Check that user is Member and owns at least 1 MrCrypto
  modifier onlyVIP() {
      require(isVip(msg.sender), "User is not RacksMembers or does not owns a MrCrypto");
      _;
  }

  modifier onlyOwnerOrAdmin() {
    require(_isOwnerOrAdmin(msg.sender), "User is not the Owner or an Admin");
    _;
  }

  /// @notice Check if contract state is Active
  modifier contractIsActive() {
    require(s_contractState == ContractState.Active, "Contract is not active at this moment");
    _;
  }

  constructor(address vrfCoordinatorV2, bytes32 gasLane, uint64 subscriptionId, uint32 callbackGasLimit, address _racksTokenAddress) 
  VRFConsumerBaseV2(vrfCoordinatorV2)
  ERC1155(""){
    /**
    * Initialization of Chainlink VRF variables
    */
    i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2); 
    i_gasLane = gasLane; 
    i_subscriptionId = subscriptionId;
    i_callbackGasLimit = callbackGasLimit; 

    /**
    * Initialization of RacksItem contract variables
    */
    MR_CRYPTO = IERC721(i_MrCryptoAddress);
    racksToken = IERC20(_racksTokenAddress);
    _owner = msg.sender;
    s_tokenCount = 0;
    casePrice = 1;
    s_contractState = ContractState.Active;

    /**
    * Mint of initial supply
    _mintSupply(address(this), 100000); // Jeans
    _mintSupply(address(this), 1000); // Hoddie 
    _mintSupply(address(this), 50000); // Watch
    _mintSupply(address(this), 1000); // Coat
    _mintSupply(address(this), 30000); // Shoes
     */
  }

  /** 
  * @notice Need to override supportsInterface function because Contract is ERC1155 and AccessControl
  */
  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, ERC1155Receiver, AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }


  // FUNCTIONS RELATED WITH THE CASE

  /**
  * @notice Change price of the box
  * @dev Only callable by the Owner
  */
  function setCasePrice(uint256 price) public onlyOwnerOrAdmin {
    casePrice = price;
    emit casePriceChanged(price);
  }

  /**
  * @notice View case price
  */
  function getCasePrice() public view returns(uint256) {
    return casePrice;
  }

  /**
  * @notice Used to get an actually Random Number -> to pick an item when openning a case
  * @dev Uses Chainlink VRF -> call requestRandomWords method by using o_vrfCoordinator object
  * set as internal because is going to be called only when a case is opened
  */
  function _randomNumber() public returns(uint256) {
  uint256 s_requestedNumber = i_vrfCoordinator.requestRandomWords(i_gasLane, i_subscriptionId, REQUEST_CONFIRMATIONS, i_callbackGasLimit, NUM_WORDS);
  return s_requestedNumber;
  }

  /**
  * @notice Function to actually pick a winner 
  * @dev 
  * - randomWords -> array of randomWords
  */
  function fulfillRandomWords(uint256 /* requestId */, uint256[] memory randomWords) internal override {
    s_randomWord = randomWords[0]; // just in case random number is very long we apply modular function 
  }

   /**
  * @notice Function used to 'open a case' and get an item
  * @dev 
  * - Should check that msg.value is bigger than casePrice
  * - Should transfer msg.value to the contract
  * - Internally calls randomNumber() 
  * - Apply modular function for the randomNumber to be between 0 and totalSupply of items
  * - Should choose an item
  */
  function openCase() public /*onlyVIP contractIsActive*/ {  
    racksToken.transferFrom(msg.sender, address(this), casePrice);
    uint256 randomNumber = _randomNumber()  % s_maxTotalSupply;
    uint256 totalCount = 0;
    uint256 item;

    for(uint256 i = 0 ; i < s_tokenCount; i++) {
      uint256 _newTotalCount = totalCount + s_maxSupply[i] ;
      if(randomNumber > totalCount) {
        totalCount = _newTotalCount;
      }else {
        item = i-1;
        if(balanceOf(address(this),item)==0){
          for(uint256 j = item-1; j >= 0; j--){
            if (balanceOf(address(this),j)>0){
              item = j;
              break;
            }
          }
        }
        _safeTransferFrom(address(this), msg.sender, item , 1,"");
        break;
      }
    }
    emit CaseOpened(msg.sender, casePrice, item);
  }


  // FUNCTIONS RELATED TO ITEMS

  /**
  * @notice Returns maxSupply of specific item (by tokenId)
  * @dev - Getter of s_maxSupply mapping
  */
  function supplyOfItem(uint256 tokenId) public view returns(uint) {
    return s_maxSupply[tokenId];
  }

  /**
  * @notice Check that item exists (by tokenId)
  */
  function _itemExists(uint256 tokenId) internal view returns (bool) {
    require(s_maxSupply[tokenId] > 0);
    return true;
  }

  /**
  * @notice Calculate chance of receiving an specific item
  * - As higher is result higher is the rarity of the item
  * @dev - Requires that tokenId exists (item is listed)
  * - chance is calculated as item supply divided by total items supply
  */
  function _rarityOfItem(uint256 tokenId) public virtual view returns(uint256) {
    require(_itemExists(tokenId));
    uint256 result = s_maxTotalSupply / s_maxSupply[tokenId];
    return result;
  }

  /**
  * @notice Returns all the items inside the user's inventory (Could be used by the
  * user to check his inventory or to check someone else inventory by address)
  * @dev Copy users inventory in an empty array and returns it
  */
  function viewItems(address owner) public view returns(uint256[] memory) { 
    uint256[] memory inventory = new uint [](s_tokenCount);
    for(uint256 i=0 ; i<inventory.length; i++) {
      inventory[i]=balanceOf(owner,i);
    }
    return inventory;
  }

  /**
  * @notice List a new item to the avaliable collection
  * @dev Only callable by the Owner
  */
  function listItem(uint256 itemSupply) public onlyOwnerOrAdmin {
    _mintSupply(address(this), itemSupply);
  }

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
  function _mintSupply(address receiver, uint256 amount) internal {
      _mint(receiver, s_tokenCount, amount, "");
      _setMaxSupply(s_tokenCount, amount);
      s_maxTotalSupply += amount;
      s_tokenCount += 1;
  }

  /**
  * @notice Function used to set maxSupply of each item
  */
  function _setMaxSupply(uint256 tokenId, uint256 amount) internal {
      s_maxSupply[tokenId] = amount;
  }


  // FUNCTIONS RELATED TO THE "MARKETPLACE"

  /**
  * @notice Function used to sell an item on the marketplace
  * @dev
  * - Needs to check balanceOf item trying to be sold
  * - Needs to transfer item 
  * - Update marketItems array
  * - Emit event 
  */
  function sellItem(uint256 tokenId, uint256 price) public {
    require(balanceOf(msg.sender, tokenId) > 0, "Item not found.");
    _safeTransferFrom(msg.sender, address(this), tokenId, 1 ,"");
    _marketItems.push(
      itemOnSale(
        tokenId,
        _marketCount,
        price,
        msg.sender,
        false
      )
    );
    _marketCount++;
    emit sellingItem(msg.sender, tokenId, price);
  }

  /**
  * @notice Function used to exchange a token item for a real physical clothe.
  */
  function exchangeItem(uint256 tokenId) public {
    require(balanceOf(msg.sender, tokenId) > 0);
     _burn(msg.sender, tokenId, 1);
     s_maxSupply[tokenId] -= 1;
     s_maxTotalSupply -=1;
     emit itemExchanged(msg.sender, tokenId);
  }

  /**
  * @notice Function used to buy an item on the marketplace
  * @dev
  * - Needs to check that user is not trying to buy its own item
  * - Needs to check that item was not sold before
  * - Needs to transfer tokens from buyer to seller
  * - Needs to transfer item from seller to buyer
  * - Update sold attribute from array
  * - Emit event 
  */
  function buyItem(uint256 marketItemId) public {
    require(msg.sender!=item.seller);
    require(item.sold==false);
    itemOnSale memory item = _marketItems[marketItemId];
    racksToken.transferFrom(msg.sender, item.seller, item.price);
    _safeTransferFrom(address(this), msg.sender, item.tokenId, 1 ,"");
    item.sold = true;
    emit itemBought(msg.sender, item.seller, marketItemId, item.price);
  }

  /**
  * @notice Function used to return items that are currently on sale
  */
  function getMarketItem(uint marketItemId) public view returns(itemOnSale memory){
    return _marketItems[marketItemId];
  }

  function getItemsOnSale() public view returns(itemOnSale[] memory) {
    uint arrayLength;
    
    for(uint i=0; i<_marketItems.length;i++){
      itemOnSale memory  item = _marketItems[i];
      if(item.sold==false){
        arrayLength+=1;
      }
    }
    itemOnSale[] memory items = new itemOnSale[](arrayLength);
    uint indexCount;
    for(uint256 i = 0; i < _marketItems.length; i++){
      itemOnSale memory  item = _marketItems[i];
      if(item.sold==false){
        items[indexCount]=item;
        indexCount++;

      }
    }
    return items;
  }

  // FUNCTIONS RELATED TO "USERS"

  /**
  * @notice Check if user is RacksMembers and owns at least 1 MrCrypto
  * @dev - Require users MrCrypro's balance is > '
  * - Require that RacksMembers user's attribute is true
  */
  function isVip(address user) public view returns(bool){
    require(MR_CRYPTO.balanceOf(user) > 0);
    require(s_gotRacksMembers[user]);
    return true;
  }

  /**
  * @notice Check if user is owner of the Contract or has admin role
  * @dev Only callable by the Owner
  */
  function _isOwnerOrAdmin(address user) internal view returns (bool) {
      require(_owner == user || hasRole(ADMIN_ROLE, user));
      return true;
  }

  /**
  * @notice Set RacksMember attribute as true for a user that is Member
  * @dev Only callable by the Owner
  * Require comented because maybe owner or admin are trying to set as true some address that was already set as true
  */
  function setSingleRacksMember(address user) public onlyOwnerOrAdmin {
    //require(!s_gotRacksMembers[user], "User is already RacksMember");
    s_gotRacksMembers[user] = true;
  }

  /**
  * @notice Set RacksMember attribute as true for a list of users that are Members (array)
  * @dev Only callable by the Owner
  * Require comented because maybe owner or admin are trying to set as true some address that was already set as true
  */
  function setListRacksMembers(address[] memory users) public onlyOwnerOrAdmin {
    for (uint256 i = 0; i < users.length; i++) {
      //require(!s_gotRacksMembers[users[i]], "User is already RacksMember");
       s_gotRacksMembers[users[i]] = true;
    }
  }

  /**
  * @notice Set RacksMember attribute as false for a user that was Racks Member before but it is not now
  * @dev Only callable by the Owner
  * Require comented because maybe owner or admin are trying to set as false some address that was already set as false
  */
  function removeSingleRacksMember(address user) public onlyOwnerOrAdmin {
    //require(s_gotRacksMembers[user], "User is already not RacksMember");
    s_gotRacksMembers[user] = false;
  }

  /**
  * @notice Set RacksMember attribute as false for a list of users that are Members (array)
  * @dev Only callable by the Owner
  * Require comented because maybe owner or admin are trying to set as false some address that was already set as false
  */
  function removeListRacksMembers(address[] memory users) public onlyOwnerOrAdmin {
    for (uint256 i = 0; i < users.length; i++) {
      //require(s_gotRacksMembers[users[i]], "User is already not RacksMember");
      s_gotRacksMembers[users[i]] = false;
    }
  }

  /**
  * @notice Set new Admin
  * @dev Only callable by the Owner
  */
  function setAdmin(address _newAdmin) public onlyOwner {
    _setupRole(ADMIN_ROLE, _newAdmin);
  }

  // FUNCTIONS RELATED WITH THE CONTRACT

  /**
  * @notice Change contract state from Active to Inactive and viceversa
  * @dev Only callable by the Owner or an admin
  */
  function flipContractState() public onlyOwnerOrAdmin {
    if (s_contractState == ContractState.Active) {
      s_contractState = ContractState.Inactive;
    }else {
      s_contractState = ContractState.Active;
    }
  }

  // FUNCTIONS RELATED TO ERC1155 TOKENS

  /**
  * @notice Used to return token URI by inserting tokenID
  * @dev - returns information stored in s_uris mapping
  * - Any user can check this information
  */
  function uri(uint256 tokenId) override public view returns (string memory) {
    return(s_uris[tokenId]);
  }

  /**
  * @notice Used to set tokenURI to specific item 
  * @dev - Only Owner or Admins can call this function
  * - Need to specify:
  *  - tokenId: specific item you want to set its uri
  *  - uri: uri wanted to be set
  */
  function setTokenUri(uint256 tokenId, string memory _uri) public onlyOwnerOrAdmin {
        require(bytes(s_uris[tokenId]).length == 0, "Can not set uri twice"); 
        s_uris[tokenId] = _uri; 
  }

  
  // FUNCTIONS RELATED TO FUNDS
  
  /**
  * @notice Used to withdraw specific amount of funds
  * @dev 
  * - Only owner is able to call this function
  * - Should check that there are avaliable funds to withdraw
  * - Should specify the wallet address you want to transfer the funds to
  * - Should specify the amount of funds you want to transfer
  */
  function withdrawFunds(address wallet, uint256 amount) public onlyOwner {
    require(address(this).balance > 0, "No funds to withdraw");
    racksToken.transfer(wallet, amount);
  }

  /**
  * @notice Used to withdraw ALL funds
  * @dev 
  * - Only owner is able to call this function
  * - Should check that there are avaliable funds to withdraw
  * - Should specify the wallet address you want to transfer the funds to
  */
  function withdrawAllFunds(address wallet) public onlyOwner {
    require(address(this).balance > 0, "No funds to withdraw");
    racksToken.transfer(wallet, address(this).balance);
  }

  /// @notice Receive function
  receive() external payable {
  }
}