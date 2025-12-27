## Frontend Setup

The frontend is a React + TypeScript application responsible for user interaction,
vote submission, and real-time result visualization using Socket.IO.

### Features
- Vote submission
- Live result updates
- Poll expiration handling
- Socket.IO integration

### Start App

```bash
cd frontend
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

### Environment Variables

```text
VITE_SERVER_BASE_API=http://localhost:3000/api
VITE_SERVER_BASE_URL=http://localhost:3000

VITE_BASE_URL=http://localhost:5173
```
