import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePosts } from '../../../contexts/PostContext';

function PostPage() {
	const { data, loading }: any = usePosts();
	const { id }: any = useParams();

	const [url, setUrl] = useState('');
	const [body, setBody] = useState('');
	const [title, setTitle] = useState('');
	const [created, setCreated] = useState('');

	useEffect(() => {
		if (!loading) {
			const index = parseInt(id);
			setTitle(data[index]?.title);
		}
	}, [data]);

	return <h1>{title}</h1>;
}

export default PostPage;
