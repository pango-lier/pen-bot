import { gql } from '@apollo/client';

export const CREATE_NEW_GROUP = gql`
	mutaion getUsers($paging: OffsetPaging!, $filter: GroupDtoFilter, $sorting: [GroupDtoSort!]) {
		groupDtos(paging: $paging, filter: $filter, sorting: $sorting) {
			totalCount
			pageInfo {
				hasNextPage
				hasPreviousPage
			}
			nodes {
				id
                name
                secrectName
                secrectKey
				groupType
                createdAt
			}
		}
	}
`;