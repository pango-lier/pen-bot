import {
	ApolloClient,
	ApolloLink,
	concat,
	createHttpLink,
	InMemoryCache,
	Observable,
	split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLError } from 'graphql';
import { setContext } from '@apollo/client/link/context';
import {
	clearStorageData,
	getStorageData,
	setStorageData,
	STORAGE_CONSTANTS,
} from '../../utility/localStorage';
import { REFRESH_TOKEN } from './Auth';

const isRefreshRequest = (operation) => {
	return operation.operationName === 'RefreshToken';
};

const returnTokenDependingOnOperation = (operation) => {
	if (isRefreshRequest(operation)) return getStorageData(STORAGE_CONSTANTS.REFRESH_TOKEN) || '';
	return getStorageData(STORAGE_CONSTANTS.ACCESS_TOKEN) || '';
};

const apolloHttpLink = createHttpLink({
	uri: process.env.REACT_APP_SERVER_URL,
});

const apolloAuthLink = setContext((operation, { headers }) => {
	const token = returnTokenDependingOnOperation(operation);

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	let observable = null;

	if (graphQLErrors) {
		graphQLErrors.forEach((error) => {
			if (error?.extensions?.code === 'UNAUTHENTICATED') {
				// ignore 401 error for a refresh request
				if (operation.operationName === 'RefreshToken') return;

				observable = new Observable((observer) => {
					(async () => {
						try {
							if (getStorageData(STORAGE_CONSTANTS.REFRESH_TOKEN)) {
								const accessToken = await refreshToken();

								if (!accessToken) {
									throw new GraphQLError('Empty AccessToken');
								}
							}
							// Retry the failed request
							const subscriber = {
								next: observer.next.bind(observer),
								error: observer.error.bind(observer),
								complete: observer.complete.bind(observer),
							};

							forward(operation).subscribe(subscriber);
						} catch (err) {
							observer.error(err);
						}
					})();
				});
			}
		});
	}

	// eslint-disable-next-line no-console
	if (networkError) console.log(`[Network error]: ${networkError}`);
	return observable;
});

const refreshToken = async () => {
	try {
		const refreshResolverResponse = await apolloClient.mutate({
			mutation: REFRESH_TOKEN,
			variables: {
				token: getStorageData(STORAGE_CONSTANTS.REFRESH_TOKEN),
			},
		});
		const accessToken = refreshResolverResponse.data?.refreshToken.accessToken;
		setStorageData(STORAGE_CONSTANTS.ACCESS_TOKEN, accessToken || '');
		return accessToken;
	} catch (err) {
		clearStorageData();
		// window.open('/', '_self');
		throw err;
	}
};

const wsLink = new GraphQLWsLink(
	createClient({
		url: process.env.REACT_APP_SERVER_SUBSCRIPTION_URL,
		shouldRetry: () => true,
		connectionParams: () => ({
			authorization: `bearer ${getStorageData(STORAGE_CONSTANTS.ACCESS_TOKEN)}`,
		}),
	}),
);
const httpLink = concat(apolloAuthLink, apolloHttpLink);
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	wsLink,
	httpLink,
);

const apolloClient = new ApolloClient({
	link: ApolloLink.from([errorLink, splitLink]),
	cache: new InMemoryCache(),
});

export default apolloClient;
