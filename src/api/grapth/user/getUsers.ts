import { gql } from '@apollo/client';

export const GET_USERS = gql`
	query getUsers($paging: OffsetPaging!, $filter: UserDtoFilter, $sorting: [UserDtoSort!]) {
		userDtos(paging: $paging, filter: $filter, sorting: $sorting) {
			totalCount
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			nodes {
				id
                name
                username
                email
                active
                createdAt
                rolesId
			}
		}
	}
`;