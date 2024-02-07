import { gql } from 'apollo-server';

export const typeDefs = gql`
#   type Query {
#     hello: String
#   }
type Employee {
  id: ID!
  firstName: String!
  lastName: String!
  dateOfJoining: String!
  dateOfBirth: String!
  salary: Float!
  title: String!
  department: String!
}

type Query {
  employees(title: String, department: String, salaryRange: [Float]): [Employee]
  employee(id: ID!): Employee
}

type Mutation {
  addEmployee(firstName: String!, lastName: String!, dateOfJoining: String!, dateOfBirth: String!, salary: Float!, title: String!, department: String!): Employee
  updateEmployee(id: ID!, firstName: String, lastName: String, dateOfJoining: String, dateOfBirth: String, salary: Float, title: String, department: String): Employee
  deleteEmployee(id: ID!): String
}
`;