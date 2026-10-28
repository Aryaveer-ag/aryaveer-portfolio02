"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { PortfolioAssistant } from "@/types/assistant";
import { defaultPortfolioAssistant } from "@/services/mockAssistant";

interface AssistantContextValue {
  assistant: PortfolioAssistant;
}

const AssistantContext = createContext<AssistantContextValue>({
  assistant: defaultPortfolioAssistant,
});

export interface AssistantProviderProps {
  assistant?: PortfolioAssistant;
  children: React.ReactNode;
}

export function AssistantProvider({
  assistant = defaultPortfolioAssistant,
  children,
}: AssistantProviderProps) {
  const value = useMemo(() => ({ assistant }), [assistant]);

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
}

export function usePortfolioAssistant(): PortfolioAssistant {
  const context = useContext(AssistantContext);
  return context.assistant;
}

