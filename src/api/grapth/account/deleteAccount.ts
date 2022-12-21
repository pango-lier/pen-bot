import { gql } from "@apollo/client";

export const DELETE_ACCOUNT = gql`
  mutation deleteOneAccountDto(
    $id: ID!
  ) {
    DeleteOneAccountDtoInput(
      id:$id
    ) {
      id
  }
`;
