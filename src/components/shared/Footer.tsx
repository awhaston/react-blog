import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Footer.module.css';

function Footer() {
	const { currentUser, signOut }: any = useAuth();

	const signOutHandler = async () => {
		await signOut();
	};
	return (
		<>
			{!currentUser ? (
				<Link to='/login'>Login</Link>
			) : (
				<button onClick={signOutHandler}>Sign Out</button>
			)}
		</>
	);
}

export default Footer;
