import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';
import type { ContractInfo, DecodedInvocation } from '../types';

export default function ContractDetail() {
  const { contractId } = useParams<{ contractId: string }>();
  const [info, setInfo] = useState<ContractInfo | null>(null);
  const [invocations, setInvocations] = useState<DecodedInvocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contractId) return;
    Promise.all([api.getContract(contractId), api.getInvocations(contractId)])
      .then(([i, inv]) => { setInfo(i); setInvocations(inv); })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [contractId]);

  if (loading) return <p aria-busy="true">Loading…</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!info) return null;

  return (
    <main>
      <nav aria-label="Breadcrumb">
        <Link to="/">← Search</Link>
      </nav>
      <h1>Contract</h1>
      <code>{contractId}</code>
      <dl>
        <dt>WASM Hash</dt><dd><code>{info.wasmHash}</code></dd>
        <dt>Created Ledger</dt><dd>{info.ledger}</dd>
        <dt>Created At</dt><dd>{info.createdAt}</dd>
      </dl>
      <nav aria-label="Contract sections">
        <Link to={`/contract/${contractId}/state`}>View State</Link>
        {' · '}
        <Link to={`/contract/${contractId}/events`}>View Events</Link>
      </nav>

      <section>
        <h2>Recent Invocations</h2>
        {invocations.length === 0 ? (
          <p>No invocations found.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Function</th><th>Ledger</th><th>Tx Hash</th></tr>
            </thead>
            <tbody>
              {invocations.map((inv) => (
                <tr key={inv.txHash}>
                  <td><code>{inv.functionName}</code></td>
                  <td>{inv.ledger}</td>
                  <td><code>{inv.txHash.slice(0, 12)}…</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
