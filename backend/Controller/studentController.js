const User = require('../Models/userModel');
const asyncWrapper = require('../Middleware/async');
const Badrequest=require('../Error/BadRequest');
const Notfound=require('../Error/NotFound');


exports.getAllStudents = asyncWrapper(async (req, res) => {
  const students = await User.find({ role: 'student' });
  res.status(200).json(students);
});

exports.getStudentById = asyncWrapper(async (req, res) => {
  const student = await User.findOne({ _id: req.params.id, role: 'student' });
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }  res.status(200).json(student);
});

exports.createStudent = asyncWrapper(async (req, res) => {
  const newStudent = await User.create({ ...req.body, role: 'student' });
  res.status(201).json(newStudent);
});

exports.updateUser= asyncWrapper(async (req, res, next) => {
    const { id } = req.params;

    const updateData = { ...req.body };

   

    
    const updatedUser = await User.findByIdAndUpdate(
        id,
        updateData, 
        {
            new: true, 
            runValidators: true 
        }
    );

    if (!updatedUser) {
        return next(new Notfound(`User not found with id: ${id}`));
    }

    res.status(200).json({ 
        message: 'User updated successfully', 
        user: updatedUser 
    });
});

exports.deleteStudent = asyncWrapper(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Student deleted successfully' });
});




exports.getActiveStudents = asyncWrapper(async (req, res) => {
  const activeStudents = await User.find({ role: 'student', status: 'Active' });
  res.status(200).json(activeStudents);
});

exports.getDroppedStudents = asyncWrapper(async (req, res) => {
  const droppedStudents = await User.find({ role: 'student', status: 'Dropped' });
  res.status(200).json(droppedStudents);
});


exports.getGraduatedStudents = asyncWrapper(async (req, res) => {
  const graduatedStudents = await User.find({ role: 'student', status: 'Graduated' });
  res.status(200).json(graduatedStudents);
});
