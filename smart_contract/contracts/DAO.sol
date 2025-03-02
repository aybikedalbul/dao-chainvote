// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO{
    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        address proposer;
    }

    Proposal[] public proposals;
    uint public nextProposalId;

    function createProposal(string memory _description) public{
        proposals.push(Proposal(nextProposalId, _description,0, msg.sender));
        nextProposalId++;
    }

    function vote(uint _proposalId) public {
        require(_proposalId < proposals.length, "Proposal does not exist!");
        proposals[_proposalId].voteCount++;
    }

    function getProposal(uint _proposalId) public view returns(Proposal memory){
        require(_proposalId < proposals.length, "Proposal doesn't exist!");
        return proposals[_proposalId];
    }


}

