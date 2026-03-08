import Student from '../models/Student.js';

export const addStudent = async (req, res, next) => {
  try {
    const { name, marks, class: studentClass } = req.body;

    // Validation (optional, extra safety)
    if (!name || marks == null || !studentClass) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const student = await Student.create({
      name,
      marks,
      class: studentClass,
    });

    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

// Get all students
export const getStudents = async (req, res, next) => {
  try {
    // Build query object
    const query = {};
    if (req.query.class) {
      query.class = req.query.class; // filter by class if query param exists
    }

    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    next(err);
  }
};


// Get marks of a specific student
export const getStudentMarks = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if valid MongoDB ObjectId (optional but helpful)
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Send only the needed fields
    res.status(200).json({
      name: student.name,
      marks: student.marks
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Update student info
export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find and update student
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true, // return updated document
      runValidators: true, // ensure validation (e.g., marks <= 100)
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent); // return the full student document
  } catch (err) {
    next(err);
  }
};


// Delete student (admin only)
export const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
};
