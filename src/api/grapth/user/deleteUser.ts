import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation deleteOneUserDto($id: ID!) {
    deleteOneUserDto(input: { id: $id }) {
      id
    }
  }
`;
