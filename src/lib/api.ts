import type { ContractInfo, DecodedInvocation, ContractEvent, ContractStateEntry } from '../types';

const BASE = '/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export const api = {
  getContract: (id: string) =>
    get<ContractInfo>(`/contracts/${id}`),
  getInvocations: (id: string) =>
    get<DecodedInvocation[]>(`/contracts/${id}/invocations`),
  getEvents: (id: string, startLedger = 0) =>
    get<ContractEvent[]>(`/contracts/${id}/events?startLedger=${startLedger}`),
  getState: (id: string) =>
    get<ContractStateEntry[]>(`/contracts/${id}/state`),
};
