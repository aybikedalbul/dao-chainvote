import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState(null);

  // Cüzdan daha önce bağlandıysa otomatik olarak al
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            console.log("Wallet already connected:", accounts[0]);
          }
        } catch (err) {
          console.error("Bağlı cüzdan alınamadı:", err);
        }
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setWalletAddress(address);
        setError(null);
        console.log("Connected wallet:", address);
      } catch (err) {
        setError("Cüzdan bağlantısı reddedildi veya başarısız.");
        console.error("Wallet connection failed:", err);
      }
    } else {
      setError("Lütfen MetaMask yükleyin.");
    }
  };

  return (
    <div style={{ margin: "1rem", textAlign: "center" }}>
      {walletAddress ? (
        <p style={{ color: "green" }}>
          ✅ Cüzdan Bağlandı: <strong>{walletAddress}</strong>
        </p>
      ) : (
        <button onClick={connectWallet}>💳 Cüzdanı Bağla</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default WalletConnect;
