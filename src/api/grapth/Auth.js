import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(input: { email: $email, password: $password }) {
			userData {
				id
				name
			}
			accessToken
			refreshToken
		}
	}
`;

export const REFRESH_TOKEN = gql`
	mutation RefreshToken($token: String!) {
		refreshToken(input: { refreshToken: $token }) {
			userData {
				id
				name
			}
			accessToken
			refreshToken
		}
	}
`;

export const LOGOUT = gql`
	query Logout {
		logout {
			id
			omzId
			name
			email
			active
			createdAt
			updatedAt
		}
	}
`;

export const GET_CURRENT_USER = gql`
	query Info {
		me {
			id
			omzId
			name
			email
			active
			createdAt
			updatedAt
		}
	}
`;

const Auth = {
	LOGIN,
	REFRESH_TOKEN,
	LOGOUT,
	GET_CURRENT_USER,
};
export default Auth;
