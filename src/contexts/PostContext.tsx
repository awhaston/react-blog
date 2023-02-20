import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';

export const PostContext = React.createContext({});

export function usePosts() {
	return useContext(PostContext);
}

export function PostProvider({ children }: any) {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	const value = {
		data,
		loading,
	};

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			const postsCollection = collection(db, 'posts');
			const postSnapshot = await getDocs(postsCollection);
			const postList = postSnapshot.docs.map((doc) => doc.data());
			return postList;
		};

		fetchData().then((res) => {
			setData(res);
		});
		setLoading(false);
	}, []);

	return (
		<PostContext.Provider value={value}>
			{!loading && children}
		</PostContext.Provider>
	);
}
