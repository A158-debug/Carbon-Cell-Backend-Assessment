## Carbon Cell Backend Assessment

- Task 1: Implement User Authentication with JWT
- Task 2: Create API Endpoints for Data Retrieval
- Task 3: Implement Swagger Documentation
- Task 4: Secure API Endpoint for Authenticated Users Only
- Task 5: Retrieve Ethereum Account Balance with web3.js (Optional)


<img width="900" alt="image" src="https://github.com/A158-debug/Carbon-Cell-Backend-Assessment/assets/76657113/14f7915e-0535-4eb5-ba40-53d2dc8ce892">

## Steps to setup locally :

First set up env variables

Make .env file in root directory
```
PORT=8080   
JWT_SECRET_KEY=""
MONGODB_DATABASE_URL=""
```
For MongoDB url either you can use MongoDB cloud or mongoDB image from docker.
- If you want to use docker. I have already created a docker-compose.yml file just run it by using command.
-  ```docker-compose up```
-  set mongoDB URL ```mongodb://localhost:27017/test```

To run server
```
npm install
npm start
```
