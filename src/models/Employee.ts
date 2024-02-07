import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfJoining: Date,
    dateOfBirth: Date,
    salary: Number,
    title: String,
    department: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
