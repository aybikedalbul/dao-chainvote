// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        address proposer;
    }

    Proposal[] public proposals;
    uint public nextProposalId;

    event ProposalCreated(uint id, string description, address proposer);
    event Voted(uint proposalId, uint newVoteCount);

    function createProposal(string memory _description) public {
        proposals.push(Proposal(nextProposalId, _description, 0, msg.sender));
        emit ProposalCreated(nextProposalId, _description, msg.sender);
        nextProposalId++;
    }

    function vote(uint _proposalId) public {
        require(_proposalId < proposals.length, "Proposal does not exist!");
        proposals[_proposalId].voteCount++;
        emit Voted(_proposalId, proposals[_proposalId].voteCount);
    }

    function getProposal(uint _proposalId) public view returns (uint, string memory, uint, address) {
        require(_proposalId < proposals.length, "Proposal doesn't exist!");
        Proposal memory proposal = proposals[_proposalId];
        return (proposal.id, proposal.description, proposal.voteCount, proposal.proposer);
    }
}
