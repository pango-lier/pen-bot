import { gql } from "@apollo/client";

export const DELETE_GROUP = gql`
  mutation deleteOneGroupDto($id: ID!) {
    deleteOneGroupDto(input: { id: $id }) {
      id
    }
  }
`;
