import React, { useState } from 'react';
import { ethers } from 'ethers';
import DAO from '../DAO.json'; // ABI 

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ProposalForm = ({ onProposalAdded }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, DAO.abi, signer);
      const tx = await contract.createProposal(description, {
        gasLimit: 300000
      });
      await tx.wait();

      setDescription("");

      if (onProposalAdded) {
        onProposalAdded(); // List update
      }
    } catch (err) {
      console.error("Proposal could not be submitted:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8">
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          width: "100%"
        }}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your new proposal..."
            style={{
              padding: "0.8rem 1.2rem",
              flex: "1",
              maxWidth: "600px", 
              borderRadius: "12px",
              border: "1px solid rgba(99, 179, 237, 0.3)",
              background: "rgba(15, 23, 42, 0.03)",
              color: "#ffffff",
              fontSize: "1rem",
              outline: "none",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 12px rgba(66, 153, 225, 0.08)",
              backdropFilter: "blur(8px)",
              animation: "fadeIn 0.6s ease-out",
              "::placeholder": {
                color: "rgba(255, 255, 255, 0.7)"
              }
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = "0 0 0 3px rgba(66, 153, 225, 0.2)";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.background = "rgba(15, 23, 42, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = "0 4px 12px rgba(66, 153, 225, 0.08)";
              e.target.style.transform = "translateY(0)";
              e.target.style.background = "rgba(15, 23, 42, 0.03)";
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.8rem 1.5rem",
              border: "none", 
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4f46e5, #3b82f6)",
              color: "white",
              fontWeight: "600",
              fontSize: "1rem",
              letterSpacing: "0.5px",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: "0 4px 20px rgba(79, 70, 229, 0.4)",
              animation: "fadeIn 0.6s ease-out",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 6px 25px rgba(79, 70, 229, 0.5)";
              e.currentTarget.style.background = "linear-gradient(135deg, #6366f1, #4f46e5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(79, 70, 229, 0.4)";
              e.currentTarget.style.background = "linear-gradient(135deg, #4f46e5, #3b82f6)";
            }}
          >
            <span>Send Proposal</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        </div>
      </div>
    </form>
  );
};

export default ProposalForm;
