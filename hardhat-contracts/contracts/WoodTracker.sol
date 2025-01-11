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

    struct GeoLocation {
        int256 latitude; // Latitude in degrees (e.g., 12345678 for 12.345678°)
        int256 longitude; // Longitude in degrees (e.g., -12345678 for -12.345678°)
    }

    /// @notice Struct to represent a wood record.
    struct WoodRecord {
        uint256 id;
        string origin;
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
        GeoLocation location;
    }

    address public owner;

    mapping(uint256 => WoodRecord) private woodRecords;
    mapping(address => ProductionSite) private productionSites;
    mapping(address => Role) private roles;

    /// @notice Events
    event ContractOwnerUpdated(address indexed user);

    event RoleAssigned(address indexed user);

    event ProductionSiteCreated(address indexed productionSite);
    event ProductionSiteUpdated(address indexed productionSite);

    event WoodRecordCreated(uint256 indexed id);
    event WoodRecordStateUpdated(uint256 indexed id);
    event WoodRecordDataUpdated(uint256 indexed id);

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Admin; // Contract owner is also an admin
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

    /// @notice View functions

    /// @notice Access a wood record (only registered roles can access).
    function getWoodRecord(
        uint256 id
    ) external view hasRole(msg.sender) returns (WoodRecord memory) {
        return woodRecords[id];
    }

    /// @notice Access production site data (only registered roles can access).
    function getProductionSite(
        address siteAddress
    ) external view hasRole(msg.sender) returns (ProductionSite memory) {
        return productionSites[siteAddress];
    }

    /// @notice Access role of a user (only registered roles can access).
    function getRole(
        address user
    ) external view hasRole(msg.sender) returns (Role) {
        return roles[user];
    }

    /// @notice Write functions

    /// @notice Assign the Admin role (only contract owner can assign).
    function assignAdminRole(address user) external onlyOwner {
        require(user != address(0), "Error: Invalid address.");

        roles[user] = Role.Admin;
        emit RoleAssigned(user);
    }

    /// @notice Assign a non-admin role (only Admins can assign).
    function assignRole(address user, Role role) external hasRole(msg.sender) {
        require(
            roles[msg.sender] == Role.Admin,
            "Error: Caller is not an admin."
        );
        require(user != address(0), "Error: Invalid address.");
        require(role != Role.None, "Error: Cannot assign 'None' as a role.");

        roles[user] = role;

        emit RoleAssigned(user);
    }

    /// @notice Add a production site and automatically assign the Extractor role to its owner.
    function addProductionSite(
        address siteAddress,
        string memory name,
        uint256 capacity,
        string[] memory permit,
        string[] memory certificates,
        int256 latitude,
        int256 longitude
    ) external hasRole(msg.sender) {
        require(
            roles[msg.sender] == Role.Admin,
            "Error: Caller is not an admin."
        );
        require(siteAddress != address(0), "Error: Invalid site address.");
        require(bytes(name).length > 0, "Error: Name cannot be empty.");
        require(
            latitude >= -90000000 && latitude <= 90000000,
            "Error: Invalid latitude."
        );
        require(
            longitude >= -180000000 && longitude <= 180000000,
            "Error: Invalid longitude."
        );

        require(
            bytes(productionSites[siteAddress].name).length == 0,
            "Error: Production site already exists."
        );

        roles[siteAddress] = Role.Extractor;

        productionSites[siteAddress] = ProductionSite({
            name: name,
            capacity: capacity,
            permit: permit,
            certificates: certificates,
            location: GeoLocation(latitude, longitude)
        });

        emit RoleAssigned(siteAddress);
    }

    /// @notice Update details of a production site (only the owner of the production site can update).
    /// @param siteAddress The address of the production site to update.
    /// @param name (Optional) The new name for the production site. Use empty string to skip updating.
    /// @param capacity (Optional) The new capacity of the production site. Use `0` to skip updating.
    /// @param certificates (Optional) The updated list of certificates. Use empty array to skip updating.
    /// @param latitude (Optional) The updated latitude. Use `int256(-1)` to skip updating.
    /// @param longitude (Optional) The updated longitude. Use `int256(-1)` to skip updating.
    function updateProductionSite(
        address siteAddress,
        string memory name,
        uint256 capacity,
        string[] memory certificates,
        int256 latitude,
        int256 longitude
    ) external {
        require(
            bytes(productionSites[siteAddress].name).length > 0,
            "Error: Production site does not exist."
        );
        require(
            msg.sender == siteAddress,
            "Error: Only the owner of the production site can update it."
        );

        ProductionSite storage site = productionSites[siteAddress];

        // Update name if provided
        if (bytes(name).length > 0) {
            site.name = name;
        }

        // Update capacity if provided
        if (capacity > 0) {
            site.capacity = capacity;
        }

        // Update certificates if provided
        if (certificates.length > 0) {
            site.certificates = certificates;
        }

        // Update location if provided
        if (latitude != int256(-1) && longitude != int256(-1)) {
            require(
                latitude >= -90000000 && latitude <= 90000000,
                "Error: Invalid latitude."
            );
            require(
                longitude >= -180000000 && longitude <= 180000000,
                "Error: Invalid longitude."
            );
            site.location = GeoLocation(latitude, longitude);
        }

        emit ProductionSiteUpdated(siteAddress);
    }

    /// @notice Create a new wood record.
    /// @param id The unique identifier for the wood record.
    /// @param origin The origin of the wood.
    /// @param weightInKg The weight of the wood in kilograms.
    /// @param woodType The type of wood.
    /// @param cutType The type of cut.
    /// @param productionSite The address of the associated production site.
    function createWoodRecord(
        uint256 id,
        string memory origin,
        uint256 weightInKg,
        string memory woodType,
        string memory cutType,
        address productionSite
    ) external hasRole(msg.sender) {
        require(
            roles[msg.sender] == Role.Extractor,
            "Error: Caller is not an Extractor."
        );
        require(weightInKg > 0, "Error: Weight must be greater than zero.");
        require(
            bytes(productionSites[productionSite].name).length > 0,
            "Error: Production site does not exist."
        );
        require(
            woodRecords[id].id == 0,
            "Error: A wood record with this ID already exists."
        );

        woodRecords[id] = WoodRecord({
            id: id,
            origin: origin,
            weightInKg: weightInKg,
            woodType: woodType,
            cutType: cutType,
            state: WoodState.Harvested,
            currentResponsible: msg.sender,
            productionSite: productionSite
        });

        emit WoodRecordCreated(id);
    }

    /// @notice Update a wood record.
    /// @param id The unique identifier of the wood record.
    /// @param newState The new state of the wood.
    /// @param newWeightInKg (Optional) The updated weight in kilograms.
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

        // Update the state
        record.state = newState;

        // Optional: Update the weight if provided
        if (newWeightInKg > 0) {
            record.weightInKg = newWeightInKg;
        }

        emit WoodRecordDataUpdated(id);
    }
}
