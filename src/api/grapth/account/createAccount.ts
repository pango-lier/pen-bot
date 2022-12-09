import { gql } from "@apollo/client";

export enum GroupEnum {
  GOLOGIN = "GOLOGIN",
  NONE = "NONE",
}

export const CREATE_ACCOUNT = gql`
  mutation createOneAccountDto(
    $name: String!
    $active: Boolean
    $proxyId: String
    $proxyType: String
    $groupId: ID
  ) {
    createOneAccountDto(
      input: {
        accountDto: {
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
      proxyId
      proxyType
      createdAt
      updatedAt
      expiresAt
    }
  }
`;
