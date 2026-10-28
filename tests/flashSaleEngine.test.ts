import test from "node:test";
import assert from "node:assert";
import { FlashSaleEngine } from "../src/modules/lab/engines/FlashSaleEngine.ts";

test("Scenario 1: Zero inventory (N=0, R=25)", () => {
  const result = FlashSaleEngine.runSimulation({
    initialInventory: 0,
    totalRequests: 25,
    contentionMode: "zero-stock",
  });

  assert.strictEqual(result.initialInventory, 0);
  assert.strictEqual(result.successfulPurchases, 0);
  assert.strictEqual(result.rejectedRequests, 25);
  assert.strictEqual(result.finalRemainingInventory, 0);
  assert.strictEqual(result.oversoldAmount, 0);
  assert.strictEqual(result.invariants.neverNegative, true);
  assert.strictEqual(result.invariants.purchasesCappedAtInitial, true);
  assert.strictEqual(result.invariants.exactConservation, true);
});

test("Scenario 2: Exactly one available item (N=1, R=50)", () => {
  const result = FlashSaleEngine.runSimulation({
    initialInventory: 1,
    totalRequests: 50,
    contentionMode: "single-item",
  });

  assert.strictEqual(result.initialInventory, 1);
  assert.strictEqual(result.successfulPurchases, 1);
  assert.strictEqual(result.rejectedRequests, 49);
  assert.strictEqual(result.finalRemainingInventory, 0);
  assert.strictEqual(result.oversoldAmount, 0);
  assert.strictEqual(result.requests[0].status, "SUCCESS_ALLOCATED");
  assert.strictEqual(result.requests[1].status, "REJECTED_OUT_OF_STOCK");
  assert.strictEqual(result.invariants.neverNegative, true);
  assert.strictEqual(result.invariants.purchasesCappedAtInitial, true);
});

test("Scenario 3: Fewer requests than inventory (N=100, R=30)", () => {
  const result = FlashSaleEngine.runSimulation({
    initialInventory: 100,
    totalRequests: 30,
    contentionMode: "gradual",
  });

  assert.strictEqual(result.successfulPurchases, 30);
  assert.strictEqual(result.rejectedRequests, 0);
  assert.strictEqual(result.finalRemainingInventory, 70);
  assert.strictEqual(result.oversoldAmount, 0);
  assert.strictEqual(result.invariants.neverNegative, true);
  assert.strictEqual(result.invariants.purchasesCappedAtInitial, true);
  assert.strictEqual(result.invariants.exactConservation, true);
});

test("Scenario 4: More requests than inventory (N=20, R=80)", () => {
  const result = FlashSaleEngine.runSimulation({
    initialInventory: 20,
    totalRequests: 80,
    contentionMode: "burst",
  });

  assert.strictEqual(result.successfulPurchases, 20);
  assert.strictEqual(result.rejectedRequests, 60);
  assert.strictEqual(result.finalRemainingInventory, 0);
  assert.strictEqual(result.oversoldAmount, 0);
  assert.strictEqual(result.invariants.neverNegative, true);
  assert.strictEqual(result.invariants.purchasesCappedAtInitial, true);
  assert.strictEqual(result.invariants.exactConservation, true);
});

test("Scenario 5: Invalid inputs handling (Negative, NaN, Exceeding Upper Bounds)", () => {
  // Negative inventory & requests should be clamped to bounds
  const negativeResult = FlashSaleEngine.runSimulation({
    initialInventory: -10,
    totalRequests: -5,
  });
  assert.strictEqual(negativeResult.initialInventory, 0);
  assert.strictEqual(negativeResult.config.totalRequests, 1);

  // NaN inputs should be clamped safely
  const nanResult = FlashSaleEngine.runSimulation({
    initialInventory: NaN,
    totalRequests: NaN,
  });
  assert.strictEqual(nanResult.initialInventory, 0);
  assert.strictEqual(nanResult.config.totalRequests, 1);

  // Exceeding bounds should be clamped to MAX constants
  const maxResult = FlashSaleEngine.runSimulation({
    initialInventory: 99999,
    totalRequests: 88888,
  });
  assert.strictEqual(maxResult.initialInventory, FlashSaleEngine.MAX_INVENTORY);
  assert.strictEqual(maxResult.config.totalRequests, FlashSaleEngine.MAX_REQUESTS);
});

test("Scenario 6: Determinism — Identical inputs yield identical outcomes", () => {
  const run1 = FlashSaleEngine.runSimulation({ initialInventory: 15, totalRequests: 40 });
  const run2 = FlashSaleEngine.runSimulation({ initialInventory: 15, totalRequests: 40 });

  assert.strictEqual(run1.successfulPurchases, run2.successfulPurchases);
  assert.strictEqual(run1.rejectedRequests, run2.rejectedRequests);
  assert.strictEqual(run1.finalRemainingInventory, run2.finalRemainingInventory);
  assert.deepStrictEqual(
    run1.requests.map((r) => r.status),
    run2.requests.map((r) => r.status)
  );
});

