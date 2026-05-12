import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContractSearch() {
  const [contractId, setContractId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const id = contractId.trim();
    if (!id.match(/^C[A-Z2-7]{55}$/)) {
      setError('Invalid contract ID — must be a 56-character string starting with C');
      return;
    }
    navigate(`/contract/${id}`);
  }

  return (
    <main>
      <h1>Soroban Contract Explorer</h1>
      <p>Enter a Soroban contract ID to inspect its state, events, and function calls.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="contractId">Contract ID</label>
        <input
          id="contractId"
          type="text"
          placeholder="CAAAAAAA..."
          value={contractId}
          onChange={(e) => { setContractId(e.target.value); setError(''); }}
        />
        <button type="submit">Explore</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
