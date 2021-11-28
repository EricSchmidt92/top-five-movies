import LoginPage from './LoginPage';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
	render(<LoginPage />);

	const emailInput = screen.getByLabelText(/email/i);
	const passwordInput = screen.getByLabelText(/password/i);
	const loginButton = screen.getByRole('button', { name: /log in/i });

	userEvent.type(emailInput, 'eric@gmail.com');
	userEvent.type(passwordInput, 'secret');

	// continue test here!
});
