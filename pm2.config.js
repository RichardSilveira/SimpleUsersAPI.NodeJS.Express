module.exports = {
  name: 'usersapi',
  cwd: '.',
  script: './src/index.js',
  node_args: '-r dotenv-safe/config ./src/index.js',
  instances: 'max',
  exec_mode: 'cluster',
  exp_backoff_restart_delay: 100,
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
