# AGViewer

Web-based user interface that provides visualization of graph data stored in an AgensGraph database. It can render complex nodes, relationships, and properties in a clear and dynamic way. AGViewer helps developers, data analysts, and researchers gain deeper insights into graph data.

## Features

- **Web-Based Interface:** Accessible through any web browser.
- **Graph Visualization:** Provides interactive visualization tools for graph data.
- **User-Friendly:** Intuitive interface designed for ease of use.
- **Real-Time Interaction:** Allows for real-time data updates and interaction with graph data.

This is a sub-project of [AgensGraph](https://github.com/skaiworldwide-oss/agensgraph)

# AGViewer via Docker image

- Pulling the image:

```bash
docker pull skaiworldwide/agviewer
```

- Run the container:

```bash
docker run --name agviewer -p 3000:3000 -d skaiworldwide/agviewer
```

Then open the URL [127.0.0.1:3000](http://127.0.0.1:3000) on your browser.

> Tip: if your AgensGraph server is running on your host machine or difference container, the URL to connect to it should be "host.docker.internal".

> [pm2](https://www.npmjs.com/package/pm2) is an NPM module to run the project in production mode.
```

## Installation
### 1. Clone the Repository

Clone the AGViewer repository to your local machine:

```bash
git clone https://github.com/skaiworldwide-oss/AGViewer.git
```

### 2. Navigate to the Project Directory

Move into the cloned project directory:

```bash
cd AGViewer
```

### 3. Install Root Dependencies

Install the required Node.js dependencies for the root project:

```bash
npm install
```

### 4. Install Frontend Dependencies

Navigate into the frontend folder and install its dependencies:

```bash
cd frontend
npm install
```

If you encounter dependency errors during installation, try reinstalling Node.js and use the following command:
```bash
npm install --legacy-peer-deps
```

This command forces npm to ignore strict peer dependency checks and install all required packages.

### 5. Install Backend Dependencies
Install backend dependencies:
```bash
cd backend
npm install
```
## Running the Application
1. Return to the project root directory:

```bash
cd ..
```

2. Start the application:

```bash
npm run start
```

3. Open your browser and navigate to: http://localhost:3000

## Connecting to AgensGraph

For AGViewer to function correctly, ensure that **AgensGraph** is running on your system.

Refer to this guide for help with setting up AgensGraph:  
[Setting up AgensGraph and AGViewer with Docker](https://medium.com/@agensgraph/setting-up-agensgraph-and-agviewer-with-docker-efb1140f40bc)

---

## Troubleshooting

- If you face errors during `npm install`, reinstall Node.js, delete node_modules and package-lock.json 

```bash
  npm install --legacy-peer-deps
```

- Ensure that AgensGraph is running and accessible before starting AGViewer.

- Make sure no other application is using port 3000.


## For Windows Desktop Application:
- Run this inside app folder
```bash
yarn install
```

- Run this for the application to launch
```bash
yarn run bundle:test
```