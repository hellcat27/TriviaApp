## React Trivia Game

### Description:
A simple game where you answer trivia questions pulled from https://opentdb.com/api_config.php. It was built using the MERN (MongoDB, Express.js, React and Node.js) stack.

### Installation/Setup:  
1. Clone or download the repository.
2. In the backend/app.js file, on line 13 the ATLAS_URI is a connection string to a MongoDB Atlas instance. To get this to work you need to setup an Atlas db instance at https://www.mongodb.com/ or setup a local MongoDB server to connect to. The Atlas connection string you can get from the instance setup must go in a .env file in the backend. Example: ATLAS_URI=mongodb+srv://{user}:{password}@{server}.mongodb.net/test?retryWrites=true&w=majority. The application will still work without the database, but the highscore function will be broken.
3. In the backend directory run 'npm install' and 'npm start'.
4. In the frontend/app directory run 'npm install' and 'npm start'.
5. Application can be accessed on http://localhost:3000
