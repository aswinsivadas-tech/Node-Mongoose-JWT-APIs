import express from "express";
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
// import userroutes from "./routes/user.routes.js";
const app= express();
app.use(express.json());
// app.use("/api/user",userroutes);

// routes
app.use('/api', authRoutes);
app.use('/api/products',productRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("server is working");
});

// 3. Export at the very end!
export default app;