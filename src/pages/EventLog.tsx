import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { ContractEvent } from '../types';

export default function EventLog() {
  const { contractId } = useParams<{ contractId: string }>();
  const [events, setEvents] = useState<ContractEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contractId) return;
    api.getEvents(contractId)
      .then(setEvents)
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
      <h1>Event Log</h1>
      <code>{contractId}</code>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table>
          <thead>
            <tr><th>Ledger</th><th>Topics</th><th>Data</th><th>Tx Hash</th></tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id}>
                <td>{ev.ledger}</td>
                <td>{(ev.topics as string[]).join(', ')}</td>
                <td><pre>{JSON.stringify(ev.data, null, 2)}</pre></td>
                <td><code>{ev.txHash.slice(0, 12)}…</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
