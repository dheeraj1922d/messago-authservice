import express from 'express';
import dotenv from 'dotenv';
import authRouter from "../auth-backend/router/auth.route.js"
import userRouter from "../auth-backend/router/users.router.js"
import connectToMongoDB from "../auth-backend/db/connectToMongo.js"
import cors from "cors"
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors());
// Add cookie-parser middleware
app.use(cookieParser());


connectToMongoDB();
app.use(express.json()); // It parses the incoming request body, if any, and populates the req.body property with the parsed JSON data. This allows you to easily access the JSON data sent by clients in HTTP requests.



app.use('/auth', authRouter); // any requests whose path starts with /auth will be routed to the authRouter middleware for further processing
app.use('/users' , userRouter)
app.get('/', (req, res) => {
  res.send('Congratulations HHLD Folks!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});