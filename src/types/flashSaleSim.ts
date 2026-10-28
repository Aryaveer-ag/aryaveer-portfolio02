/**
 * Type definitions for the High-Concurrency Flash Sale Engine simulation.
 */

export type ContentionMode = "burst" | "gradual" | "zero-stock" | "single-item";

export interface FlashSaleSimConfig {
  initialInventory: number;
  totalRequests: number;
  contentionMode: ContentionMode;
}

export type RequestOutcomeStatus =
  | "SUCCESS_ALLOCATED"
  | "REJECTED_OUT_OF_STOCK"
  | "REJECTED_INVALID_INPUT";

export interface PurchaseRequestOutcome {
  id: string;
  requestIndex: number;
  status: RequestOutcomeStatus;
  remainingInventoryAfter: number;
  timestampOffsetMs: number;
  message: string;
}

export interface FlashSaleSimulationResult {
  config: FlashSaleSimConfig;
  initialInventory: number;
  finalRemainingInventory: number;
  successfulPurchases: number;
  rejectedRequests: number;
  oversoldAmount: number;
  requests: PurchaseRequestOutcome[];
  invariants: {
    neverNegative: boolean;
    purchasesCappedAtInitial: boolean;
    exactConservation: boolean;
  };
}

