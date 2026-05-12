export interface ContractInfo {
  contractId: string;
  wasmHash: string;
  ledger: number;
  createdAt: string;
}

export interface DecodedInvocation {
  functionName: string;
  args: Record<string, unknown>;
  result: unknown;
  txHash: string;
  ledger: number;
  timestamp: string;
}

export interface ContractEvent {
  id: string;
  contractId: string;
  topics: unknown[];
  data: unknown;
  ledger: number;
  timestamp: string;
  txHash: string;
}

export interface ContractStateEntry {
  key: string;
  value: unknown;
  durability: 'persistent' | 'temporary' | 'instance';
  lastModifiedLedger: number;
}
