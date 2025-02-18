import { CommonToolArg, ToolConfigProperties } from "@/interfaces";
import { getMyCurrentDebt } from "./getMyCurrentDebt";
import { getCurrentDebtOf } from "./getCurrentDebtOf";
import { createPermissionlessPool } from "./createPermissionlessPool";
import { createPermissionedPool } from "./createPermissionedPool";
import { addUserToPool } from "./addUserToPool";
import { get_CollateralQuote } from "./getCollateralQuote";
import { getFinance } from "./getFinance";
import { payback } from "./payback";
import { liquidate } from "./liquidate";
import { removePool } from "./removePool";

export function buildTools(toolArg : CommonToolArg) : Record<string, ToolConfigProperties>  {
    return {
        get_current_debt: getMyCurrentDebt(),
        get_current_debt_of: getCurrentDebtOf(),
        get_collateral_quote: get_CollateralQuote(),
        create_permissionless_pool: createPermissionlessPool(toolArg),
        create_permissioned_pool: createPermissionedPool(toolArg),
        join_pool: addUserToPool(toolArg),
        get_finance: getFinance(toolArg),
        payback_loan: payback(toolArg),
        liquidate_defaulter: liquidate(toolArg),
        remove_pool: removePool(toolArg)
    }
}