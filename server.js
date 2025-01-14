import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import userRoutes from './Routes/userRoutes.js'
dotenv.config();
const app = express();
app.use(express.json());

ConnectDB();
const PORT= 5000  || process.env.PORT;
app.get('/',(req,res)=>{
    res.send("API is running");
});

app.use('/api/user',userRoutes);

///api/user/createuser


app.listen(PORT,console.log(`Server listening to port ${PORT}`));