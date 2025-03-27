import React, { useState } from 'react';
import WalletConnect from './components/wallet_connect';
import ProposalList from './components/proposal_list';
import ProposalForm from './components/proposal_form';
import './App.css'; 

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleProposalAdded = () => {
    console.log("✅ Proposal Added!");
    setRefresh(!refresh);
  };

  return (
    <div className="app-background">
      <div className="container py-5">
        <h1
          className="text-center mb-4"
          style={{
            fontSize: "2.8rem",
            fontWeight: "bold",
            color: "#4299e1",
            textShadow: "0 2px 10px rgba(66, 153, 225, 0.5)",
            letterSpacing: "1px", 
            animation: "fadeIn 1.2s ease-in-out"
          }}
        >
          DAO Vote System
        </h1>

        <div className="mb-4">
          <WalletConnect />
        </div>

        <ProposalForm onProposalAdded={handleProposalAdded} />
        <ProposalList refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
