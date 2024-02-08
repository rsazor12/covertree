import { ApolloError } from 'apollo-server-errors';
import Employee from './models/Employee';

export const resolvers = {
    Query: {
        employees: async (_: any, { title, department, salaryRange, sortParams }: any) => {
            let filter = {};
            if (title) filter = { ...filter, title };
            if (department) filter = { ...filter, department };
            if (salaryRange && salaryRange.length === 2) {
                filter = { ...filter, salary: { $gte: salaryRange[0], $lte: salaryRange[1] } };
            }

            let sortOptions = {};
            if (sortParams) {
                sortParams.forEach((param: { field: string | number; order: string; }) => {
                    let order = param.order.toLowerCase() === 'asc' ? 1 : -1;
                    sortOptions = { ...sortOptions, ...{ [param.field]: order } };
                });
            }
            try {
                return (await Employee.find(filter).sort(sortOptions));
            } catch (error) {
                throw new ApolloError('Failed to query employees ' + error);
            }
        },

        // Query details of a specific employee by ID
        employee: async (_: any, { id }: any) => {
            try {
                return await Employee.findById(id);
            } catch (error) {
                throw new ApolloError('Failed to find employee ' + error);
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
                throw new ApolloError('Failed to add new employee ' + error);
            }
        },

        // Update details of an existing employee
        updateEmployee: async (_: any, { id, ...updateData }: any) => {
            try {
                return await Employee.findByIdAndUpdate(id, updateData, { new: true });
            } catch (error) {
                throw new ApolloError('Failed to update employee ' + error);
            }
        },

        // Delete an employee
        deleteEmployee: async (_: any, { id }: any) => {
            try {
                await Employee.findByIdAndDelete(id);
                return "Employee deleted successfully";
            } catch (error) {
                throw new ApolloError('Failed to delete employee ' + error);
            }
        },
    },
};
