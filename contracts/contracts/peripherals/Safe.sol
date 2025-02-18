// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import { Common } from "../apis/Common.sol";

abstract contract Safe {

    // Mapping of unit contribution to Safe struct
    mapping (uint256 => Common.Safe) private safes;

    /**
     * @dev Returns the safe information
     * @param unit : Unit contribution
    */
    function _getSafe(uint256 unit) public view returns(Common.Safe memory safe){
        safe = safes[unit];
    }

    /**
     * @dev Returns the safe information
     * See _getSafe
    */
    function getSafe(uint256 unit) public view returns(Common.Safe memory){
        return _getSafe(unit);
    }

    /**
     * @dev Returns the safe information
     * @param unit : Unit contribution
     * @param safe : Safe Struct
    */
    function _setSafe(Common.Safe memory safe, uint256 unit) internal virtual {
        safes[unit] = safe;
    }
}