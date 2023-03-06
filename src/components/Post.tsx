import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResultPost } from '../types';
import './Post.css';

interface Props {
	props: ResultPost;
	classes: string;
}

function Post({ props, classes }: Props) {
	const [url, setUrl] = useState('');

	useEffect(() => {
		setUrl('/post/' + props.id);
	});

	return (
		<div className={`post-container ${classes}`}>
			<img
				src={props.header_url}
				alt={props.title}
				loading='lazy'
				className='post-images'
			/>
			<div className='post-text-container'>
				<span className='post-text-title'>{props.title}</span>
				<p>{props.body.slice(0, 400)}...</p>
				<Link to={url}>Read More...</Link>
			</div>
		</div>
	);
}

export default Post;
