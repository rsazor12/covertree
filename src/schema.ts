import { gql } from 'apollo-server';

export const typeDefs = gql`
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

input SortInput {
  field: String!
  order: String! # ASC or DESC
}

type Query {
  employees(title: String, department: String, salaryRange: [Float], sortParams: [SortInput]): [Employee]
  employee(id: ID!): Employee
}

type Mutation {
  addEmployee(firstName: String!, lastName: String!, dateOfJoining: String!, dateOfBirth: String!, salary: Float!, title: String!, department: String!): Employee
  updateEmployee(id: ID!, firstName: String, lastName: String, dateOfJoining: String, dateOfBirth: String, salary: Float, title: String, department: String): Employee
  deleteEmployee(id: ID!): String
}
`;