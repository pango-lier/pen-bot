import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createOneUserDto(
    $email: String!
    $password: String!
    $name: String
    $username: String
  ) {
    createOneUserDto(
      input: {
        userDto: {
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
