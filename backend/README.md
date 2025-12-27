## Backend Setup

The backend is built with Node.js and Express and is responsible for business logic,
data integrity, transactions, real-time result broadcasting, and API handling.

### Core Responsibilities

- Poll creation and management
- Secure vote processing with transaction safety
- One-vote-per-user enforcement
- Automatic poll expiration
- Real-time result broadcasting via Socket.IO
- High-concurrency safe operations

### Requirements

- Node.js
- MySQL

### Start Server

```bash
cd backend
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

```text
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=polling_db
CLIENT_URL=http://localhost:5173
```

### Architecture Notes

- Clean Architecture
- Transactional voting
- DB-level uniqueness constraints
- Row-level locking
- Real-time result broadcasting via Socket.IO
