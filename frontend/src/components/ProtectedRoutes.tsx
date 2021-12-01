import { VStack } from '@chakra-ui/react';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({ auth, component: Component, ...rest }: any) => {
	return (
		<VStack align='center' w='100%'>
			<Route
				{...rest}
				render={props => {
					if (auth) return <Component {...props} />;
					if (!auth)
						return (
							<Redirect
								to={{ pathname: '/', state: { from: props.location } }}
							/>
						);
				}}
			/>
		</VStack>
	);
};

export default ProtectedRoutes;
