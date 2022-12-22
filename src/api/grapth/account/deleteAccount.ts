import { gql } from "@apollo/client";

export const DELETE_ACCOUNT = gql`
  mutation deleteOneAccountDto($id: ID!) {
    deleteOneAccountDto(input: { id: $id }) {
      id
    }
  }
`;
