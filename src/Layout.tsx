import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/shared/Footer';
import NavBar from './components/shared/NavBar';
import { PostProvider } from './contexts/PostContext';

function Layout() {
	return (
		<div className='main-container'>
			<NavBar />
			<PostProvider>
				<Suspense fallback={<h1>Loading</h1>}>
					<Outlet />
				</Suspense>
			</PostProvider>
			<Footer />
		</div>
	);
}

export default Layout;
