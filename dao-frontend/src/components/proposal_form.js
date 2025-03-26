import React, { useState } from 'react';
import { ethers } from 'ethers';
import DAO from '../DAO.json'; // ABI 

const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; 

const ProposalForm = ({ onProposalAdded }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, DAO.abi, signer);

      const tx = await contract.createProposal(description);
      await tx.wait();

      setDescription("");

      if (onProposalAdded) {
        onProposalAdded();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write your new suggestion..."
        style={{ padding: '0.5rem', width: '300px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem' }}>Send</button>
    </form>
  );
};

export default ProposalForm;
