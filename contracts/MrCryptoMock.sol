// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
    This is a representation of the RacksToken.
 */
contract MockMrCryptoMock is ERC721("MrCrypto NFT", "MrC"), Ownable {
    
    uint256 tokenCounter;

    // implement the mint function
    function mint(address _to) public onlyOwner{ 
        tokenCounter++;
        _mint(_to, tokenCounter);                
    }
}