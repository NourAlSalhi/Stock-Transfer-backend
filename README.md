# Inventory Transfer System - Backend

A backend system to manage and transfer inventory between warehouses and stores safely, ensuring capacity limits are respected.

## The Project

The Inventory Transfer System Backend is built with **Node.js** and **Express** It provides APIs to manage:

- Products
- Locations (Warehouses / Stores)
- Inventory per location
- Transfers between locations

It handles multiple products and ensures that **no transfer exceeds a location's capacity** and provides error handling.

## Prerequisites

- Node.js >= 18  
- npm or yarn  
- Relational database: PostgreSQL

## Setup & Run

1. Clone the repository:

```bash
git clone <repo-url>
cd (project_name)
```

## Install Dependav

```bash
npm i
```

## Create a .env file

```bash
DATABASE_URL=
NODE_ENV = 

```

## Run the Project

```bash
npm run dev
```
