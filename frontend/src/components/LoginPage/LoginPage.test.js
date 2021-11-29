import LoginPage from './LoginPage';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

it('should have username field, password field, and login button', () => {
	render(<LoginPage />);

	const emailInput = screen.getByLabelText(/email/i);
	const passwordInput = screen.getByLabelText(/password/i);
	const loginButton = screen.getByRole('button', { name: /log in/i });
	// screen.getByRole('');

	expect(emailInput).toBeInTheDocument();
	expect(passwordInput).toBeInTheDocument();
	expect(loginButton).toBeInTheDocument();
});

it('should allow the user to submit credentials', () => {
	const submit = jest.fn();
	const history = createMemoryHistory();

	render(
		<Router history={history}>
			<LoginPage submit={submit} />
		</Router>
	);

	const emailInput = screen.getByLabelText(/email/i);
	const passwordInput = screen.getByLabelText(/password/i);
	const loginButton = screen.getByRole('button', { name: /log in/i });

	userEvent.type(emailInput, 'eric@gmail.com');
	userEvent.type(passwordInput, 'sosecure');
	userEvent.click(loginButton);

	expect(submit).toHaveBeenCalledWith({
		email: 'eric@gmail.com',
		password: 'sosecure',
	});
	expect(history.length).toBe(2);
	expect(history.location.pathname).toBe('/home');
});
