import dotenv from 'dotenv-safe';

dotenv.config();

module.exports = {
  stage: process.env.NODE_ENV,
  mongodbConfig: {
    connectionString: process.env.MONGODB_CONNSTR,
  },
  jwtConfig: {
    secret: process.env.AUTH_SECRET,
    exp: 300,
  },
  usersApiConfig: {
    port: process.env.PORT,
    baseUri: 'http://localhost:4000/v1/',
  },
};
