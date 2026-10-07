// Portfolio content, sourced from the resume. Edit here; windows render from it.

export interface Project {
  name: string;
  stack: string[];
  summary: string;
  /** Optional repo or live URL. */
  href?: string;
  /** Optional deeper write-up, shown in an expandable section. */
  sections?: { heading: string; points: string[] }[];
}

export const projects: Project[] = [
  {
    name: "XBridge",
    href: "https://bridge-weaver.vercel.app/",
    stack: ["Solidity 0.8.20", "Foundry", "OpenZeppelin", "TypeScript", "ethers.js v6", "Next.js", "wagmi", "Tailwind CSS"],
    summary:
      "Moves ERC-20 tokens between Ethereum Sepolia and Polygon Amoy in either direction. Tokens are locked on Sepolia and minted as a wrapped token on Amoy; burning the wrapped tokens on Amoy unlocks the originals on Sepolia.",
    sections: [
      {
        heading: "How it works",
        points: [
          "BridgeA (Sepolia) locks tokens and emits a Locked event, then releases them when the relayer presents a signed burn proof.",
          "BridgeB (Amoy) verifies the relayer's ECDSA signature, mints wrapped tokens, and handles burns going back.",
          "WrappedToken is an ERC-20 with role-based access control; only the bridge holds the minter and burner roles.",
          "A TypeScript + ethers.js relayer polls both chains, signs (user, amount, nonce, chainId) and sends the matching transaction on the other chain.",
          "A Next.js + wagmi frontend handles wallet connection, approvals, bridging both ways, network switching, balances on both chains and block-explorer links.",
        ],
      },
      {
        heading: "Security",
        points: [
          "Single-use nonces and the chain ID in the signed message prevent replayed transfers.",
          "Signatures verified on-chain with OpenZeppelin's ECDSA library.",
          "Reentrancy guards and the checks-effects-interactions pattern.",
          "Owner-controlled pause switch and emergency withdrawal.",
          "Per-transfer minimum and maximum amounts to block dust and very large transfers.",
          "Custom errors instead of revert strings to save gas.",
        ],
      },
      {
        heading: "Testing & deployment",
        points: [
          "108 Foundry unit tests covering both bridges and the wrapped token.",
          "Deployed to Sepolia and Polygon Amoy with Foundry scripts, including one that grants the bridge its roles.",
          "GitHub Actions workflow runs the test suite.",
        ],
      },
    ],
  },
  {
    name: "PolicyLens",
    href: "https://policylens-hackitm.vercel.app/",
    stack: ["Solidity", "Polygon", "Node.js", "Express", "MongoDB", "Next.js", "BERT"],
    summary:
      "Hackathon 2024 project with Team Real. An AI platform that maps a company's policy documents to the 114 ISO 27001 Annex A controls, prioritizes the gaps, and records every policy on Polygon so auditors can prove it hasn't been altered. I built the blockchain layer and the backend.",
    sections: [
      {
        heading: "My part: blockchain & backend",
        points: [
          "PolicyAuditTrail contract on Polygon: an immutable registry of SHA-256 policy hashes with block-timestamp proof of existence, at roughly $0.01 per transaction.",
          "ComplianceSnapshot contract for recording periodic compliance checkpoints.",
          "Upload pipeline that extracts text (PDF, DOCX, TXT, XLSX), hashes each document and registers it on-chain, with parallel processing for batch uploads.",
          "Public verification API that returns a proof and a Polygonscan link, so external auditors can check a policy without an account.",
          "Node.js + Express API gateway with JWT auth, role-based access (Viewer, Editor, Admin, Auditor), rate limiting and input validation; MongoDB + GridFS for document storage.",
        ],
      },
      {
        heading: "The platform",
        points: [
          "Fine-tuned BERT model classifies each policy across all 114 Annex A controls as strong, partial or gap coverage.",
          "Gaps are ranked by control criticality, dependent controls and effort-to-impact ratio.",
          "Sentence embeddings flag overlapping or conflicting policies at clause level.",
          "Dashboard with a coverage heatmap across the 14 ISO 27001 domains and exportable summaries.",
        ],
      },
      {
        heading: "Results (team-reported)",
        points: [
          "95% control-classification accuracy on a dataset of 500+ labeled policies, including 50 written and labeled with a certified ISO 27001 Lead Auditor.",
          "Gap detection: 91% precision, 88% recall. Single-policy analysis in 5-8 seconds.",
        ],
      },
    ],
  },
  {
    name: "Decentralized Multi-Swap Exchange",
    stack: ["Solidity", "Foundry"],
    summary:
      "Smart-contract multi-swap exchange with real-time trading, liquidity pools and a gas-optimized architecture. Routes across Uniswap V2 and V3, SushiSwap and PancakeSwap.",
  },
  {
    name: "AgriChain dApp",
    stack: ["Solidity", "Foundry", "React", "IPFS"],
    summary:
      "Full-stack application for tracking DeFi investments across multiple chains, with real-time price updates and yield-farming analytics. Led the team for a hackathon; tested and gas-optimized for L2.",
  },
  {
    name: "WalletWave",
    stack: ["Solidity", "React", "Ethers.js", "Chainlink"],
    summary:
      "Decentralized wallet platform for secure transactions and token management. Contracts built and tested with Foundry, Ethers.js for chain interaction, and a responsive React frontend.",
  },
  {
    name: "FlashLoan Arbitrage Bot",
    stack: ["Solidity", "React", "Express", "Web3"],
    summary:
      "Uses zero-collateral flash loans to execute atomic arbitrage trades across decentralized exchanges. Foundry-tested contracts and a React dashboard for real-time profit tracking.",
  },
  {
    name: "Mystery Word",
    stack: ["React", "JavaScript", "HTML/CSS"],
    summary:
      "Word-guessing game with word generation, hints and scoring, built to stay responsive and easy to play on any device.",
  },
];

export interface ExperienceItem {
  title: string;
  subtitle?: string;
  stack: string[];
  points: string[];
}

export const experience = {
  role: "Blockchain Development Intern",
  company: "Lirion",
  items: [
    {
      title: "ERC-3643 Compliant Tokenization Platform",
      stack: ["Solidity", "Node.js", "React"],
      points: [
        "Built a permissioned asset-token system on ERC-3643 with an identity registry, compliance checks and restricted transfers.",
        "Integrated off-chain KYC/AML verification with on-chain investor eligibility and blacklist logic.",
        "Created admin tools for managing identities, permissions and compliance states.",
      ],
    },
    {
      title: "AES-RSA Secure Compute System with TEE & ZK",
      subtitle: "Confidential encryption engine using AES-RSA, a TEE and zero-knowledge proofs",
      stack: ["Node.js", "Intel SGX / TEE", "Cryptography", "ZKP"],
      points: [
        "Built hybrid encryption: AES for data, RSA for key exchange, executed inside a Trusted Execution Environment.",
        "Implemented enclave-level key generation, signing and decryption so private keys never leave hardware isolation.",
        "Added zero-knowledge proofs to verify computations and data validity without revealing sensitive inputs.",
        "Exposed a secure API that processes encrypted files and messages end to end.",
      ],
    },
  ] satisfies ExperienceItem[],
};

export interface EducationItem {
  credential: string;
  school: string;
  date: string;
  details?: string[];
}

export const education: EducationItem[] = [
  {
    credential: "B.Tech, Computer Science & Engineering",
    school: "ITM SLS Baroda",
    date: "Expected Jan 2027",
    details: ["GPA 9.36", "In progress"],
  },
  {
    credential: "Higher Secondary Certificate",
    school: "Phoenix Institute of Baroda",
    date: "2023",
  },
  {
    credential: "Secondary School Certificate",
    school: "Kendriya Vidyalaya",
    date: "2020",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Solidity", "JavaScript", "TypeScript", "Python", "C/C++", "SQL", "HTML/CSS"],
  },
  {
    group: "Frameworks & tools",
    items: ["React", "Express", "Foundry", "Hardhat", "Remix", "Web3 / Ethers.js", "MongoDB", "Git", "GitHub"],
  },
  {
    group: "Areas",
    items: ["Smart contracts", "DeFi", "Tokenization (ERC-3643)", "Applied cryptography", "Full-stack web"],
  },
];
