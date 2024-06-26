// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RADToken is ERC1155, Ownable {
    constructor(address initialOwner, string memory baseURI) ERC1155(baseURI) Ownable(initialOwner) {
        // Initialize contract with metadata URI
    }

    /**
     * @dev Mint new tokens.
     * @param account Address to receive the tokens.
     * @param id Token ID to mint.
     * @param amount Number of tokens to mint.
     * @param data Data passed to recipient if it's a contract.
     */
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    /**
     * @dev Mint multiple types of tokens in batch.
     * @param to Address to receive the tokens.
     * @param ids Array of token IDs to mint.
     * @param amounts Array of amounts of tokens to mint.
     * @param data Data passed to recipient if it's a contract.
     */
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    /**
     * @dev Update URI for all tokens.
     * @param newuri New URI for all metadata.
     */
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /**
     * @dev Overriding the URI function to fetch metadata.
     * This makes the contract metadata flexible and modifiable.
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(tokenId), Strings.toString(tokenId), ".json"));
    }

    /**
     * @dev Burn tokens to reduce supply or remove tokens from circulation.
     * @param account Address from which tokens will be burnt.
     * @param id Token ID to burn.
     * @param amount Number of tokens to burn.
     */
    function burn(address account, uint256 id, uint256 amount) public onlyOwner {
        _burn(account, id, amount);
    }

    /**
     * @dev Burn multiple token types in a single call.
     * @param account Address from which tokens will be burnt.
     * @param ids Array of token IDs.
     * @param amounts Array of amounts to burn.
     */
    function burnBatch(address account, uint256[] memory ids, uint256[] memory amounts)
        public
        onlyOwner
    {
        _burnBatch(account, ids, amounts);
    }
}
