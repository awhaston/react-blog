import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

function Login() {
	let navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login }: any = useAuth();
	const [error, setError] = useState('');

	const signIn = async (event: any) => {
		event.preventDefault();
		try {
			await login(email, password);
			navigate('/');
		} catch {
			setError('Failed to Log in');
		}
	};

	return (
		<form onSubmit={signIn}>
			<p>{error}</p>
			<label>
				Email:
				<input
					type='email'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</label>
			<label>
				Password:
				<input
					type='password'
					name='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<input type='submit' value='Submit' />
		</form>
	);
}

export default Login;
