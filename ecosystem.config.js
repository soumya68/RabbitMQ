module.exports = {
    apps: [
      {
        name: 'API',
        script: './server.js',
        exec_mode: 'cluster_mode',
        instances: '1',
        autorestart : true,
        env: {
          NODE_ENV: 'development'
        }
      },
      {
        name: 'emailWorker',
        args: 'consumeMessage',
        exec_mode: 'fork',
        script: "./rabbitMq/subscriber.js",
        instances: '1',
        autorestart : false
      }
    ]
  };