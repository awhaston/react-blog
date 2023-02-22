import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResultPost } from '../types';
import './Post.css';

//TODO: Get types to work
function Post({ props, classes }: any) {
	const [url, setUrl] = useState('');

	useEffect(() => {
		setUrl('/post/' + props.id);
	});

	return (
		<Link to={url}>
			<div className={`post-container ${classes}`}>
				<img
					src={props.header_url}
					alt={props.title}
					className='posts-images'
				/>
				<p>{props.title}</p>
			</div>
		</Link>
	);
}

export default Post;
