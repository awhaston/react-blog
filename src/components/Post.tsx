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
