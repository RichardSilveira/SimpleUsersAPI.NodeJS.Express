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

We need to improve our REST implementation as well, to reach the level 3 of Richardson Maturity Model (RMM), and implement some OpenAPI specification in some way (eg. swagger docs).     
 
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

### Research and apply good practices on top of a NodeJS Express API - v3.*

How it is a huge topic, I split it up to some releases.

#### Asynchronous methods and REST - v3.1.0

How Node.js is a single threaded framework that works on top of the delegation of tasks to the `Event Loop` 
we need to take care about our synchronous operations (eg. API, Database Calls) to avoid blocking of our app, 
so weed to leverage asynchronous methods as soon as possible. 
Therefore we're invoking all `Mongoose`, and `bcrypt` methods async available now 
and handling properly the application errors either sync or async through a `handle` middleware.  

We still need to work in a Cluster way and forking process, leveraging the number of cores available to us _(we'll do it later using PM2)_

We can consider this API now REST level 2 of RMM, we are properly representing resources and working with HTTP Status Codes, so at this point, we've a solid API that can work fine inside an organization, 
**but** if your goal is to build a public API we need to think about a way to make our API self-documenting and provides a solid response format across the entire API, 
and is exactly at this points that the level 3 of RMM solves our problems, introducing the concept of `Hypermedia` and `Mime Types`.

We need to work with an OpenApi spec and still talking about REST APIs, providing a cache response layer too.

> Note: The API has versioning now.


**Instructions:**

Just a note here, you'll need to import the updated POSTMAN collection again. 






  
