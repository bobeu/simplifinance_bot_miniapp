// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import { Common } from "../apis/Common.sol";

abstract contract Pools {
    uint public pastRecords;

    // Mapping of unit contribution to past pool
    mapping (uint256 => mapping( Common.UnitStatus => Common.Pool)) private pools; 

    /**
     * @dev Add pool to storage
     * @param pool : A new pool that just ended
     * @param unit : Unit contribution
     */
    function _setPool(Common.Pool memory pool, uint256 unit, Common.UnitStatus status) internal virtual {
        pools[unit][status] = pool;
    }

    /**
     * @dev Remove pool from storage
     * @param unit : Unit contribution
     */
    function _removePool(uint256 unit) internal virtual {
        delete pools[unit][Common.UnitStatus.CURRENT];
    }

    /**
     * @dev Get pool from storage
     * @param unit : Unit contribution
     */
    function _getPool(uint256 unit, Common.UnitStatus status) internal view returns(Common.Pool memory) {
        return pools[unit][status];
    }

    /**
     * @dev Get pool from storage
     * @param unit : Unit contribution
     */
    function isPoolAvailable(uint256 unit) public view returns(bool) {
        return pools[unit][Common.UnitStatus.CURRENT].lInt.status == Common.Status.AVAILABLE;
    }

    function _getRecordId() internal returns(uint rId) {
        rId = pastRecords;
        pastRecords ++;
    }
}