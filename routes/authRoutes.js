import express from 'express';
import {registerUser,getUsers} from '../controllers/authController.js';

const router = express.Router();

// ✅ POST /api/register
router.post('/register',registerUser);

// // ✅ POST /api/login
// router.post('/login',validate(loginValidation),loginUser);

// // ✅ GET /api/users/:id
// router.get('/users/:id',Protect,getUserByIdPublic);

// // ✅ GET /api/users
router.get('/users',getUsers);


export default router;



