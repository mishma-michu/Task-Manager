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

Frontend Setup
cd frontend
npm install
npm run dev
http://localhost:5173

Default Flow
Register a new user
Login with credentials
Access Dashboard
Create, edit, delete tasks
Logout when done
