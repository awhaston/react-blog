import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostSidebar from '../../../components/PostSidebar';
import { usePosts } from '../../../contexts/PostContext';
import { ResultPost } from '../../../types';
import './PostPage.css';

function PostPage() {
	const { data, loading }: any = usePosts();
	const { id }: any = useParams();
	let post: ResultPost = {
		title: '',
		header_url: '',
		body: '',
		createdAt: { nanoseconds: 0, seconds: 0 },
		tags: [],
		id: 9999999999999,
	};

	const [url, setUrl] = useState('');
	const [body, setBody] = useState('');
	const [title, setTitle] = useState('');
	const [created, setCreated] = useState('');
	const [tags, setTags] = useState('');
	const [propTags, setPropTags] = useState(['']);
	const navigator = useNavigate();

	useEffect(() => {
		const index = parseInt(id);
		let loaded = false;

		let maxIndex = -1;
		//Checking if post in parameters exist
		for (let i = 0; i < data.length; i++) {
			if (data[i].id > maxIndex) {
				maxIndex = data[i].id;
			}
			if (data[i].id === index) {
				post = data[i];
				loaded = true;
			}
		}

		//If the loading variable is not changed and the data is loaded then the id must not exist
		if (!loaded && data[0]?.title) {
			navigator('/*');
		}

		let tag = post.tags?.toString().split(',').join(', ');

		setTitle(post.title);
		setBody(post.body);
		setUrl(post.header_url);
		const t = new Date(Date.UTC(1970, 0, 1));
		t.setUTCSeconds(post.createdAt.seconds);
		setCreated(
			t.getMonth().toString() +
				'-' +
				t.getDay().toString() +
				'-' +
				t.getFullYear().toString()
		);
		setPropTags(post.tags);
		setTags(tag);
	}, [data, loading, id]);

	return (
		<main className='post-page'>
			<article className='post-page-container'>
				<h1>{title}</h1>
				<span className='index-capitalize'>Catagories: {tags}</span>
				<p>Posted on {created}</p>
				<img src={url} alt={title} className='post-page-img' />
				<MDEditor.Markdown
					source={body}
					style={{
						whiteSpace: 'pre-wrap',
						background: 'white',
						color: 'black',
					}}
				/>
			</article>
			<PostSidebar tags={propTags} />
		</main>
	);
}

export default PostPage;
