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

> [pm2](https://www.npmjs.com/package/pm2) is an NPM module to run the project in production mode, and hence is optional for getting started with setting up development environment for AgViewer 

# Installing AgViewer

- Install the required node modules using  :  

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

- Run AgViewer using : 

```bash
npm run start
```

>This will start AgViewer on http://localhost:3000 if port 3000 is free.

### Connect AgViewer to AgensGraph Database

**Standard Connection Settings**

- Database type: AgensGraph
- Connect URL:  127.0.0.1
- Connect Port: 5432

