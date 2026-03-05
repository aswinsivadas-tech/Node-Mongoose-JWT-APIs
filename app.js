import express from "express";
// import userroutes from "./routes/user.routes.js";
const app= express();
app.use(express.json());
// app.use("/api/user",userroutes);

export default app;
app.get("/",(req,res)=>{
    res.send("server is working");
});