# SimpleUsersAPI.NodeJS.Express
A simple API sample made in Node.js, Express, and MongoDb to be used as a base case to other cases.

## Agenda
- [x] Simple CRUD operations for Users REST API using Express and Mongoose
- [x] Secure the API (Authentication and Authorization concerns)
- [ ] Research and apply good practices on top of a NodeJS Express API 
- [ ] Apply some resilience layer on top of database connection (maybe using some sort of circuit breaker)
- [ ] (Optional) Create a UI for the API before the migration to AWS to test some integrations in a real-world scenario, (eg. CORS, Firebase Authentication)
- [ ] Migrate the MongoDB workload to AWS, setting up a Multi AZ infrastructure to provide High Availability
- [ ] Migrate the Users microservice to AWS in smalls Linux Machines - ASG, ELB
- [ ] Set up a Fault Tolerant enviromnent for the API, by using at least 3 AZ in a Region/VPC (ELB).  
- [ ] Set up Observability in the application at general, using AWS X-Ray, CloudTrail, VPC Flow Logs, and (maybe) ELK Stack.
- [ ] Provide infrastructure as a service by creating a CloudFormation Stack of all the stuffs
- [ ] Configure a CI/CD with Blue/Green Deployment (use Route 53 weighted routing policy) (AWS or Team City?)
- [ ] Add a Cache layer with Redis (Write-Through or Lazy Loading strategy) - maybe before publish the API in AWS
- [ ] Containerize the Users API microservice with Docker and update all AWS enviromnent (using AWS Fargate) or by using ECS
- [ ] Create a sample of how all of it can be done with Serverless in AWS with API Gateway, Lambda, DynamoDb?

### Simple CRUD operations for Users REST API using Express and Mongoose - *v1.0.1*

At this point we have a simple REST API with basic settings and CRUD operations using Mongo running in Docker.

A lot of improvement needs to be done yet, we've some security vulnerabilities (eg. CSRF, CORS), some code layer separations that can be done to avoid code duplication in case of application growth (eg. code in userController) and even we can still provide a better architectural organization and separation to reach a ready-to-production stage. 
> We will leverage microservices' concerns later on.

We need to improve our REST implementation as well, to reach at least the level 3 of Richardson Maturity Model, and implement some OpenAPI specification in some way (eg. swagger docs).     
 
**Instructions:** 
- Execute `docker-compose up -d` at root level to run `mongo` and `mongo-express` services.
- Then you can hit `http://localhost:8081` in your browser to all mongodb management tasks needed for this project.
- Run the app with `npm start` =P
> Note: There is a postman collection (with all used endpoinst) at root level tha can be imported. 

### Secure the API (Authentication and Authorization concerns) - *v2.0.0*

We have a common user authentication flow leveraging JWT implementation, may be used for the production stage of small apps.

User management and authentication tasks usually comes with lots of undesirables time-efforts, and complexities, so, doesn't worth waste so much time on a sample of implementation of it, it's always a good idea we consider an "Authentication as a Service" Providers like Auth0, Firebase, AWS Cognito and read their docs, this way we can focus on our business goals.
> But a solid understanding of OAuth2 and OpenID specification will be so helpful in your life...
 
**Instructions:**

All instructions of section 1 are applied here, plus you may import the postman collection again 'cause it was updated with the new `register` and `login` endpoints.
- You need to call the `register`, and then `login` and take the `token` response and use it as `Authorization: JWT <token>` HTTP header for all the endpoints that are all secured now.  