import dotenv from 'dotenv-safe';

import convict from 'convict';

dotenv.config();

const config = convict({
  stage: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  mongodbConfig: {
    connectionString: {
      doc: 'Main Database Connection String',
      format: String,
      default: 'aaa',
      env: 'MONGODB_CONNSTR',
    },
  },
  jwtConfig: {
    secret: {
      doc: 'Secret used to encrypt/decrypt JWT tokens (should not be shared)',
      format: '*',
      default: null,
      env: 'AUTH_SECRET',
    },
    exp: {
      doc: 'Expiration token time (time in epoch)',
      format: 'int',
      default: null,
    },
  },
  usersApiConfig: {
    port: {
      doc: 'API Port',
      format: 'port',
      default: null,
      env: 'PORT',
    },
    baseUri: {
      doc: 'Base Url as follows: https://localhost:4000/v1',
      format: 'int',
      default: null,
    },
  },
});

const stage = config.get('stage');
config.loadFile(`./src/config/${stage}.json`);

module.exports = config.getProperties();
