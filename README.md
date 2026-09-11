# Order Management App

A full-stack application I built for a real-world use case to simplify day-to-day order management and keep orders organized by date.

The application runs locally and is used to manage orders, with the frontend communicating with a NestJS backend and a PostgreSQL database.

## Features

* Create and manage orders
* Assign orders to specific dates
* View and organize orders by date
* Update existing orders
* Store and retrieve order data from PostgreSQL
* Local application setup with a simple `.bat` startup script

## Architecture

The project consists of a React frontend and a NestJS backend.

```text
React / TypeScript
       ↓
     REST API
       ↓
     NestJS
       ↓
     Prisma
       ↓
   PostgreSQL
```

The frontend communicates with the backend through a REST API. Prisma is used for database access and PostgreSQL is used for persistent data storage.

## Tech Stack

### Frontend

* React
* TypeScript

### Backend

* NestJS
* TypeScript
* Prisma

### Database

* PostgreSQL

## Running Locally

The application is designed for local use.

A `.bat` file is included to simplify starting the application without manually starting the frontend and backend separately.

Before running the application, make sure PostgreSQL is running and the required environment variables are configured.

## Why I Built It

I built this application for a real-world use case where managing orders and keeping track of their dates needed to be simpler and more organized.

Instead of relying on manual tracking, the application provides a single place to manage the orders and quickly see what needs to be handled for a specific date.

This project was built for actual day-to-day use, rather than as a tutorial or demo application.

## Project Status

The application is currently used locally for its intended purpose.

It is not designed as a public SaaS application and does not include features such as user authentication or multi-user access because they were not required for the original use case.
