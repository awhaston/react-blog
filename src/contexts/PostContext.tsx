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
			const dataCollection = collection(db, 'posts');
			const querySnapshot = await getDocs(dataCollection);
			const newData = querySnapshot.docs.map((doc) => doc.data());
			setData(newData);
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
