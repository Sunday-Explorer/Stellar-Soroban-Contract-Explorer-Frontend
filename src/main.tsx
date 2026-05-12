import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContractSearch from './pages/ContractSearch';
import ContractDetail from './pages/ContractDetail';
import EventLog from './pages/EventLog';
import StateViewer from './pages/StateViewer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContractSearch />} />
        <Route path="/contract/:contractId" element={<ContractDetail />} />
        <Route path="/contract/:contractId/events" element={<EventLog />} />
        <Route path="/contract/:contractId/state" element={<StateViewer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
