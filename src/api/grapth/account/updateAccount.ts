import { gql } from "@apollo/client";

export const UPDATE_ACCOUNT = gql`
  mutation updateOneAccountDto(
    $id: ID!
    $name: String!
    $active: Boolean
    $proxyId: String
    $proxyType: String
    $groupId: ID
  ) {
    updateOneAccountDto(
      input: {
        id: $id
        UpdateAccountDto: {
          name: $name
          active: $active
          proxyId: $proxyId
          proxyType: $proxyType
          groupId: $groupId
        }
      }
    ) {
      id
      name
      active
      name
      proxyId
      proxyType
      createdAt
      updatedAt
      expiresAt
    }
  }
`;
