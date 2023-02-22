import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { ResultPost } from '../types';

interface PostContext {
	data: ResultPost[];
	loading: boolean;
}

export const PostContext = React.createContext<PostContext>({
	data: [],
	loading: true,
});

export function usePosts() {
	return useContext(PostContext);
}

export function PostProvider({ children }: any) {
	const [data, setData] = useState<ResultPost[]>([]);
	const [loading, setLoading] = useState(true);

	const value = {
		data,
		loading,
	};

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			const dataCollection = collection(db, 'posts');
			const querySnapshot = await getDocs(dataCollection);
			const posts: ResultPost[] = [];
			querySnapshot.forEach((doc) => {
				const post = doc.data() as ResultPost;
				posts.push(post);
			});
			setData(posts);
		};

		fetchData();
		setLoading(false);
	}, []);

	return (
		<PostContext.Provider value={value}>
			{!loading && children}
		</PostContext.Provider>
	);
}
