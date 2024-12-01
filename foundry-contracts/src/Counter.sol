// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/**
 * @title WoodSupplyChain
 * @dev Contract to manage a wood supply chain with restricted access and roles for various actions.
 */
contract WoodSupplyChain {
    /// @notice Enum to define the states of a wood batch in the supply chain.
    enum WoodState {
        Harvested, // The wood has been harvested
        Processed, // The wood has been processed (e.g., cut, treated)
        Transported, // The wood is in transit
        Stored, // The wood is stored in a warehouse
        Delivered // The wood has been delivered to the buyer
    }

    /// @notice Struct to represent a wood batch.
    struct WoodBatch {
        uint256 batchId; // Unique identifier for the batch
        string origin; // Origin location of the wood
        uint256 timestamp; // Timestamp of the last state change
        WoodState state; // Current state of the batch (restricted by the enum)
    }

    /// @notice Struct to represent a company.
    struct Company {
        address[] admin; // List of admin addresses
        address[] authorizedAddress; // List of addresses authorized to perform actions
    }

    /// @notice Struct to represent the flow of a wood batch.
    struct Flow {
        address receiver; // Address of the receiver in the supply chain
        uint256 weightInKg; // Weight of the wood batch in kilograms
        uint256 companyId; // ID of the company associated with the flow
    }

    /// @notice Struct to represent a production site.
    struct ProductionSite {
        string permit; // Permit ID or code for the production site
    }

    address public owner; // Contract owner for access control

    mapping(uint256 => WoodBatch) public woodBatches; // Mapping for wood batches
    mapping(uint256 => Company) private companies; // Mapping for companies
    mapping(address => ProductionSite) private productionSites; // Mapping for production sites
    mapping(uint256 => Flow) private flows; // Mapping for flows by batch ID

    /// @notice Event emitted when a wood batch is updated.
    event WoodBatchUpdated(uint256 indexed batchId, WoodState newState);

    /// @notice Event emitted when a flow is recorded.
    event FlowRecorded(
        uint256 indexed batchId,
        address indexed receiver,
        uint256 weightInKg,
        uint256 companyId
    );

    /// @notice Constructor for initializing the contract.
    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    /// @notice Modifier to restrict access to the contract owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    /// @notice Modifier to restrict access to company admins.
    modifier onlyCompanyAdmin(uint256 companyId) {
        require(isCompanyAdmin(companyId, msg.sender), "Not a company admin.");
        _;
    }

    /// @notice Modifier to restrict access to company admins or authorized addresses.
    modifier onlyCompanyAuthorized(uint256 companyId) {
        require(
            isCompanyAdmin(companyId, msg.sender) ||
                isCompanyAuthorized(companyId, msg.sender),
            "Not authorized."
        );
        _;
    }

    /// @notice Function to create a new wood batch.
    function createWoodBatch(uint256 batchId, string memory origin) external {
        require(woodBatches[batchId].batchId == 0, "Batch ID already exists.");
        woodBatches[batchId] = WoodBatch({
            batchId: batchId,
            origin: origin,
            timestamp: block.timestamp,
            state: WoodState.Harvested
        });

        emit WoodBatchUpdated(batchId, WoodState.Harvested);
    }

    /// @notice Function to add a company to the supply chain (only owner).
    function addCompany(
        uint256 companyId,
        address[] memory admins,
        address[] memory authorizedAddresses
    ) external onlyOwner {
        companies[companyId] = Company({
            admin: admins,
            authorizedAddress: authorizedAddresses
        });
    }

    /// @notice Function to add an authorized address to a company (only admins).
    function addAuthorizedAddress(
        uint256 companyId,
        address authorizedAddress
    ) external onlyCompanyAdmin(companyId) {
        companies[companyId].authorizedAddress.push(authorizedAddress);
    }

    /// @notice Function to add a production site (only admins or authorized addresses of associated company).
    function addProductionSite(
        uint256 companyId,
        address siteAddress,
        string memory permit
    ) external onlyCompanyAuthorized(companyId) {
        productionSites[siteAddress] = ProductionSite({permit: permit});
    }

    /// @notice Function to record a flow of wood.
    function recordFlow(
        uint256 batchId,
        uint256 companyId,
        address receiver,
        uint256 weightInKg
    ) external onlyCompanyAuthorized(companyId) {
        require(woodBatches[batchId].batchId != 0, "Batch does not exist.");
        require(weightInKg > 0, "Weight must be greater than zero.");

        flows[batchId] = Flow({
            receiver: receiver,
            weightInKg: weightInKg,
            companyId: companyId
        });

        emit FlowRecorded(batchId, receiver, weightInKg, companyId);
    }

    /// @notice Function to update the state of a wood batch.
    function updateWoodState(uint256 batchId, WoodState newState) external {
        require(woodBatches[batchId].batchId != 0, "Batch does not exist.");
        woodBatches[batchId].state = newState;
        woodBatches[batchId].timestamp = block.timestamp;

        emit WoodBatchUpdated(batchId, newState);
    }

    /// @notice Function to view flow data (only admins or authorized addresses of associated company).
    function getFlow(uint256 batchId) external view returns (Flow memory) {
        Flow memory flow = flows[batchId];
        require(
            isCompanyAdmin(flow.companyId, msg.sender) ||
                isCompanyAuthorized(flow.companyId, msg.sender),
            "Not authorized to view flow."
        );
        return flow;
    }

    /// @notice Function to view a production site permit (only admins or authorized addresses of associated company).
    function getProductionSitePermit(
        address siteAddress,
        uint256 companyId
    ) external view returns (string memory) {
        require(
            isCompanyAdmin(companyId, msg.sender) ||
                isCompanyAuthorized(companyId, msg.sender),
            "Not authorized to view production site."
        );
        return productionSites[siteAddress].permit;
    }

    /// @notice Check if an address is a company admin.
    function isCompanyAdmin(
        uint256 companyId,
        address user
    ) internal view returns (bool) {
        address[] memory admins = companies[companyId].admin;
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == user) {
                return true;
            }
        }
        return false;
    }

    /// @notice Check if an address is authorized for a company.
    function isCompanyAuthorized(
        uint256 companyId,
        address user
    ) internal view returns (bool) {
        address[] memory authorizedAddresses = companies[companyId]
            .authorizedAddress;
        for (uint256 i = 0; i < authorizedAddresses.length; i++) {
            if (authorizedAddresses[i] == user) {
                return true;
            }
        }
        return false;
    }
}
