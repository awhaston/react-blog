import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { PostProvider } from './contexts/PostContext';

function Layout() {
	return (
		<>
			<NavBar />
			<PostProvider>
				<Suspense fallback={<h1>Loading</h1>}>
					<Outlet />
				</Suspense>
			</PostProvider>
			<Footer />
		</>
	);
}

export default Layout;
