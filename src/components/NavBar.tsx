import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './NavBar.css';

function NavBar() {
	const { currentUser, signOut }: any = useAuth();

	return (
		<div className="n-bar">
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/posts">Posts</Link>
				</li>
				{currentUser && (
					<li>
						<Link to="/createpost">Create Posts</Link>
					</li>
				)}
			</ul>
		</div>
	);
}

export default NavBar;
