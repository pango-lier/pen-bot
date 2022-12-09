import { gql } from "@apollo/client";

export const GET_ACCOUNTS = gql`
  query getAccounts(
    $paging: OffsetPaging!
    $filter: AccountDtoFilter
    $sorting: [AccountDtoSort!]
  ) {
    accountDtos(paging: $paging, filter: $filter, sorting: $sorting) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      nodes {
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
  }
`;
