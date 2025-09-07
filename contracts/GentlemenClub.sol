// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GentlemenClub {
    address public owner;
    uint256 public totalBets;
    uint256 public daoTreasury;
    uint256 public constant HOUSE_EDGE = 200; // 2% in basis points
    uint256 public constant DAO_SHARE = 8000; // 80% to DAO
    uint256 public constant OPCO_SHARE = 2000; // 20% to OpCo
    uint256 public constant STAKING_YIELD = 3000; // 30% of DAO profits to stakers
    
    mapping(address => uint256) public bets;
    mapping(address => bool) public outcomes;
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingTimestamp;
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
        uint256 endTime;
        address proposer;
    }

    event BetPlaced(address indexed user, uint256 amount, bool outcome);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event ProposalCreated(uint256 indexed id, string description, address proposer);
    event Voted(uint256 indexed id, address indexed voter, uint256 weight);
    event RevenueDistributed(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyStaker() {
        require(stakedBalance[msg.sender] > 0, "Must be a staker");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Place a bet on the dice game
     * Uses block timestamp for pseudo-randomness (NOT production-ready)
     */
    function placeBet() public payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        require(msg.value <= address(this).balance / 10, "Bet too large for house bankroll");
        
        bets[msg.sender] += msg.value;
        totalBets += msg.value;
        
        // Simple pseudo-random outcome (NOT secure for production)
        bool outcome = (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.difficulty))) % 2) == 0;
        outcomes[msg.sender] = outcome;
        
        if (outcome) {
            // Player wins - pay out 1.98x (accounting for 2% house edge)
            uint256 payout = (msg.value * 198) / 100;
            require(address(this).balance >= payout, "Insufficient house funds");
            payable(msg.sender).transfer(payout);
        }
        
        // Distribute house profits
        uint256 houseProfit = (msg.value * HOUSE_EDGE) / 10000;
        uint256 daoShare = (houseProfit * DAO_SHARE) / 10000;
        daoTreasury += daoShare;
        
        emit BetPlaced(msg.sender, msg.value, outcome);
    }

    /**
     * @dev Get the last betting outcome for a user
     */
    function getLastOutcome(address user) public view returns (bool) {
        return outcomes[user];
    }

    /**
     * @dev Stake tokens for DAO participation and revenue sharing
     */
    function stake(uint256 amount) public {
        require(amount > 0, "Stake amount must be greater than 0");
        // In a real implementation, this would transfer ERC20 tokens
        // For this POC, we simulate token staking
        
        stakedBalance[msg.sender] += amount;
        stakingTimestamp[msg.sender] = block.timestamp;
        
        emit Staked(msg.sender, amount);
    }

    /**
     * @dev Unstake tokens (with 30-day lock period)
     */
    function unstake(uint256 amount) public {
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked balance");
        require(block.timestamp >= stakingTimestamp[msg.sender] + 30 days, "Tokens still locked");
        
        stakedBalance[msg.sender] -= amount;
        
        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Distribute 30% of DAO profits to stakers
     */
    function distributeRevenue() public onlyOwner {
        require(daoTreasury > 0, "No funds in treasury");
        
        uint256 stakingRewards = (daoTreasury * STAKING_YIELD) / 10000;
        daoTreasury -= stakingRewards;
        
        // In a real implementation, this would distribute proportionally to all stakers
        // For this POC, we emit an event
        emit RevenueDistributed(stakingRewards);
    }

    /**
     * @dev Create a new governance proposal
     */
    function createProposal(string memory description) public onlyStaker {
        proposals[proposalCount] = Proposal({
            description: description,
            voteCount: 0,
            executed: false,
            endTime: block.timestamp + 7 days,
            proposer: msg.sender
        });
        
        emit ProposalCreated(proposalCount, description, msg.sender);
        proposalCount++;
    }

    /**
     * @dev Vote on a proposal (weighted by staked amount)
     */
    function vote(uint256 proposalId) public onlyStaker {
        require(proposalId < proposalCount, "Invalid proposal ID");
        require(!proposals[proposalId].executed, "Proposal already executed");
        require(block.timestamp < proposals[proposalId].endTime, "Voting period ended");
        
        uint256 votingWeight = stakedBalance[msg.sender];
        proposals[proposalId].voteCount += votingWeight;
        
        emit Voted(proposalId, msg.sender, votingWeight);
    }

    /**
     * @dev Execute a proposal if it has majority support
     */
    function executeProposal(uint256 proposalId) public {
        require(proposalId < proposalCount, "Invalid proposal ID");
        require(!proposals[proposalId].executed, "Proposal already executed");
        require(block.timestamp >= proposals[proposalId].endTime, "Voting period not ended");
        
        // Calculate total staked tokens for majority calculation
        // In a real implementation, you'd track this more efficiently
        uint256 totalStaked = getTotalStaked();
        require(proposals[proposalId].voteCount > totalStaked / 2, "Insufficient votes");
        
        proposals[proposalId].executed = true;
        
        // Proposal execution logic would go here
        // For this POC, we just mark it as executed
    }

    /**
     * @dev Get total staked tokens (placeholder implementation)
     */
    function getTotalStaked() public pure returns (uint256) {
        // In a real implementation, this would track the actual total
        return 2450000 * 1e18; // Mock value for demo
    }

    /**
     * @dev Allow contract to receive ETH
     */
    receive() external payable {
        // Contract can receive ETH for house bankroll
    }

    /**
     * @dev Emergency withdrawal by owner
     */
    function emergencyWithdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    /**
     * @dev Get contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Get user's staked balance
     */
    function getUserStakedBalance(address user) public view returns (uint256) {
        return stakedBalance[user];
    }

    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 proposalId) public view returns (
        string memory description,
        uint256 voteCount,
        bool executed,
        uint256 endTime,
        address proposer
    ) {
        require(proposalId < proposalCount, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.description,
            proposal.voteCount,
            proposal.executed,
            proposal.endTime,
            proposal.proposer
        );
    }
}
