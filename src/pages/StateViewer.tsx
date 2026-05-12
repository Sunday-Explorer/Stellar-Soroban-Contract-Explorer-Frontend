import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { ContractStateEntry } from '../types';

export default function StateViewer() {
  const { contractId } = useParams<{ contractId: string }>();
  const [entries, setEntries] = useState<ContractStateEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contractId) return;
    api.getState(contractId)
      .then(setEntries)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [contractId]);

  if (loading) return <p aria-busy="true">Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <main>
      <nav aria-label="Breadcrumb">
        <Link to={`/contract/${contractId}`}>← Contract</Link>
      </nav>
      <h1>Contract State</h1>
      <code>{contractId}</code>
      {entries.length === 0 ? (
        <p>No state entries found.</p>
      ) : (
        <table>
          <thead>
            <tr><th>Key</th><th>Value</th><th>Durability</th><th>Last Modified Ledger</th></tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.key}>
                <td><code>{entry.key}</code></td>
                <td><pre>{JSON.stringify(entry.value, null, 2)}</pre></td>
                <td>{entry.durability}</td>
                <td>{entry.lastModifiedLedger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
