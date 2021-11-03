// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.4;

contract CampaignFactory{
    Campaign[] public deployedCampaigns;
    
    function createCampaign(uint mininumContribution) public {
        Campaign newCampaign = new Campaign(mininumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(Campaign[] memory){
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public mininumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;
    
    constructor(uint _mininumContribution, address _manager) {
        manager = _manager;
        mininumContribution = _mininumContribution;
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function contribute() public payable{
        require(msg.value >= mininumContribution, "Amount is less than minimum contribution");
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string memory _description, uint _value, address payable _recipient) public restricted{
        Request storage newRequest = requests.push();
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    
    function approveRequest(uint index) public{
        Request storage request = requests[index];
        require(approvers[msg.sender],'You are not an approver');
        require(!request.approvals[msg.sender],'You have already voted');
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public payable restricted{
        Request storage request = requests[index];
        require(!request.complete,'This request has been completed');
        require(request.approvalCount > (approversCount/2), 'Approved requests are less than 50%');
        request.recipient.transfer(request.value);
        request.complete = true;
        
    }

    function getSummary() view public returns(
        uint, uint, uint, uint, address
    ) {
        return(
            mininumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestCount() view public returns(uint){
        return requests.length;
    }
    
    
    
    
    
    
    
}