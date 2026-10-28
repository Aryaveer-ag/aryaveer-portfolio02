import type {
  FlashSaleSimConfig,
  FlashSaleSimulationResult,
  PurchaseRequestOutcome,
} from "../../../types/flashSaleSim.ts";

export class FlashSaleEngine {
  public static readonly MAX_INVENTORY = 200;
  public static readonly MIN_INVENTORY = 0;
  public static readonly MAX_REQUESTS = 500;
  public static readonly MIN_REQUESTS = 1;

  /**
   * Sanitizes and clamps configuration parameters to safe upper/lower bounds.
   */
  public static sanitizeConfig(config: Partial<FlashSaleSimConfig>): FlashSaleSimConfig {
    let inventory = Number(config.initialInventory);
    let requests = Number(config.totalRequests);

    if (isNaN(inventory) || inventory < this.MIN_INVENTORY) {
      inventory = this.MIN_INVENTORY;
    } else if (inventory > this.MAX_INVENTORY) {
      inventory = this.MAX_INVENTORY;
    } else {
      inventory = Math.floor(inventory);
    }

    if (isNaN(requests) || requests < this.MIN_REQUESTS) {
      requests = this.MIN_REQUESTS;
    } else if (requests > this.MAX_REQUESTS) {
      requests = this.MAX_REQUESTS;
    } else {
      requests = Math.floor(requests);
    }

    const contentionMode = config.contentionMode || "burst";

    return {
      initialInventory: inventory,
      totalRequests: requests,
      contentionMode,
    };
  }

  /**
   * Runs the full deterministic simulation over the configured purchase requests.
   */
  public static runSimulation(rawConfig: Partial<FlashSaleSimConfig>): FlashSaleSimulationResult {
    const config = this.sanitizeConfig(rawConfig);
    let currentStock = config.initialInventory;
    let successfulCount = 0;
    let rejectedCount = 0;
    const requestOutcomes: PurchaseRequestOutcome[] = [];

    for (let i = 1; i <= config.totalRequests; i++) {
      const requestId = `REQ-${i.toString().padStart(3, "0")}`;

      // Contention timing offset simulation
      const timestampOffsetMs =
        config.contentionMode === "burst"
          ? Math.floor((i - 1) / 5) * 2 // grouped bursts of 5
          : (i - 1) * 15; // steady stream

      if (currentStock > 0) {
        currentStock -= 1;
        successfulCount += 1;
        requestOutcomes.push({
          id: requestId,
          requestIndex: i,
          status: "SUCCESS_ALLOCATED",
          remainingInventoryAfter: currentStock,
          timestampOffsetMs,
          message: `Order confirmed for ${requestId}. Stock reserved.`,
        });
      } else {
        rejectedCount += 1;
        requestOutcomes.push({
          id: requestId,
          requestIndex: i,
          status: "REJECTED_OUT_OF_STOCK",
          remainingInventoryAfter: 0,
          timestampOffsetMs,
          message: `Request ${requestId} rejected. Zero stock available (429).`,
        });
      }
    }

    const finalRemaining = Math.max(0, currentStock);
    const oversold = Math.max(0, successfulCount - config.initialInventory);

    // Invariant verifications
    const invariants = {
      neverNegative: finalRemaining >= 0 && currentStock >= 0,
      purchasesCappedAtInitial: successfulCount <= config.initialInventory,
      exactConservation: config.initialInventory - successfulCount === finalRemaining,
    };

    return {
      config,
      initialInventory: config.initialInventory,
      finalRemainingInventory: finalRemaining,
      successfulPurchases: successfulCount,
      rejectedRequests: rejectedCount,
      oversoldAmount: oversold,
      requests: requestOutcomes,
      invariants,
    };
  }
}
