import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/Post';
import { usePosts } from '../../contexts/PostContext';
import { ResultPost } from '../../types';
import './Home.css';

function Home() {
	const { data } = usePosts();

	const [mainPost, setMainPost] = useState<ResultPost>({
		title: '',
		header_url: '',
		body: '',
		createdAt: { nanoseconds: 0, seconds: 0 },
		tags: [],
		id: 99,
	});
	const [postOne, setPostOne] = useState<ResultPost>({
		title: '',
		header_url: '',
		body: '',
		createdAt: { nanoseconds: 0, seconds: 0 },
		tags: [],
		id: 99,
	});
	const [postTwo, setPostTwo] = useState<ResultPost>({
		title: '',
		header_url: '',
		body: '',
		createdAt: { nanoseconds: 0, seconds: 0 },
		tags: [],
		id: 99,
	});
	const [postThree, setPostThree] = useState<ResultPost>({
		title: '',
		header_url: '',
		body: '',
		createdAt: { nanoseconds: 0, seconds: 0 },
		tags: [],
		id: 99,
	});

	useEffect(() => {
		if (data[0]?.title) {
			let recent = data.length - 1;
			setMainPost({
				...mainPost,
				title: data[recent]?.title,
				header_url: data[recent]?.header_url,
				body: data[recent]?.body.slice(0, 400) + '...',
				createdAt: data[recent]?.createdAt,
				id: data[recent]?.id,
			});

			setPostOne({
				...postOne,
				title:
					data[recent - 1]?.title.length > 100
						? data[recent - 1]?.title.slice(0, 100) + '...'
						: data[recent - 1]?.title,
				header_url: data[recent - 1]?.header_url,
				createdAt: data[recent - 1]?.createdAt,
				id: data[recent - 1]?.id,
			});
			setPostTwo({
				...postTwo,
				title:
					data[recent - 2]?.title.length > 100
						? data[recent - 2]?.title.slice(0, 100) + '...'
						: data[recent - 2]?.title,
				header_url: data[recent - 2]?.header_url,
				createdAt: data[recent - 2]?.createdAt,
				id: data[recent - 2]?.id,
			});
			setPostThree({
				...postThree,
				title:
					data[recent - 3]?.title.length > 100
						? data[recent - 3]?.title.slice(0, 100) + '...'
						: data[recent - 3]?.title,
				header_url: data[recent - 3]?.header_url,
				createdAt: data[recent - 3]?.createdAt,
				id: data[recent - 3]?.id,
			});
		}
	}, [data]);

	return (
		<div className='home-container'>
			<div className='home-main'>
				<div className='home-header'>
					<img
						src={mainPost.header_url}
						alt={mainPost.title}
						className='home-img'
					/>
					<h1>{mainPost.title}</h1>
				</div>

				<div className='home-body'>
					<p>{mainPost.body}</p>
					<Link to={`/post/${mainPost.id}`}>Read More...</Link>
				</div>
			</div>
			<h2 className='home-post-header'>More Posts...</h2>

			<div className='home-post-container'>
				<Post props={postOne} classes='home-post' />
				<Post props={postTwo} classes='home-post' />
				<Post props={postThree} classes='home-post' />
			</div>
		</div>
	);
}

export default Home;
