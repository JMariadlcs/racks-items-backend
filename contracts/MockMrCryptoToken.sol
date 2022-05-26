// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
    This is a representation of the RacksToken.
 */
contract MockMrCryptoToken is ERC721("MrCrypto NFT", "MrC"), Ownable {
    
    // implement the mint function
    function mint(address _to, uint256 _amount) public onlyOwner{ 
        _mint(_to, _amount);                
    }
}