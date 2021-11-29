import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoutes = ({ auth, component: Component, ...rest }: any) => {
	return (
		<Route
			{...rest}
			render={props => {
				if (auth) return <Component {...props} />;
				if (!auth)
					return (
						<Redirect to={{ pathname: '/', state: { from: props.location } }} />
					);
			}}
		/>
	);
};

export default ProtectedRoutes;
