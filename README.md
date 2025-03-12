# AgViewer
 
Web-based user interface that provides visualization of graph data stored in an AgensGraph database. 

This is a sub-project of [AgensGraph](https://github.com/skaiworldwide-oss/agensgraph)

# Recommended Node Version & install module

- Node version - 14.16.0
- Node Module - pm2 

Install latest **pm2** with :

```bash
npm i pm2
```

> [pm2](https://www.npmjs.com/package/pm2) is an NPM module to run the project in production mode.

# Installing AgViewer

Extract the release .zip or .tar.gz package into your desired directory.

From the commandline, navigate to the directory agv-package.

- Install the required node modules using:  

```bash
npm run setup
```


# How to start using AgViewer

AgViewer is a graphical user interface for AgensGraph, so it needs an AgensGraph server running on the background. 

Tipically, this is done with the command 

```
ag_ctl start [-D /path/created/by/initdb]
```

For the other settings or usage instructions, please follow [AgensGraph's documentation](https://www.skaiworldwide.com/en-US/resources?filterKey=manual).

# Running AgViewer

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

# Using the Docker image:

- Pulling the image:

```bash
docker pull markgomer/agensgraphviewer:1.1.0
```

- Run the container:

```bash
docker run --name agviewer -p 3000:3000 -d markgomer/agensgraphviewer:1.1.0
```

Then open the URL 127.0.0.1:3000 on your browser.

> Tip: if your AgensGraph server is running on your host machine, the URL to connect to it should be "host.docker.internal".

# For developers:

Fork this repository, then clone your fork

```bash
## install node modules
npm run setup
## start the development environment
npm run start
```

