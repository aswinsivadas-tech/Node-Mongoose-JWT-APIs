import express from "express";
import authRoutes from './routes/authRoutes.js';
// import userroutes from "./routes/user.routes.js";
const app= express();
app.use(express.json());
// app.use("/api/user",userroutes);


app.use('/api', authRoutes);

export default app;
app.get("/",(req,res)=>{
    res.send("server is working");
});