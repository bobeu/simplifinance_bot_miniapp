import { ethers } from "ethers";
import { Address, AmountToApproveParam, FormattedData, FormattedPoolContentProps, HandleTransactionParam } from "@/interfaces";
import getCurrentDebt from "./apis/read/getCurrentDebt";
import getAllowance from "./apis/update/testToken/getAllowance";
import getCollateralQuote from "./apis/read/getCollateralQuote";
import approve from "./apis/update/testToken/approve";
import addToPool from "./apis/update/factory/addToPool";
import getFinance from "./apis/update/factory/getFinance";
import liquidate from "./apis/update/factory/liquidate";
import payback from "./apis/update/factory/payback";
import { formatEther,} from "viem";
// import { Co } from "../contract/typechain-types/contracts/apis/IFactory";
import createPermissioned from "./apis/update/factory/createPermissioned";
import createPermissionless from "./apis/update/factory/createPermissionless";
import assert from "assert";
import { getContractData } from "./apis/utils/getContractData";
import withdrawLoan from "./apis/update/testToken/withdrawLoan";
import removePool from "./apis/update/factory/removePool";
import BigNumber from "bignumber.js";
import { ROUTER } from "./constants";

export type Operation = 'Open' | 'Closed';

/**
 * Converts value of 'value' of type string to 'ether' representation.
 * @param value : Value to convert.
 * @returns Formatted value.
 */
export const formatValue = (value: string | undefined): string => {
  if(value === "undefined" || value === undefined) {
    return '0';
  } 
  return ethers.formatEther(value);
}

export const str = (arg: string | undefined) => String(arg);
export const num = (arg: number | undefined) => Number(arg);

export const formatAddr = (x: string | (Address | undefined)) : Address => {
  if(!x || x === "") return `0x${'0'.repeat(40)}`;
  return `0x${x.substring(2, 42)}`;
};

export const toBigInt = (x: string | number | ethers.BigNumberish | bigint | undefined) : bigint => {
  if(!x) return 0n;
  return ethers.toBigInt(x);
} 

export const toBN = (x: string | number ) => {
  return new BigNumber(x);
}

export function getTimeFromEpoch(onchainUnixTime: number) {
  var date = new Date(onchainUnixTime * 1000);
  return (onchainUnixTime === 0? 'Not Set' : `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-US")}`);
}

export const commonStyle = (props?: {}) => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    p: 2,
    ...props
  };
} 

/**
 * Filter and calculate amount to approve
 * Note: If trxnType is 'PAY', we provide for 60 minutes contingency between now and 
 * transaction time. This is to avoid the trx being reverted. User should not worry as 
 * what the contract takes is the exact debt to date.
 * @param param 
 * @returns 
*/
export const getAmountToApprove = async(param: AmountToApproveParam) => {
  const { txnType, unit, client, intPerSec, lastPaid, account, wagmiConfig } = param;
  let amtToApprove : BigNumber = toBN(unit.toString());
  let owner = account;
  let spender = getContractData(wagmiConfig.state.chainId).factory;

  switch (txnType) {
    case 'PAYBACK':
      assert(intPerSec !== undefined, "Utilities: Interest per second is undefined");
      const estCurDebt = toBN((await getCurrentDebt({client, unit, account})).toString());
      amtToApprove = estCurDebt.plus(toBN(intPerSec.toString()).times(60)); 
      break;
    case 'LIQUIDATE':
      assert(intPerSec !== undefined && lastPaid, "Utilities: IntPerSec parameter is missing.");
      const debtOfLastPaid = toBN((await getCurrentDebt({client, unit, account: lastPaid})).toString());
      amtToApprove = debtOfLastPaid.plus(toBN(intPerSec.toString()).times(60));
      break;
    case 'GET FINANCE':
      const collateral = await getCollateralQuote({client, unit});
      // amtToApprove = toBN(collateral?.[0].toString());
      break;
    default:
      break;
    }
    const prevAllowance = toBN((await getAllowance({client, account, owner, spender})).toString());
    if(prevAllowance.gte(amtToApprove)) {
      amtToApprove = toBN(0);
    }
  return amtToApprove;
}

export const handleTransaction = async(param: HandleTransactionParam) => {
  const { callback, client, bank, preferredDuration, router, createPermissionedPoolParam, createPermissionlessPoolParam, otherParam} = param;
  const amountToApprove = await getAmountToApprove(otherParam);
  const { account, wagmiConfig,  unit, txnType } = otherParam;
  if(txnType !== 'GET FINANCE' && txnType !== 'REMOVE') {
    if(amountToApprove.gt(0)) {
      await approve({
          account,
          wagmiConfig,
          client,
          callback,
          amountToApprove: toBigInt(amountToApprove.toString())
      });
    }
  }
  switch (txnType) {
    case 'ADD LIQUIDITY':
      await addToPool({account, wagmiConfig, client, unit, callback});
      break;
    case 'GET FINANCE':
      assert(preferredDuration !== undefined && bank !== undefined, "Utilities: PreferredDuration not set");
      const get = await getFinance({account, client, value: toBigInt(amountToApprove.toString()), wagmiConfig, unit, daysOfUseInHr: toBN(preferredDuration).toNumber(), callback});
      if(get === 'success') await withdrawLoan({wagmiConfig, client, account, bank, callback});
      break;
    case 'PAYBACK':
      assert(bank !== undefined, "Bank address is undefined");
      await payback({account, wagmiConfig, client, unit, callback});
      // if(pay === 'success') { 
      //   await withdrawCollateral({account, wagmiConfig, bank, callback});
      // }  
      break;
    case 'REMOVE':
      await removePool({account, client, wagmiConfig, unit}); 
      break;
    case 'LIQUIDATE':
      await liquidate({account, client, wagmiConfig, unit, callback});
      break;
    case 'CREATE':
      assert(router, "Utilities: Router was not provider");
      switch (router) {
        case 'Permissioned':
          assert(createPermissionedPoolParam, "Utilities: createPermissionedPoolParam: Param not found");
          await createPermissioned(createPermissionedPoolParam);
          break;
        case 'Permissionless':
          assert(createPermissionlessPoolParam, "Utilities: createPermissionless parameters not found");
          await createPermissionless(createPermissionlessPoolParam)
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
}

/**
 * Formats pool data
 * @param pool : Pool data
 * @returns : Formatted data
 */
export const formatPoolContent = (pool: any, formatProfiles: boolean, currentUser: Address) : FormattedPoolContentProps => {
  const {
    pool: {
      uint256s: { unit, currentPool, intPerSec, rId, fullInterest, unitId: unitId_, },
      uints: { intRate, quorum, allGh, userCount, duration, colCoverage, selector },
      addrs: { admin, asset, lastPaid, bank },
      router,
      stage
    },
    cData
  } = pool;

  let cData_formatted : FormattedData[] = [];
  const isPermissionless = toBN(router.toString()).toNumber() === ROUTER.PERMISSIONLESS;
  const selector_toNumber = toBN(selector.toString()).toNumber();
  const colCoverage_InString = toBN(colCoverage.toString()).toString();
  const fullInterest_InEther = formatEther(toBigInt(toBN(fullInterest.toString()).toString()));
  const intPerSec_InEther = formatEther(toBigInt(toBN(intPerSec.toString()).toString()));
  const currentPool_InEther = formatEther(toBigInt(toBN(currentPool.toString()).toString()));
  const allGET_bool  = toBN(allGh.toString()).eq(toBN(userCount.toString()));
  const allGh_toNumber = toBN(allGh.toString()).toNumber();
  const unitId_toNumber = toBN(unitId_.toString()).toNumber();
  const quorum_toNumber = toBN(quorum.toString()).toNumber();
  const unitId_bigint = toBigInt(unitId_);
  const stage_toNumber = toBN(stage.toString()).toNumber();
  const expectedPoolAmt_bigint = toBigInt(toBN(unit.toString()).times(toBN(quorum.toString())).toString());
  const unit_InEther =  formatEther(toBigInt(toBN(unit.toString()).toString())).toString();
  const userCount_toNumber = toBN(userCount.toString()).toNumber();
  const intPercent_string = toBN(intRate.toString()).div(100).toString();
  const duration_toNumber = toBN(duration.toString()).div(3600).toNumber();
  const poolFilled = userCount_toNumber === quorum_toNumber;
  let isMember = false;

  if(formatProfiles && cData.length > 0) {
    cData.forEach((data: any) => {
      cData_formatted.push(formatProfileData(data));
      if(data.id.toString().toLowerCase() === currentUser.toString().toLowerCase()) {
        isMember = true;
      }
    });
  }

  return {
    unit,
    unit_bigint: BigInt(unit.toString()),
    rId: BigInt(rId.toString()),
    quorum_toNumber,
    userCount_toNumber,
    allGET_bool,
    allGh_toNumber,
    unitId_toNumber,
    unitId_bigint,
    stage_toNumber,
    expectedPoolAmt_bigint,
    unit_InEther,
    intPercent_string,
    duration_toNumber,
    poolFilled,
    isPermissionless,
    selector_toNumber,
    colCoverage_InString,
    fullInterest_InEther,
    intPerSec_InEther,
    currentPool_InEther,
    unitInBN: toBN(unit.toString()),
    currentPoolInBN: toBN(currentPool.toString()),
    admin_lowerCase: admin.toString().toLowerCase(),
    asset_lowerCase: asset.toString().toLowerCase(),
    admin,
    asset,
    isMember,
    isAdmin: currentUser.toString().toLowerCase() === admin.toString().toLowerCase(),
    cData_formatted,
    intPerSec,
    formatted_bank: formatAddr(bank.toString()),
    lastPaid: formatAddr(lastPaid.toString())
  }
}

export const formatProfileData = (param:any) : FormattedData => {
  const { payDate, colBals, turnTime, durOfChoice, expInterest, sentQuota, id, loan, } = param;
  const payDate_InSec = toBN(payDate.toString()).toNumber();
  const turnTime_InSec = toBN(turnTime.toString()).toNumber();
  const durOfChoice_InSec = toBN(durOfChoice.toString()).toNumber();
  const colBals_InEther = formatEther(toBigInt(toBN(colBals.toString()).toString()));
  const loan_InEther = formatEther(toBigInt(toBN(loan.toString()).toString()));
  const loan_InBN = toBN(loan.toString());
  const expInterest_InEther = formatEther(toBigInt(toBN(expInterest.toString()).toString()));
  const payDate_InDateFormat = getTimeFromEpoch(payDate_InSec);
  const turnTime_InDateFormat = getTimeFromEpoch(turnTime_InSec);
  const id_lowerCase = id.toString().toLowerCase()

  return {
    payDate_InDateFormat,
    payDate_InSec,
    turnTime_InDateFormat,
    turnTime_InSec,
    durOfChoice_InSec,
    colBals_InEther,
    loan_InEther,
    expInterest_InEther,
    id_lowerCase,
    id_toString: id.toString(),
    loan_InBN,
    sentQuota
  }
}
