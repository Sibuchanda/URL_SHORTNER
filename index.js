import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import urlRoute from './routes/url.js';
import connectMongoDB from './connectMongoDB/connection.js';
import URL from './model/url.js';
import staticRoute from './routes/staticRouter.js';

dotenv.config(); // Loading environment variables from .env file

const app = express();
const PORT = 8001;
const mongoDBURI = process.env.MONGODB_URI;

//connection to MongoDB
connectMongoDB(mongoDBURI)
.then(()=> console.log("MongoDB connected successfull..."))
.catch((err)=> console.log("Error occurs while connecting MongoDB : ", err));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Routes
app.use("/url", urlRoute);
app.use("/",staticRoute); // Home page


app.listen(PORT, ()=>{
    console.log(`Server started at port number ${PORT}`);
})