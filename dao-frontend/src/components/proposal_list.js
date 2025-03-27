import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import DAO from '../DAO.json';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ProposalList = ({ refresh }) => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, DAO.abi, provider);

        const proposalCount = await contract.nextProposalId();
        const proposalList = [];

        for (let i = 0; i < proposalCount; i++) {
          const proposal = await contract.getProposal(i);
          console.log("📥 Recommendation from the chain:", proposal); 
          proposalList.push({
            id: proposal[0].toNumber(),
            description: proposal[1],
            voteCount: proposal[2].toNumber(),
            proposer: proposal[3]
          });
        }

        setProposals(proposalList);
      } catch (err) {
        console.error("Failed to fetch proposals:", err);
      }
    };

    fetchProposals();
  }, [refresh]);

  return (
    <div className="container">
    <h2 
      className="text-center mb-4"
      style={{
        color: '#63b3ed',
        fontSize: '2.2rem',
        fontWeight: '700',
        letterSpacing: '0.5px',
        background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'glow 1.5s ease-in-out infinite alternate, slideIn 0.8s ease-out',
        textShadow: '0 0 30px rgba(66, 153, 225, 0.3)',
        marginBottom: '2rem',
        position: 'relative'
      }}
    >
      Active Proposals
      <style>
        {`
          @keyframes glow {
            from {
              filter: drop-shadow(0 0 2px rgba(66, 153, 225, 0.2)) 
                      drop-shadow(0 0 6px rgba(66, 153, 225, 0.3));
            }
            to {
              filter: drop-shadow(0 0 3px rgba(66, 153, 225, 0.3))
                      drop-shadow(0 0 8px rgba(66, 153, 225, 0.4));
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-30px) scale(0.95);
              filter: blur(8px);
            }
            to {
              opacity: 1; 
              transform: translateY(0) scale(1);
              filter: blur(0);
            }
          }
        `}
      </style>
    </h2>
    <div className="row justify-content-center">
        {proposals.map((proposal) => (
        <div className="col-md-6 col-sm-10 mb-4" key={proposal.id}>
            <div
            className="card shadow-lg border-0 text-white"
            style={{
                background: "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)", 
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                transition: "all 0.3s ease",
                cursor: "pointer",
                border: "1px solid rgba(99, 179, 237, 0.2)" 
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(99, 179, 237, 0.3), 0 0 10px rgba(66, 153, 225, 0.2)";
                e.currentTarget.style.border = "1px solid rgba(99, 179, 237, 0.4)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.border = "1px solid rgba(99, 179, 237, 0.2)";
            }}
            >
            <div className="card-body">
                <h5 className="card-title fw-bold" style={{color: "#63b3ed"}}>🗳️ Proposal #{proposal.id}</h5>
                <p className="card-text" style={{color: "#e2e8f0"}}>{proposal.description}</p>
                <div style={{
                    color: "#48bb78",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem"
                }}>
                    <strong>Votes:</strong> 
                    <span style={{
                        background: "rgba(72, 187, 120, 0.2)",
                        padding: "2px 8px",
                        borderRadius: "12px",
                    }}>{proposal.voteCount}</span>
                </div>
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>

  );
};

export default ProposalList;
