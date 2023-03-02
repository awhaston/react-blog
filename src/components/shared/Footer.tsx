import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Footer.css';

function Footer() {
	const { currentUser, signOut }: any = useAuth();

	const signOutHandler = async () => {
		await signOut();
	};
	return (
		<div className='footer-container'>
			{!currentUser ? (
				<Link to='/login'>Login</Link>
			) : (
				<button onClick={signOutHandler}>Sign Out</button>
			)}
			<span>
				Website created by{' '}
				<a href='https://www.awhaston.dev' target='_blank'>
					Wyatt Haston
				</a>
			</span>
		</div>
	);
}

export default Footer;
