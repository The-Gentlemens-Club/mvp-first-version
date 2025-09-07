# GentlemenClub - GambleFi DAO Platform

### Overview
The GentlemenClub is a sophisticated GambleFi DAO (Decentralized Autonomous Organization) platform integrating blockchain gaming, token staking, and governance. It features a comprehensive landing page and a separate casino dashboard. The project aims to provide a full-stack web3 experience with a focus on luxury design, regulatory compliance (including geo-location verification), and advanced UI/UX, targeting a premium user base. Key capabilities include multi-game support, GTLM token staking with revenue sharing, and a robust DAO governance system.

### Recent Enhancements (January 2025) - PoC Version Complete
- **Complete Bootstrap 5.3.3 Integration**: Enhanced forms, modals, carousels, and navigation
- **Dual Backend Support**: Both Flask (Python) and Express.js (Node.js) implementations
- **Custom Brand Identity**: Deep navy (#1a2b3c) and gold (#d4af37) color scheme with luxury aesthetic
- **Advanced Form Validation**: Real-time validation with Bootstrap styling and loading spinners
- **Google Analytics Integration**: Comprehensive event tracking and user behavior analytics
- **Mobile-First Optimization**: Responsive design with custom media queries and bottom navigation bar
- **Professional UI Components**: Loading skeletons, entrance animations, smooth transitions
- **Provably Fair Gaming**: Fully functional dice game with transparent seed verification
- **Enhanced UX**: AnimatedCounter components, tab switching, and refined hover effects
- **Investor-Ready**: Complete PoC with all core features demonstrated and polished UI/UX
- **Bug Fixes (Jan 27, 2025)**: 
  - Fixed dice game rolling animation timing issue
  - Fixed Live Activity Feed popup behavior when scrolling to bottom of page
  - Fixed tab switching issue: "Play Now" buttons now properly display selected games in the games tab instead of opening a modal

### User Preferences
Preferred communication style: Simple, everyday language.

### System Architecture
The application employs a modern full-stack architecture separating frontend, backend, and blockchain components, emphasizing security, scalability, and user experience.

**UI/UX Decisions:**
- **Neo-Luxury Modern Design System**: Transformed from cyberpunk to a sophisticated "old luxury meets modern times" aesthetic.
- **Color Palette**: Deep jewel tones (emerald, sapphire, amethyst) with warm metallics (gold, bronze, copper).
- **Typography**: Playfair Display (headers), Inter (body), Crimson Text (accent).
- **Component Styling**: Glass morphism effects, subtle borders, warm gradients, elegant hover states for cards; luxury buttons and refined data displays.
- **Enhanced UI Components**: Advanced form handling, error boundaries, multi-level loading states (page loaders, card skeletons, inline loaders, gaming animations), and performance optimization (GPU acceleration, smooth scrolling).
- **Mobile Optimization**: Full platform optimized for mobile with touch-friendly elements, responsive typography, mobile-specific layouts, and custom media queries for screens under 768px.

**Technical Implementations & Feature Specifications:**

**Frontend:**
- **Framework**: React 18 with TypeScript.
- **Styling**: Tailwind CSS with shadcn/ui, Bootstrap 5.3.3 integration, Font Awesome 6.4.0 icons.
- **State Management**: TanStack React Query for server state, React hooks for local state.
- **Web3 Integration**: Custom hooks for Web3 connectivity.
- **Routing**: Wouter.
- **Build Tool**: Vite.
- **Enhanced Features**: Advanced form validation, Font Awesome icons, Bootstrap components, custom animations (fade-in effects), loading spinners, success modals, testimonials carousel.
- **Key Sections**:
    - **Landing Page**: Dynamic hero section with live stats, games showcase, feature explanations (gaming, staking, governance), live token metrics, tokenomics display, provider integration info.
    - **Casino Dashboard**: Centralized Games Hub (multi-provider support, Gentlemen Originals like provably fair dice), Staking Panel, Governance Panel, Analytics Charts, Live Activity Feed, Player Leaderboard, User Profile System, Transaction History.
    - **Eligibility Page**: Dedicated `/eligibility` route for geo-location compliance and regulatory information.

**Backend:**
- **Runtime**: Node.js with Express.js, Flask integration available.
- **Language**: TypeScript with ES modules, Python Flask for additional endpoints.
- **Database ORM**: Drizzle ORM for PostgreSQL.
- **Session Management**: Express sessions with PostgreSQL store.
- **API Design**: RESTful API with JSON responses.
- **Analytics**: Google Analytics (gtag.js) integration with event tracking.
- **Key Endpoints**: `/api/health`, `/api/user/:address`, `/api/user`, `/api/join`, `/api/join-requests`.

**Blockchain:**
- **Platform**: Ethereum (Sepolia testnet).
- **Development Framework**: Hardhat.
- **Contract Language**: Solidity 0.8.19.
- **Web3 Provider**: MetaMask integration.
- **Smart Contract Features**:
    - Multi-Game Support (extensible architecture).
    - Gentlemen Dice (provably fair betting).
    - Token Staking (GTLM token with 30% revenue sharing).
    - DAO Governance (proposal creation, weighted voting).
    - House Bankroll (contract-managed funds for payouts).

**System Design Choices:**
- **Eligibility Verification**: Automated geo-location compliance using IP-based verification.
- **Legal Firewall**: DAO Governance and Token Staking are separated on the home page from gambling activities to maintain regulatory compliance.
- **Database Schema (PostgreSQL + Drizzle)**: Tables for Users, Bets, Stakes, and Proposals to manage platform data.
- **Data Flow**: User authentication via MetaMask, geo-restriction checks, on-chain game/staking/DAO interactions, and both on-chain and database transaction logging.

### External Dependencies

**Blockchain Infrastructure:**
- **Ethereum Sepolia Testnet**: Primary blockchain network for deployment.
- **Infura**: RPC provider for blockchain connectivity.
- **MetaMask**: Browser wallet for user authentication and interaction.

**Database:**
- **PostgreSQL**: Primary data storage, specifically via Neon Database (@neondatabase/serverless).
- **Drizzle ORM**: For type-safe database operations and migrations.

**UI/UX Libraries:**
- **Radix UI**: Headless UI components for accessibility.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React**: Icon library for consistent iconography.

**Development Tools:**
- **Hardhat**: Ethereum development environment.
- **Vite**: Frontend build tool and development server.
- **TypeScript**: For static type checking across the entire stack.