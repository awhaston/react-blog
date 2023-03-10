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
		if (!data[0]?.title) return;

		setMainPost({
			...mainPost,
			title: data[0]?.title,
			header_url: data[0]?.header_url,
			body: data[0]?.body.slice(0, 400) + '...',
			createdAt: data[0]?.createdAt,
			id: data[0]?.id,
		});

		setPostOne({
			...postOne,
			title: data[0 + 1]?.title,
			header_url: data[0 + 1]?.header_url,
			body: data[0 + 1]?.body,
			createdAt: data[0 + 1]?.createdAt,
			id: data[0 + 1]?.id,
		});
		setPostTwo({
			...postTwo,
			title: data[0 + 2]?.title,
			body: data[0 + 2]?.body,
			header_url: data[0 + 2]?.header_url,
			createdAt: data[0 + 2]?.createdAt,
			id: data[0 + 2]?.id,
		});
		setPostThree({
			...postThree,
			title: data[0 + 3]?.title,
			body: data[0 + 3]?.body,
			header_url: data[0 + 3]?.header_url,
			createdAt: data[0 + 3]?.createdAt,
			id: data[0 + 3]?.id,
		});
	}, [data]);

	return (
		<div className='home-container'>
			<div className='home-main'>
				<div className='home-header'>
					<h1>{mainPost.title}</h1>
					<img
						src={mainPost.header_url}
						alt={mainPost.title}
						className='home-img'
					/>
				</div>

				<div className='home-body'>
					<p>{mainPost.body}</p>
					<Link to={`/post/${mainPost.id}`}>Read More...</Link>
				</div>
			</div>
			<h2 className='home-post-header'>More Posts...</h2>

			<div className='home-post-container'>
				<Post props={postOne} classes='' />
				<Post props={postTwo} classes='' />
				<Post props={postThree} classes='' />
			</div>
		</div>
	);
}

export default Home;
