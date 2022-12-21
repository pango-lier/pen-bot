import { gql } from "@apollo/client";

export const DELETE_GROUP = gql`
  mutation deleteOneGroupDto($id: ID!) {
    deleteOneAccountDto(input: { id: $id }) {
      id
    }
  }
`;
