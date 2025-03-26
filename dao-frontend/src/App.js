import React, { useState } from 'react';
import WalletConnect from './components/wallet_connect';
import ProposalList from './components/proposal_list';
import ProposalForm from './components/proposal_form';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleProposalAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
    <h1 style={{ textAlign: 'center' }}>DAO Vote System</h1>
    <WalletConnect />
    <ProposalForm onProposalAdded={handleProposalAdded} />
    <ProposalList key={refresh} />
  </div>
  );
}

export default App;