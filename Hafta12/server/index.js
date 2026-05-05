import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoute.js"
import cors from   "cors"

dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api", route)

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(()=>{
        console.log("DB connected succesfully.");
        app.listen(PORT, ()=>{
            console.log(`Server is running ${PORT}`);
        });
    })
    .catch((error)=>console.log(error));

