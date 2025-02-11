  // SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import { Address } from "@openzeppelin/contracts/utils/Address.sol";

library SafeCall {
  using Address for address;

  function createTransaction(
    address _safe,
    address _beneficiary,
    uint _amount
  ) internal {
    _callOptionalReturn(
      _safe,
      abi.encodeWithSignature(
          "transfer(address,uint256)",
          _beneficiary,
          _amount
      )
    );
  }

  /**
   * @param data The call data (encoded using abi.encode or one of its variants).
   */
  function _callOptionalReturn(address safe, bytes memory data) private {
    bytes memory returndata = safe.functionCall(data);
    if (returndata.length > 0) {
      require(abi.decode(returndata, (bool)), "SafeCall: Create trx failed");
    }
  }
}