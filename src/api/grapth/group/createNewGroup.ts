import { gql } from "@apollo/client";

export enum GroupEnum {
  GOLOGIN = "GOLOGIN",
  NONE = "NONE",
}

export const CREATE_NEW_GROUP = gql`
  mutation createOneGroupDto(
    $name: String!
    $secretKey: String
    $secretName: String
    $groupType: GroupEnum
    $userId: ID
  ) {
    createOneGroupDto(
      input: {
        groupDto: {
          name: $name
          secretKey: $secretKey
          secretName: $secretName
          groupType: $groupType
          userId: $userId
        }
      }
    ) {
      id
      name
      secretKey
      secretName
      groupType
      createdAt
      updatedAt
      userId
    }
  }
`;
