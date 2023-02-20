import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import NotFound from './views/NotFound';
import PostPage from './views/Posts/PostPage/PostPage';
import Posts from './views/Posts/Posts';
import Protected from './views/Protected';

const CreatePost = lazy(() => import('./views/CreatePosts/CreatePost'));

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='posts' element={<Posts />}></Route>
					<Route path='post'>
						<Route path=':id' element={<PostPage />} />
					</Route>
					<Route path='login' element={<Login />} />
					<Route
						path='createpost'
						element={
							<Protected>
								<CreatePost />
							</Protected>
						}
					/>
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
