import { gql } from "@apollo/client";

export const UPDATE_NEW_GROUP = gql`
  mutation updateOneGroupDto(
    $id: ID!
    $name: String!
    $secretKey: String
    $secretName: String
    $groupType: GroupEnum
    $userId: ID
  ) {
    updateOneGroupDto(
      input: {
        id: $id
        update: {
          # id: $id
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
      secretName
      secretKey
      groupType
      userId
      createdAt
    }
  }
`;
