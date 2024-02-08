import mongoose, { Schema } from 'mongoose';

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfJoining: Date,
    dateOfBirth: Date,
    salary: Number,
    title: String,
    department: String,
},
    {
        // Enable transformation options for toJSON
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                // Convert dates to string format (e.g., ISO string)
                if (ret.dateOfJoining) {
                    ret.dateOfJoining = ret.dateOfJoining.toISOString();
                }
                if (ret.dateOfBirth) {
                    ret.dateOfBirth = ret.dateOfBirth.toISOString();
                }
            },
        },
    }
);

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
