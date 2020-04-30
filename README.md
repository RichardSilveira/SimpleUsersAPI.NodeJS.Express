# SimpleUsersAPI.NodeJS.Express
A simple API sample made in Node.js, Express, and MongoDb to be used as a base case to other cases.

## Agenda
- [x] Simple CRUD operations for Users REST API using Express and Mongoose
- [ ] Secure the API (Authentication and Authorization concerns)
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
