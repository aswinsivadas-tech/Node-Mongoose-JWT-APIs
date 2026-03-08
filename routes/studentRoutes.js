import express from "express";
import {
    addStudent,
    getStudents,
    getStudentMarks,
    updateStudent,
    deleteStudent,

} from '../controllers/studentController.js';
import {protect, admin } from '../middleware/authMiddleware.js';
import { studentUpdateValidation, studentValidation } from '../validations/studentValidation.js'; 

// import validate
import { validate } from '../middleware/validateMiddleware.js';

const router = express.Router();

// post add new student (protect + validate)

router.post('/',protect, validate(studentValidation), addStudent);

// get all students (public or protected based on your  choice)
router.get('/', protect, getStudents);

// get  marks of a specific student (protected)
router.get('/id/marks', protect,getStudentMarks);

// put => update student info (protected)
router.put('/:id', protect, validate(studentUpdateValidation),updateStudent);

// delete => delete student (admin only)
router.delete('/:id', protect, admin, deleteStudent);

export default router;
