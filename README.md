# Polling & Voting System

## Overview

A real-time polling & voting system with secure one-vote-per-user enforcement,
automatic poll expiration, and live result visualization.

## Core Features

- Create polls with multiple options
- One vote per user (DB-level guarantee)
- Automatic poll expiration
- Real-time live results via WebSockets
- Anonymous voting

## Tech Stack

- Backend: Node.js, Express, MySQL, Sequelize, Socket.IO
- Frontend: React, TypeScript
- Database: MySQL

## How to Run

```bash
git clone https://github.com/faris-rahman-git/VoteFlow.git
cd VoteFlow
```

See `/backend/README.md` and `/frontend/README.md`

## Project Structure

```text
├─ backend/
│  └─ src/
│     ├─ app/
│     ├─ domain/
│     ├─ infra/
│     ├─ presentation/
│     ├─ app.ts
│     └─ index.ts
└─ frontend/
   └─ src/
      ├─ components/
      ├─ configs/
      ├─ constants/
      ├─ hooks/
      ├─ lib/
      ├─ pages/
      ├─ redux/
      ├─ router/
      ├─ services/
      ├─ types/
      ├─ utils/
      ├─ app.tsx
      └─ main.tsx
```
