// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract WoodTracker {
    /// @notice Enum to define roles within the contract.
    enum Role {
        None, // No role assigned (default value)
        Admin, // Admin role
        Extractor, // Extractor role
        Transporter, // Transporter role
        Warehouse, // Warehouse role
        Manufacturer, // Manufacturer role
        Client, // Client role
        Viewer // Viewer role (can only view data)
    }

    /// @notice Enum to define wood states.
    enum WoodState {
        Harvested,
        Transported,
        Stored,
        Processed,
        Delivered
    }

    // struct GeoLocation {
    //     int256 latitude; // Latitude in degrees (e.g., 12345678 for 12.345678°)
    //     int256 longitude; // Longitude in degrees (e.g., -12345678 for -12.345678°)
    // }

    uint256 private woodRecordCounter;

    /// @notice Struct to represent a wood record.
    struct WoodRecord {
        uint256 id;
        uint256 weightInKg;
        string woodType;
        string cutType;
        WoodState state;
        address currentResponsible;
        address productionSite;
    }

    /// @notice Struct to represent a production site.
    struct ProductionSite {
        string name;
        uint256 capacity;
        string[] permit;
        string[] certificates;
        string location;
    }

    address public owner;

    mapping(uint256 => WoodRecord) private woodRecords;
    mapping(address => ProductionSite) private productionSites;
    mapping(address => Role) private roles;

    /// @notice Events
    event ContractOwnerUpdated(address indexed user);

    event RoleAssigned(address indexed user);
    event UserRemoved(address indexed user);

    event ProductionSiteCreated(address indexed productionSite);
    event ProductionSiteUpdated(address indexed productionSite);

    event WoodRecordCreated(uint256 indexed id);
    event WoodRecordStateUpdated(uint256 indexed id);
    event WoodRecordDataUpdated(uint256 indexed id);

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Admin; // Contract owner is also an admin
        woodRecordCounter = 0;
    }

    /// @notice Modifiers
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Error: Caller is not the contract owner."
        );
        _;
    }

    modifier hasRole(address account) {
        require(
            roles[account] != Role.None, // Ensure the role is not None (default value)
            "Error: Address does not have an assigned role."
        );
        _;
    }

    modifier isAdmin(address account) {
        require(roles[account] == Role.Admin, "Error: Caller is not an Admin.");
        _;
    }

    modifier isExtractor(address account) {
        require(
            roles[account] == Role.Extractor,
            "Error: Caller is not an extractor."
        );
        _;
    }

    /// @notice View functions

    /// @notice Access a wood record (only registered roles can access).
    function getWoodRecord(
        uint256 id
    ) external view hasRole(msg.sender) returns (WoodRecord memory) {
        require(
            woodRecords[id].id != 0 || id == 0,
            "Error: Wood record does not exist."
        );

        return woodRecords[id];
    }

    /// @notice Access production site data (only registered roles can access).
    function getProductionSite(
        address siteAddress
    ) external view hasRole(msg.sender) returns (ProductionSite memory) {
        return productionSites[siteAddress];
    }

    /// @notice Access role of a user (only registered roles can access).
    function getRole(address user) external view returns (Role) {
        return roles[user];
    }

    /// @notice Write functions

    /// @notice Assign a role (only Admins can assign).
    function assignRole(address user, Role role) external {
        // isAdmin(msg.sender)
        require(user != address(0), "Error: Invalid address.");
        require(role != Role.None, "Error: Cannot assign 'None' as a role.");
        // if (role == Role.Admin) {
        //     require(
        //         msg.sender == owner,
        //         "Error: Only the contract owner can assign or remove the Admin role."
        //     );
        // }

        roles[user] = role;

        emit RoleAssigned(user);
    }

    function removeUser(address user) external isAdmin(msg.sender) {
        require(user != address(0), "Error: Invalid address.");
        // require(
        //     user != msg.sender,
        //     "Error: You cannot remove your own account. Another admin must perform this action."
        // );
        require(
            user != owner,
            "Error: The contract owner cannot be removed. Change ownership first."
        );
        require(
            roles[user] != Role.None,
            "Error: The user does not have an assigned role."
        );

        if (roles[user] == Role.Extractor) {
            delete productionSites[user]; // Remove their production site
        }
        roles[user] = Role.None;

        emit UserRemoved(user);
    }

    /// @notice Create a production site and automatically assign the Extractor role to its owner.
    function createProductionSite(
        string memory name,
        uint256 capacity,
        string[] memory permit,
        string[] memory certificates,
        string memory location
    ) external isExtractor(msg.sender) {
        require(msg.sender != address(0), "Error: Invalid site address.");
        require(bytes(name).length > 0, "Error: Name cannot be empty.");
        require(bytes(location).length > 0, "Error: Location cannot be empty.");

        require(
            bytes(productionSites[msg.sender].name).length == 0,
            "Error: A production site is already linked to this address. Only 1 production site per address is allowed."
        );

        productionSites[msg.sender] = ProductionSite({
            name: name,
            capacity: capacity,
            permit: permit,
            certificates: certificates,
            location: location
        });

        emit ProductionSiteCreated(msg.sender);
    }

    /// @notice Update details of a production site (only the owner of the production site can update).
    /// @param name (Optional) The new name for the production site. Use empty string to skip updating.
    /// @param capacity (Optional) The new capacity of the production site. Use `0` to skip updating.
    function updateProductionSite(
        string memory name,
        uint256 capacity
    ) external isExtractor(msg.sender) {
        require(
            bytes(productionSites[msg.sender].name).length > 0,
            "Error: Production site does not exist."
        );

        ProductionSite storage site = productionSites[msg.sender];

        if (bytes(name).length > 0) {
            site.name = name;
        }

        if (capacity > 0) {
            site.capacity = capacity;
        }

        emit ProductionSiteUpdated(msg.sender);
    }

    function addPermit(string memory permit) external isExtractor(msg.sender) {
        ProductionSite storage site = productionSites[msg.sender];

        require(
            bytes(site.name).length > 0,
            "Error: Caller does not have initialized his production site."
        );
        require(
            bytes(permit).length > 0,
            "Error: Permit must be a non-empty string."
        );

        site.permit.push(permit);

        emit ProductionSiteUpdated(msg.sender);
    }

    function addCertificate(
        string memory certificate
    ) external isExtractor(msg.sender) {
        ProductionSite storage site = productionSites[msg.sender];

        require(
            bytes(site.name).length > 0,
            "Error: Caller does not have initialized his production site."
        );
        require(
            bytes(certificate).length > 0,
            "Error: Certificate must be a non-empty string."
        );

        site.certificates.push(certificate);

        emit ProductionSiteUpdated(msg.sender);
    }

    /// @notice Create a new wood record.
    /// @param weightInKg The weight of the wood in kilograms.
    /// @param woodType The type of wood.
    /// @param cutType The type of cut.
    function createWoodRecord(
        uint256 weightInKg,
        string memory woodType,
        string memory cutType
    ) external isExtractor(msg.sender) {
        require(weightInKg > 0, "Error: Weight must be greater than zero.");
        require(
            bytes(productionSites[msg.sender].name).length > 0,
            "Error: Production site have not been initialized."
        );

        woodRecords[woodRecordCounter] = WoodRecord({
            id: woodRecordCounter,
            weightInKg: weightInKg,
            woodType: woodType,
            cutType: cutType,
            state: WoodState.Harvested,
            currentResponsible: msg.sender,
            productionSite: msg.sender
        });

        emit WoodRecordCreated(woodRecordCounter);

        woodRecordCounter++;
    }

    /// @notice Update a wood record.
    /// @param id The unique identifier of the wood record.
    /// @param newState The new state of the wood.
    /// @param newWeightInKg The updated weight in kilograms.
    function updateWoodRecord(
        uint256 id,
        WoodState newState,
        uint256 newWeightInKg
    ) external hasRole(msg.sender) {
        require(woodRecords[id].id != 0, "Error: Wood record does not exist.");
        require(
            woodRecords[id].currentResponsible == msg.sender,
            "Error: Caller is not the current responsible party."
        );

        WoodRecord storage record = woodRecords[id];

        record.state = newState;
        record.weightInKg = newWeightInKg;

        emit WoodRecordDataUpdated(id);
    }
}
