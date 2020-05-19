# SimpleUsersAPI.NodeJS.Express
A zero to master API made in Node.js, Express, MongoDb, and AWS.


## Agenda
- [x] Simple CRUD operations for Users REST API using Express and Mongoose
- [x] Secure the API (Authentication and Authorization concerns)
- [X] Research and apply good practices on top of a NodeJS Express API 
- [x] ~~Apply some resilience layer on top of database connection (maybe using some sort of circuit breaker)~~*¹
- [ ] (Optional) Create a UI for the API before the migration to AWS to test some integrations in a real-world scenario, (eg. CORS, Firebase Authentication)
- [X] Migrate the MongoDB workload to AWS, setting up a Multi AZ infrastructure to provide High Availability
- [x] Configure an OpenAPI Specification work environment
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
Apply some resilience layer on top of database
User management and authentication tasks usually comes with lots of undesirables time-efforts, and complexities, so, doesn't worth waste so much time on a sample of implementation of it, it's always a good idea we consider an "Authentication as a Service" Providers like Auth0, Firebase, AWS Cognito and read their docs, this way we can focus on our business goals.
> But a solid understanding of OAuth2 and OpenID specification will be so helpful in your life...
 
**Instructions:**

All instructions of section 1 are applied here, plus you may import the postman collection again 'cause it was updated with the new `register` and `login` endpoints.
- You need to call the `register`, and then `login` and take the `token` response and use it as `Authorization: JWT <token>` HTTP header for all the endpoints that are all secured now.

### Research and apply good practices on top of a NodeJS Express API - *v3..*

How it is a huge topic, I split it up to some releases.

#### Asynchronous methods and REST - *v3.0.0*

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

#### Security Aspects and better general project organization - *v3.1.1*

Important security aspects to handle attacks as _Cross Site Request Forgery (CSRF)_, and _CORS_ settings are Ok now. 
> We need to go back here when a UI will have to integrate with this API
>
Some common performance settings as gzip compression were done, but we need to keep in mind that lots of stuff at this field can be (and maybe will) done in the Reverse Proxy later.

The Configuration aspects of the API were reorganized to better readability.

**Instructions:**

For the configurations, this project works which a combination of `dotenv` (using `dotenv-safe`) and `convict`, so, 
the values that should be stored as environment variables (such as keys/secrets/passwords) you may notice at `.env.example` file
and the others values that there is no problem to reveal them among other team members can be stored in files like 
`development.json` and `production.json` under the `config`directory. 

#### Clustering in Node.js with PM2 - *v3.2.0*

> Tl;dr: No multi-threading model, however you need to scale your app earlier with Node.js Cluster model, 
>but you don't need to do it on your own, you may use a **Node Process Manager** like `PM 2` instead.     
>
Like I said earlier Node.js is a single-threaded language and works on top on the `Event Loop` model 
and simplifies a lot our development model about multi-threading and race-condition concerns that 
we need to handle in other languages like C# and Java to perform better in our multi-core server machine. 
In Node.js we don't need to worry about this kind of stuff, but on the other hand, we need to be concerned 
about the Node.js Cluster module and how it handles the worker processes, how they are spawned according 
the number of Cores from the host machine, how to fork a new child worker, and so on.    

To help us which this task, we need to use a **Node Process Manager**, the most popular nowadays is the `PM 2`. 
`PM 2` will fork process according to new requests are coming X host server capacity, besides it will 
handle restarts, errors, monitoring, among other tasks.

If we need, `PM 2` will handle some stuffs like deploy in production directly in the server destination host, 
but I prefer to use `PM 2` limited to cluster management responsibilities, one reason is that working with AWS, 
the deployments using EC2 hosts is faster (and well-organized) through "Golden AMI" strategy, this way we've 
the `PM 2` package installed globally and a symlink to it at the project level.

We need to handle database close connection whenever the `PM2` process is killed, 
I'll reorganize the database later in some kind of repository of a hexagonal architecture (maybe Onion architecture).
 
> I'll show off how to work with "Golden AMI" + ASG + Placement Groups + Blue-Green Deployments in AWS later.

> To boost the build time and app initialization  we may install globally all the main packages like `express`, `body-parser`.
>

**Instructions:**

Install `pm2` package globally and create a `npm link` to it in this project.

Notice that `npm start` script will now run `pm2 start ./pm2.config.js` and 
I made a choice to still use `nodemon` for development, so I created a new npm script `dev` for it. 

- All PM2 settings are in the `pm2.config.js` file
- All scripts needed for daily-basis tasks are included in the `package.json` scripts section.

> I'm using the main settings needed for a ready-to-production app.
>

#### Health Check and Graceful Shutdown - *v3.3.0*

- Health Checks - To signalize to your Load Balancers that an instance is fine and there is no need to restarts 
by checking whatever you want eg. your Db connections.

- Graceful Shutdown - To have a chance to dispose of all your unmanaged resources by Node.js before your app 
is killed eg. Db connections. 


#### Final Notes

We're still using `console.log` for logging, but how it's a blocking code, we need to change it to a 
non-blocking library like `Winston` with some kind of correlation requests strategy, 
besides `Winston` has great capabilities to integrate with others APM solutions through the idea of `transports`, 
and `transformations` operations we may ended up redoing some work when integrating our logging strategy 
with our final APM solution and Cloud Provider tools for logging.

AWS offers great solutions for logging, Azure has its own solutions too, and so on. 
Plus, in some cases, we may still need a third-party APM solution like ElasticSearch APM, Dynatrace, Datadog among others.
Therefore we need to keep all of it in mind, before either choice and configure a non-blocking library or 
even start spreading lots of `console.log` in our app.

> I won't do any application architecture decisions here, the better way to do that, is in another repository, focused 
on the architecture itself.

### Apply some resilience layer on top of database connection (maybe using some sort of circuit breaker)

There is no need for us to handle such thing, mongoose take care of it already, you may adjust some advanced options though

### Migrate the MongoDB workload to AWS, setting up a Multi AZ infrastructure to provide High Availability

To have any kind of ready-to-production database prefer to move towards a fully managed service, AWS does not offer 
a service like this for MongoDB, and the most popular way to achieve this in AWS today is through **MongoDB Atlas**.

MongoDB Atlas has a free tier, but you should not use it for production workloads at all. 
To attend a reliable and high scalable production workload at general our database infrastructure would need to have at minimum a 
Master and two Slaves hosts all in separated AZ with Multi-AZ failover enabled _(with Read Replicas sometimes)_, plus 
we'll have a significant performance improvement by hitting our database through `VPC Endpoints` (for VPC internal communication), 
instead of going over to the public internet to reach our database.

To reach the goal above in MongoDB Atlas we would need to have an `M10 Dedicated Cluster` - that offers 2 GB RAM, 10 GB of storage, 100 IOPs,  running in an isolated VPC with VPC Peering _(and VPC Endpoint)_ enabled.
The estimated price for this 3-node replica set is **57 USD per month**, despite the costs is not the focus of this project, I can't avoid some comparison with others AWS Database as a service solutions.

- **Atlas X AWS DynamoDb** - We can reach much more capacity in terms of Data Storage, Operations per second, and high scalability in DynamoDB, by a much smaller price, but I believe that MongoDB offers better ORMs options like `mongoose` that help us in terms of development effort.
> We may end up using a **Redis** cache layer to avoid hits in our database all the time, it's a very common pattern regardless of our database solution, it will incur in costs and development effort increases. In AWS DynamoDB we can use AWS DAX Accelerator that is a cache layer for DynamoDB and can improve our queries from milliseconds to microseconds without coding changes needed by the half of price of a MongoDB Atlas minimal production settings.

- **Atlas X AWS DocumentDB** - AWS DocumentDB is a MongoDB-compatible fully managed Database-as-a-service product, but the initial costs are so high, that won't worth compare it, it's a product for Big Data solutions. I'm just pointing it here because of the MongoDB compatibilities.  

- **Atlas X Amazon Aurora Serverless** - If you're willing to go with `sequelize` relational ORM, Amazon Aurora is your best option, mainly for early stages projects or MVPs that you don't know your workload yet. You'll have a fully managed and high available database with serverless pricing model, it means in short terms you'll pay for resources that are consumed while your DB is active only, not for underutilized databases hosts provisioned that needs to be up and running all the time. 
Plus, after some evolving of your solution and knowledge of your workload, you can decrease your costs by purchasing Reserved Instances.

- **Atlas X Custom MongoDB cluster** - You may build your Replica Set with minimal effort by using a `CloudFormation` template, AWS offers a good one also you can find great options at the community, including `Terraform` templates, plus you can use a MongoDB Certified by Bitnami AMI as a host instead of a fresh EC2 in these templates. Optionally you can set up an AWS Backup on your EC 2 hosts, and then you may update the `CloudFormation` templates that you've used if it is not already included.
The cons here are that you won't have a fully managed service, of course, but the cluster was configured by one. You can start by using an infrastructure-as-a-code template and later move towards a fully managed product like MongoDB Atlas, though.

> For the sake of simplicity, I'll use MongoDB Atlas free-tier at this project.


### Configure an OpenAPI Specification work environment - *v4.0.0*

A rock-solid API must start by your design, team collaboration, mocking, and approval thereafter we can start the hands-on it.
Engage the team to develop by using that approach is beneficial in so many ways and to enable it I like to use a GUI editor, my preferred is [Apicurio Studio](https://www.apicur.io/) a web-based OpenAPI editor that enables team collaboration and mock of your API.

[Apicurio - How a OpenAPI GUI can help us](public/apicurioide.jpg)
 
Now, we can check and test our API through the link `http://localhost:4000/v1/api-docs/`
