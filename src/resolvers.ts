// export const resolvers = {
//     Query: {
//         hello: () => 'Hello, world!',
//     },
// };

// src/resolvers.ts
import { ApolloError } from 'apollo-server-errors';
import Employee from './models/Employee';

export const resolvers = {
    Query: {
        // Query all employees with optional filters: title, department, and salary range
        employees: async (_: any, { title, department, salaryRange }: any) => {
            let filter = {};
            if (title) filter = { ...filter, title };
            if (department) filter = { ...filter, department };
            if (salaryRange && salaryRange.length === 2) {
                filter = { ...filter, salary: { $gte: salaryRange[0], $lte: salaryRange[1] } };
            }
            try {
                return await Employee.find(filter);
            } catch (error) {
                if (error instanceof Error) { // TODO - change this
                    throw new ApolloError('Failed to query employees: ' + error.message);
                }

                throw new ApolloError('Failed to query employees');
            }
        },

        // Query details of a specific employee by ID
        employee: async (_: any, { id }: any) => {
            try {
                return await Employee.findById(id);
            } catch (error) {
                if (error instanceof Error) {
                    throw new ApolloError('Failed to find employee: ' + error.message);
                }

                throw new ApolloError('Failed to find employee');
            }
        },
    },
    Mutation: {
        // Add a new employee
        addEmployee: async (_: any, employeeData: any) => {
            try {
                const newEmployee = new Employee(employeeData);
                return await newEmployee.save();
            } catch (error) {
                if (error instanceof Error) {
                    throw new ApolloError('Failed to add new employee: ' + error.message);
                }

                throw new ApolloError('Failed to add new employee');
            }
        },

        // Update details of an existing employee
        updateEmployee: async (_: any, { id, ...updateData }: any) => {
            try {
                return await Employee.findByIdAndUpdate(id, updateData, { new: true });
            } catch (error) {
                if (error instanceof Error) {
                    throw new ApolloError('Failed to update employee: ' + error.message);
                }

                throw new ApolloError('Failed to update employee');
            }
        },

        // Delete an employee
        deleteEmployee: async (_: any, { id }: any) => {
            try {
                await Employee.findByIdAndDelete(id);
                return "Employee deleted successfully";
            } catch (error) {
                if (error instanceof Error) {
                    throw new ApolloError('Failed to delete employee: ' + error.message);
                }

                throw new ApolloError('Failed to delete employee');
            }
        },
    },
};
