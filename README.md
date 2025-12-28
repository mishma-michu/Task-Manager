Clone the Repository:-
git clone https://github.com/mishma-michu/Task-Manager.git
cd Task-Manager
Backend Setup:-
cd backend
npm install
Create a .env file in backend/ :
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=mySuperSecretKey
Start the backend server:
npm run dev
Backend will run at:
http://localhost:5000

FRONTEND SETUP
cd frontend
npm install
npm run dev
http://localhost:5173

DEFAULT FLOW
Register a new user
Login with credentials (password atleat 6 characters)
Access Dashboard
Create, edit, delete tasks
Logout when done

API DOCUMENTATION :
Base URL : http://localhost:5000/api

Authentication Endpoints: 
POST - /auth/register - Register a new user 
POST - /auth/login - Login user & get JWT token

Task Endpoints:
POST - /tasks - Create a new task
GET - Get all tasks
PUT - Update a task
DELETE - Delete a task

Authorization: Bearer <your_jwt_token>


<img width="1872" height="872" alt="image" src="https://github.com/user-attachments/assets/48623dd1-6950-4d69-bdb9-1f9d6002e26a" />
<img width="1897" height="887" alt="image" src="https://github.com/user-attachments/assets/dd7090d4-5e13-4600-9a4b-a1c56240ab50" />
<img width="1890" height="887" alt="image" src="https://github.com/user-attachments/assets/93211728-2bd1-4780-aaec-d8ff691613c9" />
<img width="1847" height="867" alt="image" src="https://github.com/user-attachments/assets/ad6da2bc-d3fa-4de0-8a34-be524dcca97a" />





