import type React from "react"
import { createContext, useState } from "react"

interface Party {
  name: string
  email: string
  address: string
}

interface Contract {
  id: string
  title: string
  description: string
  agreementType: string
  parties: Party[]
  createdAt: Date | null
  status?: string
}

interface ContractContextType {
  contract: Contract
  savedContracts: Contract[]
  setContract: React.Dispatch<React.SetStateAction<Contract>>
  saveContract: () => void
  getContract: (id: string) => Contract | undefined
}

const defaultContract: Contract = {
  id: "",
  title: "",
  description: "",
  agreementType: "",
  parties: [
    { name: "", email: "", address: "" },
    { name: "", email: "", address: "" },
  ],
  createdAt: null,
}

export const ContractContext = createContext<ContractContextType>({
  contract: defaultContract,
  savedContracts: [],
  setContract: () => {},
  saveContract: () => {},
  getContract: () => undefined,
})

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contract, setContract] = useState<Contract>({ ...defaultContract })
  const [savedContracts, setSavedContracts] = useState<Contract[]>([])

  const saveContract = () => {
    const newContract = {
      ...contract,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: "deployed",
    }

    setSavedContracts([...savedContracts, newContract])
    setContract({ ...defaultContract }) // Reset form
  }

  const getContract = (id: string) => {
    return savedContracts.find((contract) => contract.id === id)
  }

  return (
    <ContractContext.Provider
      value={{
        contract,
        savedContracts,
        setContract,
        saveContract,
        getContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}

