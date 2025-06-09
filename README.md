# Landing page design

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/meaganali09-8233s-projects/v0-landing-page-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/dSv148WdWLH)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/meaganali09-8233s-projects/v0-landing-page-design](https://vercel.com/meaganali09-8233s-projects/v0-landing-page-design)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/dSv148WdWLH](https://v0.dev/chat/projects/dSv148WdWLH)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

# Charity Donation Platform

This is a charity donation platform that allows users to donate to charities using various payment methods, including cryptocurrency via MetaMask.

## Features

- Browse and select charities
- Make donations using credit card, bank transfer, or cryptocurrency (ETH)
- Track donations and their status
- View charity impact metrics

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm package manager
- An AstraDB account and database (see AstraDB setup below)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up AstraDB by following the instructions in [ASTRADB_SETUP.md](ASTRADB_SETUP.md)

4. Create a `.env` file in the root directory with the following content:
   ```
   ASTRADB_TOKEN=your_astradb_token
   ASTRADB_ID=your_astradb_id
   ASTRADB_REGION=your_astradb_region
   ASTRADB_NAMESPACE=charity_donations
   ```

5. Run the setup script to verify your AstraDB connection and seed the database:
   ```bash
   node scripts/setup-astradb.js
   ```

6. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.
   You can also open [http://localhost:3000/test-astra](http://localhost:3000/test-astra) to verify the AstraDB connection.

## AstraDB Setup

### 1. Create an AstraDB Account
- Go to [https://astra.datastax.com/](https://astra.datastax.com/)
- Sign up for a free account

### 2. Create a Database
- Click on "Create Database"
- Choose the following settings:
  - **Name**: `charity_platform` (or any name you prefer)
  - **Keyspace**: `charity_donations`
  - **Provider**: Choose your preferred cloud provider (AWS, GCP, or Azure)
  - **Region**: Select a region close to your location
- Click "Create Database"

### 3. Generate an Application Token
- Wait for the database to be fully initialized (this can take a few minutes)
- Click on your new database
- Go to the "Connect" tab
- Click on "Generate Token"
- Select "Database Administrator" role
- Click "Generate Token"
- Copy the generated token and save it (you'll need it for the `.env` file)

### 4. Get Database Information
- In the "Connect" tab, find the following information:
  - **Database ID**: Copy this value for the `ASTRADB_ID` environment variable
  - **Region**: Copy this value for the `ASTRADB_REGION` environment variable

### 5. Update Environment Variables
- Update your `.env` file with the collected information:
  ```
  ASTRADB_TOKEN=your_generated_token
  ASTRADB_ID=your_database_id
  ASTRADB_REGION=your_database_region
  ASTRADB_NAMESPACE=charity_donations
  ```

### 6. Setup the Database with Aligned Charities
- Run the setup script to check your connection and seed the database:
  ```bash
  node scripts/setup-astradb.js
  ```

### 7. Restart Your Application
- If your application is running, restart it to load the new environment variables

## Database Structure

The application uses the following collections in AstraDB:

1. **donations** - Stores all donation records
   - Fields: id, donor info, charity, amount, currency, message, payment method, transaction hash, status

2. **charities** - Stores charity information
   - Fields: id, name, category, description, wallet address, impact, location, images, goals

3. **withdrawals** - Tracks charity withdrawals
   - Fields: id, charityId, amount, currency, transaction hash, status

## Important Notes

- For development and testing, the application includes a mock database client that will be used if AstraDB credentials are not provided
- In a production environment, always use proper AstraDB credentials
- The cryptocurrency transaction functionality is simulated in this demo version
- All transaction data is stored in AstraDB regardless of the payment method
