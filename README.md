# WoodTracker - Blockchain-based Wood Tracking System

WoodTracker is a decentralized application (dApp) designed to track the flow of wood products across various stages of the supply chain. The system leverages **blockchain technology** to ensure transparency, accountability, and immutability of data. It consists of:

1. **Hardhat Contracts**: Smart contracts for managing wood records, user roles, and production sites.
2. **Next.js Frontend**: A mobile-first web application to interact with the WoodTracker blockchain.

---

## Features

### **Frontend (\`mobile-front-end\`)**
- User roles: Assign, update, and manage user roles.
- Production site management: Create and update production sites.
- Wood flow management: Track wood records, update their state, and assign responsible entities.
- Fully mobile-responsive user interface built with **Next.js** and **NextUI**.

### **Smart Contracts (\`hardhat-contracts\`)**
- **Roles and permissions**: Define and assign roles such as \`Admin\`, \`Extractor\`, \`Transporter\`, etc.
- **Wood records**: Track the origin, state, weight, and type of wood at each stage of the supply chain.
- **Production sites**: Manage permits, certificates, and geolocations of production sites.

---

## Project Structure

### **Frontend (\`mobile-front-end\`)**
\`\`\`plaintext
mobile-front-end/
├── app/                  # Next.js App Router (pages, layouts, components)
├── components/           # Reusable UI components
├── environment/          # Environment configurations (e.g., blockchain settings)
├── hooks/                # Custom React hooks
├── services/             # API services for blockchain interactions
├── types/                # TypeScript interfaces and enums
├── public/               # Public assets (images, icons)
└── styles/               # Global and component-specific styles
\`\`\`

### **Smart Contracts (\`hardhat-contracts\`)**
\`\`\`plaintext
hardhat-contracts/
├── contracts/            # Solidity contracts
│   └── WoodTracker.sol   # Main WoodTracker contract
├── scripts/              # Deployment and testing scripts
├── test/                 # Unit tests for contracts
└── hardhat.config.js     # Hardhat configuration file
\`\`\`

---

## Environment Variables

### **Frontend (\`mobile-front-end\`)**
Create a \`.env\` file in the \`mobile-front-end\` folder with the following variables:

\`\`\`plaintext
NEXT_PUBLIC_WOODTRACKER_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_RPC_URL=https://polygon-mumbai.infura.io/v3/<API_KEY>
NEXT_PUBLIC_CHAIN_ID=80001
\`\`\`

### **Smart Contracts (\`hardhat-contracts\`)**
Create a \`.env\` file in the \`hardhat-contracts\` folder with the following variables:

\`\`\`plaintext
PRIVATE_KEY=your_wallet_private_key
INFURA_API_KEY=your_infura_api_key
POLYGON_RPC_URL=https://polygon-mumbai.infura.io
\`\`\`

---

## Getting Started

Refer to [INSTALLATION.md](INSTALLATION.md) for step-by-step instructions to set up the project.