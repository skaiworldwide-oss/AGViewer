module.exports = {
  apps: [{
    name: "ag-viewer",
    namespace: "ag-viewer",
    script: "cd backend && node ./build/bin/www",
    watch: false,
    env: {
      name: "ag-viewer-develop",
      PORT: 3001,
      NODE_ENV: "develop",
    },
    env_release: {
      name: "ag-viewer-release",
      PORT: 3000,
      NODE_ENV: "release",
    }
  }],
  deploy: {
    env_release: {
      'post-deploy': 'npm deploy && pm2 reload ecosystem.config.js'
    }
  }
}
