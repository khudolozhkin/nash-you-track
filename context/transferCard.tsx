'use client'

import { useState, createContext } from "react"

type TransferCard = {
  currentCard?: string,
  currentColumn?: string,
  targetCard?: string
  targetColumn?: string
}

type TransferContext = {
  transferCard: TransferCard, setTransferContext: Function
}

export const TransferContext = createContext({})

export default function TransferCardProvider({ children } : {children: React.ReactNode}) {
  const [transferCard, setTransferContext] = useState<TransferCard>()

  return (
    <TransferContext.Provider value={{transferCard, setTransferContext}}>
      {children}
    </TransferContext.Provider>
  )
}