import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      }
    };
    checkWallet();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to use this app.");
        return;
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletAddress(accounts[0]);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  return (
    <div
      className="text-center p-3 rounded shadow"
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
        color: "#fff",
        fontWeight: "500",
        border: "1px solid rgba(99, 179, 237, 0.3)",
        boxShadow: "0 0 10px rgba(99, 179, 237, 0.2)",
        animation: "fade-in 1s ease"
      }}
    >
      {walletAddress ? (
        <span>
          ✅ <strong>The wallet was connected:</strong>{" "}
          <span style={{ color: "#00FF00" }}>{walletAddress}</span>
        </span>
      ) : (
        <button
          className="btn btn-primary"
          onClick={connectWallet}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            fontWeight: "600",
            background: "#4299e1",
            border: "none",
            boxShadow: "0 4px 10px rgba(66, 153, 225, 0.4)",
            transition: "transform 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
