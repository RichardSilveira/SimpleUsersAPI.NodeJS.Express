const http = require('http');
const { createTerminus } = require('@godaddy/terminus');

const handleSystemHealth = (app, makeHealthCheck, makeResourcesCleanup) => {
  const server = http.createServer(app);
  server.listen(3000);

  createTerminus(server, {
    signal: 'SIGNINT',
    healthChecks: { '/healthcheck': makeHealthCheck },
    onSignal: makeResourcesCleanup,
  });
};

module.exports = handleSystemHealth;
