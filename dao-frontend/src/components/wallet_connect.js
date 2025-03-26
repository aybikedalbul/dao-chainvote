import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnect = () => {
    //  keeps the ethereum address
    const [walletAddress, setWalletAddress] = useState("");

    // Connecting the user's wallet
    const connectWallet = async () => {
        if (window.ethereum) { // Check if MetaMask is available in the user's browser
            try {
                // Create Ethereum provider (MetaMask)
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                
                //Permission from user (to open MetaMask)
                await provider.send("eth_requestAccounts", []);
                
                // Get user info
                const signer = provider.getSigner();
                
                // Get Wallet address
                const address = await signer.getAddress();
                
                setWalletAddress(address);
                console.log("Connected wallet:", address);
            } catch (err) {
                console.error("Wallet connection failed:", err);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    return (
        <div>
            {walletAddress ? (
                <p>Connected wallet: {walletAddress}</p>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
