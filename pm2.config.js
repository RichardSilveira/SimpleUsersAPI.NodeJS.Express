const path = require('path');

module.exports = {
  name: 'usersapi',
  cwd: path.resolve(__dirname, './src/index'),
  script: 'index.js',
  exp_backoff_restart_delay: 100,
  watch: true,
  instance_var: 'INSTANCE_ID',
  env: {
    PORT: 4000,
    NODE_ENV: 'development',
  },
  env_production: {
    PORT: 4000,
    NODE_ENV: 'production',
  },
};
