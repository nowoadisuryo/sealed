# How to Configure Development Environment

1. Download this project
2. Download & Install Recomended MongoDB Community Server at https://www.mongodb.com/try/download/community
3. Download & Install Recomended NodeJS at https://nodejs.org/en/
4. Download & Install Recomended Postman at https://www.postman.com/downloads/
5. Launch terminal or command prompt in this project directory
6. In the terminal or command prompt type "mongod --config mongod.conf" (this command will launch MongoDB instance)
7. Launch new terminal or command prompt in this project and type "mongo" (this command will launch Mongo Shell)
8. In the Mongo Shell type "rs.initiate()" (this function will launch MongoDB Replica Set)
9. Launch new terminal or command prompt in this project and type "npm install" (this command will install required modules)

# How to Run Code Locally

## Answer Section 1 : Algorithms, Question 1. Data Store and Load
1. Launch new terminal or command prompt in this project and type "node algorithms_question_1" (answer will be displayed in the console)

## Answer Section 1 : Algorithms, Question 2. Finding Optimal Path
1. Launch new terminal or command prompt in this project and type "node algorithms_question_2" (answer will be displayed in the console)

## Answer Section 2 : Programming Task
1. Import Postman Collection in this project named "Sealed.postman_collection.json" to Postman
2. Launch new terminal or command prompt in this project and type "npm run dev" (this command will start NodeJS server)
3. To answer User Story 1, run Add Employees from the Postman Collection
4. To answer User Story 2, run Get Employees from the Postman Collection
5. To answer User Story 3, run Edit Employees from the Postman Collection

# Tech Stack
1. NodeJS
2. MongoDB
