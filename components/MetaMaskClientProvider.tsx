"use client"

import { ReactNode, useState, useEffect } from "react"
import { MetaMaskProvider } from "@/hooks/useMetaMask"

interface MetaMaskClientProviderProps {
  children: ReactNode
}

export default function MetaMaskClientProvider({ children }: MetaMaskClientProviderProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <>
      <MetaMaskProvider>
        {mounted ? children : null}
      </MetaMaskProvider>
    </>
  );
} 