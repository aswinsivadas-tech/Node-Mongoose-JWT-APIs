import express from 'express';
import {registerUser,getUserByIdpublic,getUsers,loginUser,} from '../controllers/authController.js';

const router = express.Router();

// ✅ POST /api/register
router.post('/register',registerUser);

// // ✅ POST /api/login
router.post('/login',loginUser);

// ✅ GET /api/users/:id
router.get('/users/:id',getUserByIdpublic);

// // ✅ GET /api/users
router.get('/users',getUsers);


export default router;



