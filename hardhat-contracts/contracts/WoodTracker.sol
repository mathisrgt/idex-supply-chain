// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract WoodTracker {
    /// @notice Enum to define roles within a company.
    enum Role {
        Extractor,
        Transporter,
        Warehouse,
        Manufacturer,
        Client
    }

    /// @notice Enum to define wood states.
    enum WoodState {
        Harvested,
        Processed,
        Transported,
        Stored,
        Delivered
    }

    /// @notice Struct to represent a wood record.
    struct WoodRecord {
        uint256 id;
        string origin;
        uint256 weightInKg;
        WoodState state;
        address currentResponsible; // Address currently responsible for the wood
        address productionSite; // Production site associated with this wood record
    }

    /// @notice Struct to represent a production site.
    struct ProductionSite {
        string permit; // Permit or license ID
        string location; // Geographical location of the site
        address owner; // Address responsible for the site
    }

    address public owner;

    mapping(uint256 => WoodRecord) private woodRecords; // Mapping of wood records by ID
    mapping(address => ProductionSite) private productionSites; // Mapping of production sites by address
    mapping(uint256 => mapping(address => Role)) private companyRoles; // Roles within companies

    /// @notice Events
    event WoodRecordCreated(
        uint256 indexed id,
        address indexed productionSite,
        address indexed responsible
    );
    event WoodStateUpdated(
        uint256 indexed id,
        WoodState newState,
        address indexed responsible
    );
    event RoleAssigned(
        uint256 indexed companyId,
        address indexed user,
        Role role
    );
    event ProductionSiteAdded(
        address indexed siteAddress,
        string permit,
        string location
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Error: Caller is not the contract owner."
        );
        _;
    }

    modifier onlyRole(address productionSite, Role role) {
        require(
            companyRoles[uint256(uint160(productionSite))][msg.sender] == role,
            string(
                abi.encodePacked(
                    "Error: Caller does not have the required role: ",
                    uint256(role)
                )
            )
        );
        _;
    }

    modifier onlyResponsible(uint256 id) {
        require(
            woodRecords[id].currentResponsible == msg.sender,
            "Error: Caller is not the current responsible party for this wood record."
        );
        _;
    }

    /// @notice Add a production site.
    function addProductionSite(
        address siteAddress,
        string memory permit,
        string memory location
    ) external onlyOwner {
        require(siteAddress != address(0), "Error: Invalid site address.");
        require(bytes(permit).length > 0, "Error: Permit cannot be empty.");
        require(bytes(location).length > 0, "Error: Location cannot be empty.");
        require(
            productionSites[siteAddress].owner == address(0),
            "Error: Site already exists."
        );

        productionSites[siteAddress] = ProductionSite({
            permit: permit,
            location: location,
            owner: msg.sender
        });

        emit ProductionSiteAdded(siteAddress, permit, location);
    }

    /// @notice Assign a role to an address for a production site.
    function assignRole(
        address productionSite,
        address user,
        Role role
    ) external {
        require(
            productionSites[productionSite].owner == msg.sender,
            "Error: Caller is not the site owner."
        );
        require(user != address(0), "Error: Invalid address.");
        companyRoles[uint256(uint160(productionSite))][user] = role;
        emit RoleAssigned(uint256(uint160(productionSite)), user, role);
    }

    /// @notice Create a new wood record.
    function createWoodRecord(
        uint256 id,
        string memory origin,
        uint256 weightInKg,
        address productionSite
    ) external onlyRole(productionSite, Role.Extractor) {
        require(
            woodRecords[id].id == 0,
            "Error: Wood record with this ID already exists."
        );
        require(weightInKg > 0, "Error: Weight must be greater than zero.");
        require(
            productionSites[productionSite].owner != address(0),
            "Error: Production site does not exist."
        );

        woodRecords[id] = WoodRecord({
            id: id,
            origin: origin,
            weightInKg: weightInKg,
            state: WoodState.Harvested,
            currentResponsible: msg.sender,
            productionSite: productionSite
        });

        emit WoodRecordCreated(id, productionSite, msg.sender);
    }

    /// @notice Update the state of a wood record.
    function updateWoodRecordState(
        uint256 id,
        WoodState newState
    ) external onlyResponsible(id) {
        WoodRecord storage record = woodRecords[id];

        record.state = newState;

        emit WoodStateUpdated(id, newState, msg.sender);
    }

    /// @notice View wood record.
    function getWoodRecord(
        uint256 id
    ) external view returns (WoodRecord memory) {
        return woodRecords[id];
    }

    /// @notice View production site data.
    function getProductionSite(
        address siteAddress
    ) external view returns (ProductionSite memory) {
        return productionSites[siteAddress];
    }

    /// @notice Get the role of a user for a production site.
    function getRole(
        address productionSite,
        address user
    ) external view returns (Role) {
        return companyRoles[uint256(uint160(productionSite))][user];
    }
}
