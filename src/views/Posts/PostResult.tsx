import Post from '../../components/Post';
import { ResultPost } from '../../types';
import './PostResult.css';

interface PropTypes {
	props: ResultPost[];
}

function PostResult({ props }: PropTypes) {
	return (
		<div className='postresult-container'>
			{props.map((post, index) => (
				<Post props={post} classes={''} key={index}></Post>
			))}
		</div>
	);
}

export default PostResult;
