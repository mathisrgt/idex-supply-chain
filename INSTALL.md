# Installation Guide

This document provides step-by-step instructions to set up the **WoodTracker** project locally.

---

## Prerequisites

### **Tools Required**
- **Node.js**: [Download here](https://nodejs.org/)
- **npm** or **yarn**: Comes with Node.js.
- **Hardhat**: Install globally using \`npm install -g hardhat\`.

---

## Step 1: Clone the Repository

\`\`\`bash
git clone https://github.com/your-repository/woodtracker.git
cd woodtracker
\`\`\`

---

## Step 2: Set Up the Smart Contracts

1. Navigate to the \`hardhat-contracts\` folder:
   \`\`\`bash
   cd hardhat-contracts
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure environment variables:
   - Create a \`.env\` file in the \`hardhat-contracts\` directory and add:
     \`\`\`plaintext
     PRIVATE_KEY=your_wallet_private_key
     INFURA_API_KEY=your_infura_api_key
     POLYGON_RPC_URL=https://polygon-amoy.infura.io/<API_KEY>
     \`\`\`

4. Compile the contracts:
   \`\`\`bash
   npx hardhat compile
   \`\`\`

5. Deploy the contracts:
   \`\`\`bash
   npx hardhat run scripts/deploy.js --network polygon
   \`\`\`

---

## Step 3: Set Up the Frontend

1. Navigate to the \`mobile-front-end\` folder:
   \`\`\`bash
   cd ../mobile-front-end
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure environment variables:
   - Create a \`.env\` file in the \`mobile-front-end\` directory and add:
     \`\`\`plaintext
     NEXT_PUBLIC_WOODTRACKER_CONTRACT_ADDRESS=0xYourContractAddress
     NEXT_PUBLIC_RPC_URL=https://polygon-amoy.infura.io/v3/<API_KEY>
     NEXT_PUBLIC_CHAIN_ID=80001
     \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

---

## Additional Notes

- Ensure your wallet is connected to the **Polygon Amoy Testnet**.
- Check the [README.md](README.md) for an overview of the project structure and features.