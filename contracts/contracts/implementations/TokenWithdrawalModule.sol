// SPDX-License-Identifier : MIT

pragma solidity 0.8.24;

import "@safe-global/safe-contracts/contracts/common/Enum.sol";
import "@safe-global/safe-contracts/contracts/Safe.sol";

contract TokenWithdrawalModule {
    bytes32 public immutable PERMIT_TYPEHASH =
    keccak256(
      "TokenWithdrawModule(uint256 amount,address _beneficiary,uint256 nonce,uint256 deadline)"
    );
    address public immutable safeAddress;
    address public immutable tokenAddress;
    mapping(address => uint256) public nonces;
    
    constructor(address _tokenAddress, address _safeAddress) {
        tokenAddress = _tokenAddress;
        safeAddress = _safeAddress;
    }

    function getDomainSeparator() private view returns (bytes32) {
      return keccak256(
          abi.encode(
              keccak256(
                "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
              ),
              keccak256(bytes("TokenWithdrawModule")),
              keccak256(bytes("1")),
              block.chainid,
              address(this)
          )
      );
    }

function tokenTransfer(
        uint _amount,
        address _beneficiary,
        uint256 _deadline,
        bytes memory _signatures
    ) public {
        require(_deadline >= block.timestamp, "expired deadline");
        bytes32 signatureData = keccak256(
            abi.encode(
                PERMIT_TYPEHASH,
                _amount,
                msg.sender,
                nonces[msg.sender]++,
                _deadline
            )
        );

        bytes32 hash = keccak256(
            abi.encodePacked("\x19\x01", getDomainSeparator(), signatureData)
        );

        Safe(payable(safeAddress)).checkSignatures(
            hash,
            abi.encodePacked(signatureData),
            _signatures
        );

        bytes memory data = abi.encodeWithSignature(
            "transfer(address,uint256)",
            _beneficiary,
            _amount
        );

        // Calling `execTransactionFromModule` with the transaction data to execute the token transfer through the Safe account.
        require(
            Safe(payable(safeAddress)).execTransactionFromModule(
                tokenAddress,
                0,
                data,
                Enum.Operation.Call
            ),
            "Could not execute token transfer"
        );
    }

}