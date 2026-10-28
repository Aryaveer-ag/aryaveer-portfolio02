"use client";

import React, { useState } from "react";
import type { PortfolioAssistant } from "@/types/assistant";
import { AssistantLauncher } from "./AssistantLauncher";
import { PortfolioChatPanel } from "./PortfolioChatPanel";

export interface PortfolioAssistantWidgetProps {
  assistant?: PortfolioAssistant;
  defaultOpen?: boolean;
}

export function PortfolioAssistantWidget({
  assistant,
  defaultOpen = false,
}: PortfolioAssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      <PortfolioChatPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        assistant={assistant}
      />
      <AssistantLauncher
        isOpen={isOpen}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
    </>
  );
}

