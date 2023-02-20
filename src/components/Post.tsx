import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

function Post({ props, classes }: any) {
	const [url, setUrl] = useState('');
	const [body, setBody] = useState('');

	useEffect(() => {
		setUrl('/posts/' + props.id);
		if (props.title !== undefined) {
			setBody(props.title);
		}
	});

	return (
		<Link to={url}>
			<div className={`post-container ${classes}`}>
				<img src={props.url} alt={props.title} className='posts-images' />
				<p>{body}</p>
			</div>
		</Link>
	);
}

export default Post;
