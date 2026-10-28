import test from "node:test";
import assert from "node:assert";
import { flashSaleArchitectureData } from "../src/data/flashSaleArchitecture.ts";

test("Architecture Nodes Integrity", () => {
  const spec = flashSaleArchitectureData;
  assert.ok(spec.nodes.length >= 4, "Should have at least 4 core nodes");

  const nodeIds = new Set<string>();

  for (const node of spec.nodes) {
    assert.ok(node.id, "Node must have an id");
    assert.ok(!nodeIds.has(node.id), `Duplicate node id detected: ${node.id}`);
    nodeIds.add(node.id);

    assert.ok(node.name.length > 0, `Node ${node.id} must have a name`);
    assert.ok(node.technology.length > 0, `Node ${node.id} must define technology`);
    assert.ok(node.responsibility.length > 10, `Node ${node.id} must have detailed responsibility`);
    assert.ok(node.whyUsed.length > 10, `Node ${node.id} must state why it is used`);
    assert.ok(node.interactions.length > 0, `Node ${node.id} must detail interactions`);
    assert.ok(node.failureScenarios.length > 0, `Node ${node.id} must detail failure scenarios`);
    assert.ok(node.designTradeoffs.length > 0, `Node ${node.id} must detail design tradeoffs`);
  }
});

test("Architecture Connections & Flow Graph Validity", () => {
  const spec = flashSaleArchitectureData;
  assert.ok(spec.connections.length >= 3, "Should have at least 3 connections");

  const nodeIds = new Set(spec.nodes.map((n) => n.id));
  const connectionIds = new Set<string>();

  for (const conn of spec.connections) {
    assert.ok(conn.id, "Connection must have an id");
    assert.ok(!connectionIds.has(conn.id), `Duplicate connection id detected: ${conn.id}`);
    connectionIds.add(conn.id);

    assert.ok(nodeIds.has(conn.sourceId), `Connection ${conn.id} has invalid sourceId: ${conn.sourceId}`);
    assert.ok(nodeIds.has(conn.targetId), `Connection ${conn.id} has invalid targetId: ${conn.targetId}`);
    assert.ok(conn.protocol.length > 0, `Connection ${conn.id} must specify protocol`);
    assert.ok(conn.dataPayload.length > 0, `Connection ${conn.id} must have a sample payload`);
    assert.ok(conn.failureHandling.length > 10, `Connection ${conn.id} must explain failure handling`);
  }
});

test("Default Selection Validity", () => {
  const spec = flashSaleArchitectureData;
  const allIds = new Set([
    ...spec.nodes.map((n) => n.id),
    ...spec.connections.map((c) => c.id),
  ]);

  assert.ok(allIds.has(spec.defaultSelectedId), "Default selected item must exist in the spec");
});

