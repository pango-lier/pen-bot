import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation updateOneUserDto(
    $id: ID!
    $email: String!
    $password: String!
    $name: String
    $username: String
  ) {
    updateOneUserDto(
      input: {
        id: $id
        UpdateUserInput: {
          email: $email
          password: $password
          name: $name
          username: $username
        }
      }
    ) {
      email
      username
      name
      password
    }
  }
`;
