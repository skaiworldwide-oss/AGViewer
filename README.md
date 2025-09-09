AGViewer
========

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

# AGViewer vai Source Code

### Recommended Node Version & install module

- Node version - 14.16.0
- Node Module - pm2 

Install latest **pm2** with :

```bash
npm i pm2
```

###  Get the source code
Extract the release .zip or .tar.gz package into your desired directory.

From the commandline, navigate to the directory agv-package.

### Install dependencies
- Install the required node modules using following command:  

```bash
npm run setup
```

### Start/Stop AGViewer

- Run AgViewer in production environment using : 

```bash
pm2 start ecosystem.config.js --env release
```

> This will start AgViewer on http://localhost:3000 if port 3000 is free.

To stop the process use the commands:

```bash
pm2 stop ag-viewer-release 
pm2 delete ag-viewer-release
```

### Connect AgViewer to AgensGraph Database

**Standard Connection Settings**

- Database type: `AgensGraph`
- Connect URL  : `127.0.0.1`
- Connect Port :  `5432`

See [AgensGraph](https://github.com/skaiworldwide-oss/agensgraph) ReadMe file or Manual to setup AgensGraph

## For developers:

Fork this repository, then clone your fork

```bash
# install node modules
npm run setup
# start the development environment
npm run start
```

## Documentation
Comprehensive documentation is available to help you get started with AGViewer and make the most of its features.
- [Quick Start Guide](http://tech.skaiworldwide.com/docs/en/agviewer/1/index.html)

## License
- [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
