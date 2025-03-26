import React from 'react';
import './proposal_list.css';

const ProposalList = () => {

    return (
        <div className="proposal_container"> 
            <h2>Proposal List</h2>
            <ul>
                <li>Proposal 1</li>
                <li>Proposal 2</li>
                <li>Proposal 3</li>
            </ul>
        </div>
    );
};

export default ProposalList; // Transfer the component to the main App.js file

