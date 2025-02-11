import { ToolConfigProperties } from "@/interfaces";
import { getCurrentDebtOf } from "./getMyCurrentDebt";

export const tools : Record<string, ToolConfigProperties> = {
    getCurrentDebt: getCurrentDebtOf(),

}