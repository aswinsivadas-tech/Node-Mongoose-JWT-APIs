import express from 'express';
import {registerUser,getUserByIdpublic,getUsers,} from '../controllers/authController.js';

const router = express.Router();

// ✅ POST /api/register
router.post('/register',registerUser);

// // ✅ POST /api/login
// router.post('/login',validate(loginValidation),loginUser);

// ✅ GET /api/users/:id
router.get('/users/:id',getUserByIdpublic);

// // ✅ GET /api/users
router.get('/users',getUsers);


export default router;



