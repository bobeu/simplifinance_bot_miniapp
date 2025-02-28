import React from "react";
import BigNumber from "bignumber.js";
import { BigNumberish, ethers } from "ethers";

export type Path = '/dashboard' | '/yield' | '/simplidao' | '/flexpool' | 'faq';
export type ViemClient = import('viem').Client;
export type WagmiConfig = import('wagmi').Config;
export type TxnStatus = "Pending" | "Confirming" | "Confirmed" | "Reverted" | "Failed";
export type Str = string;
export type Address = `0x${string}`;
export type LiquidityInnerLinkEntry = 'Dashboard' | 'Create' | 'Open' | 'Closed' | string;
export type ActiveLink = 'Home' | 'Invest' | 'Dao' | 'Liquidity' | 'SpeedDoc' | '';
export type InputSelector = 'Quorum' | 'Duration' | 'CCR' | 'Interest' | 'UnitLiquidity' | 'address';
export type ButtonText = 'ADD LIQUIDITY' | 'GET FINANCE' | 'PAYBACK' | 'LIQUIDATE' | 'WAIT' | 'NOT ALLOWED' | 'APPROVE' | 'CREATE' | 'ENDED' | 'REMOVE';
export type Router = 'Permissioned' | 'Permissionless';
export type VoidFunc = () => void;
export type DrawerAnchor = 'permission' | 'confirmation' | 'poolDetails' | 'providers' | '';
export type ToggleDrawer = (value: number, setState: (value: number) => void) => (event: React.KeyboardEvent | React.MouseEvent) => void;
export type ButtonContent = 'Approve' | 'CreatePool' | 'Completed' | 'Failed';
export type PoolType = 'Permissioned' | 'Permissionless';
export type Anchor = 'top' | 'left' | 'bottom' | 'right';
export type TransactionCallback = (arg: TrxState) => void;
export type Message = string;
export type TrxResult = 'success' | 'reverted';
export interface TrxState {
  status?: TrxResult;
  message: string;
}

export interface CreatePermissionedPoolParams extends Config{
  intRate: number;
  durationInHours: number;
  colCoverage: number;
  unitLiquidity: bigint;
  contributors: Address[];
  querySafe: () => Promise<Address>;
}

export interface CreatePermissionLessPoolParams extends Config{
  intRate: number;
  quorum: number;
  durationInHours: number;
  colCoverage: number;
  unitLiquidity: bigint;
  querySafe: () => Promise<Address>;
}

export interface GetProfileParam {
  unit: bigint;
  user: Address;
}

export interface Config {
  client: ViemClient;
  account: Address;
  value?: bigint;
  callback?: TransactionCallback; 
  wagmiConfig: WagmiConfig;
}

export interface DepositCollateralParam extends Config {
  bank: Address;
  rId: bigint;
}

export interface CommonParam extends Config {
  unit: bigint;
}

export interface GetFinanceParam extends CommonParam {
  daysOfUseInHr: number;
  value: bigint;
}

export interface ScreenUserResult{
  isMember: boolean;
  isAdmin: boolean;
  data: FormattedData;
}

export interface FormattedData {
  payDate_InDateFormat: string;
  payDate_InSec: number;
  turnTime_InDateFormat: string;
  turnTime_InSec: number;
  durOfChoice_InSec: number;
  colBals_InEther: string;
  loan_InEther: string;
  expInterest_InEther: string;
  id_lowerCase: string;
  id_toString: string;
  loan_InBN: BigNumber;
  sentQuota: boolean;
}

export interface FormattedPoolContentProps {
  unit: BigNumberish;
  unit_bigint: bigint;
  rId: bigint;
  // pair: string;
  quorum_toNumber: number;
  userCount_toNumber: number;
  allGET_bool: boolean;
  allGh_toNumber: number;
  unitId_toNumber: number;
  unitId_bigint: bigint;
  stage_toNumber: number;
  expectedPoolAmt_bigint: bigint;
  unit_InEther: string;
  intPercent_string: string;
  duration_toNumber: number;
  poolFilled: boolean;
  isPermissionless: boolean;
  selector_toNumber: number;
  colCoverage_InString: string;
  fullInterest_InEther: string;
  intPerSec_InEther: string;
  currentPool_InEther: string;
  admin_lowerCase: string;
  asset_lowerCase: string;
  admin: ethers.AddressLike;
  asset: ethers.AddressLike;
  isAdmin: boolean;
  isMember: boolean;
  cData_formatted: FormattedData[];
  intPerSec: BigNumberish;
  lastPaid: Address;
  formatted_bank: Address;
  unitInBN: BigNumber;
  currentPoolInBN: BigNumber;
}
    
export interface AmountToApproveParam {
  txnType: ButtonText;      
  wagmiConfig: WagmiConfig;
  client: ViemClient;
  unit: bigint;
  account: Address;
  intPerSec?: BigNumberish | bigint;
  lastPaid?: Address;
}

export interface HandleTransactionParam {
  otherParam: AmountToApproveParam;
  preferredDuration?: string; 
  createPermissionlessPoolParam?: CreatePermissionLessPoolParams;
  createPermissionedPoolParam?: CreatePermissionedPoolParams;
  router?: Router;
  bank?: Address;
  client: ViemClient;
  callback: TransactionCallback;
}

export interface ContractData {
  feeTo: Address;
  assetAdmin: Address;
  makerRate: number;
  bankFactory: Address;
}

export interface CommonToolArg {
  wagmiConfig: WagmiConfig;
  callback: TransactionCallback;
  account: Address;
}
