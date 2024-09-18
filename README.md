
# NodeJs-Swagger-Math Documentation

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Requirements](#2-requirements)
3. [Cloning the Repository](#3-cloning-the-repository)
4. [Setting Up the Environment](#4-setting-up-the-environment)
5. [Running the App with Docker](#5-running-the-app-with-docker)
6. [Running the App without Docker](#6-running-the-app-without-docker)
7. [Where to Access the App](#7-where-to-access-the-app)
8. [Getting Help](#8-getting-help)

## 1. Getting Started

Welcome to the NodeJs-Swagger-Math project! This guide will help you:

- Clone the repository to your machine.
- Install required dependencies.
- Set up your environment.
- Run the application locally.

## 2. Requirements

Before you begin, ensure that you have the following tools installed on your system:

### Node.js

- Download and install Node.js from the official website: [Node.js Download](https://nodejs.org/). It is recommended to install the **LTS version** for better stability.
- After installation, confirm it by typing `node -v` in your terminal, which should display the Node.js version installed.

### Docker

- Download and install Docker from the official website: [Docker Download](https://www.docker.com/products/docker-desktop/).
- Ensure Docker is running by opening Docker Desktop on your machine.

## 3. Cloning the Repository

To begin, clone the project repository to your local machine. Open your terminal or command prompt and run the following command:

```bash
git clone https://github.com/QPMatrix/NodeJs-Swagger-Math
```

This will copy the project files into a new folder on your system.

## 4. Setting Up the Environment

The project requires specific environment configurations. Navigate to the project directory by running:

```bash
cd NodeJs-Swagger-Math
```

In the root directory, create a `.env` file with the following content:

```bash
JWT_SECRET=your_secret_key
JWT_EXPIRATION=1h
PORT=3000
```

This file is essential for configuring authentication secrets and the app's running port.

## 5. Running the App with Docker

Docker simplifies application management by handling dependencies automatically.

To run the app using Docker:

1. Ensure Docker is running on your system.
2. In the project folder, build the Docker image by running:

   ```bash
   docker build -t <your_container_name> .
   ```

3. Once the build is complete, start the app using:

   ```bash
   docker run -p 3000:3000 <your_container_name>
   ```

   Alternatively, you can run the app with Docker Compose:

   ```bash
   docker compose up --build
   ```

The app should now be accessible at `http://localhost:3000`.

## 6. Running the App without Docker

If you prefer running the app without Docker, you can use Node.js instead:

1. Ensure you're in the project directory:

   ```bash
   cd NodeJs-Swagger-Math
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. To run tests, use the command:

   ```bash
   npm test
   ```

## 7. Where to Access the App

Once the app is running, you can access it by visiting the following URL in your browser:

- App: [http://localhost:3000](http://localhost:3000)
- Swagger Documentation: [http://localhost:3000/docs](http://localhost:3000/docs)

## 8. Getting Help

If you encounter any issues or have any questions, feel free to reach out for assistance.
