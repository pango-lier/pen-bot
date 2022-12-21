import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation deleteOneUserDto($id: ID!) {
    DeleteOneUserDtoInput(input: { id: $id }) {
      id
    }
  }
`;
