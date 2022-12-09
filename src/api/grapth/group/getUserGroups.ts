import { gql } from '@apollo/client';

export const GET_USER_GROUP = gql`
	query getGroups($paging: OffsetPaging!, $filter: GroupDtoFilter, $sorting: [GroupDtoSort!]) {
		groupDtos(paging: $paging, filter: $filter, sorting: $sorting) {
			totalCount
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			nodes {
				id
                name
                secretName
                secretKey
				groupType
				userId
                createdAt
			}
		}
	}
`;