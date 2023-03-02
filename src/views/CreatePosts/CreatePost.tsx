import MDEditor from '@uiw/react-md-editor';
import {
	addDoc,
	collection,
	doc,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { usePosts } from '../../contexts/PostContext';
import { db, storage } from '../../firebase';
import { ResultPost } from '../../types';
import './CreatePost.css';

function CreatePost() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState<any>();
	const [file, setFile] = useState<any>('');
	const [message, setMessage] = useState('');
	const [percent, setPercent] = useState(0);
	const [tags, setTags] = useState<string>('');
	const [loading, setLoading] = useState(false);
	let isUpdating = false;
	let { id }: any = useParams();
	id = parseInt(id);
	const { data } = usePosts();

	useEffect(() => {
		if (id && data[0]?.title) {
			const post = data.find((post) => post.id === id);
			setTitle(post!.title);
			setBody(post!.body);
			setTags(post!.tags.toString());
			isUpdating = true;
		}
		console.log(isUpdating);
		console.log(data);
	}, [data, id]);

	//Uploads header image before calling post
	const handleSubmit = (e: any) => {
		setLoading(true);
		e.preventDefault();
		// if (isUpdating) {
		// 	return updatePost(id);
		// }
		if (!file && !isUpdating) {
			setLoading(false);
			return setMessage('Please Enter a header image!');
		} else {
			uploadImage();
		}
	};

	// async function updatePost(id: number) {
	// 	const docRef = doc(db, 'posts', 'id');
	// 	const tagArray = tags.replace(/\s/g, '').split(',');

	// 	const updatedPost = {
	// 		body: body,
	// 		tags: tagArray,
	// 		title: title,
	// 	};

	// 	await updateDoc(docRef, updatedPost).then((res) => {
	// 		console.log(res);
	// 	});
	// }

	function uploadImage() {
		const storageRef = ref(storage, `/images/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const percent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setPercent(percent);
			},
			(err) => console.log(err),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					createPost(url);
				});
			}
		);
	}

	// Uploading post to db after getting image url
	const createPost = async (url: string) => {
		const uid = uuidv4();
		try {
			const tagArray = tags.replace(/\s/g, '').split(',');
			const docRef: any = doc(db, 'posts');
			await addDoc(docRef, {
				id: uid,
				title: title,
				createdAt: Timestamp.now(),
				tags: tagArray,
				header_url: url,
				body: body,
			});
		} catch (err) {
			setLoading(false);
			console.log(err);
			return setMessage('Error making post');
		}
		setLoading(false);
		setMessage('Post completed');
	};

	//TODO: Type Events
	const handleImage = (e: any) => {
		setFile(e.target.files[0]);
	};

	return (
		<form>
			{message}
			{percent > 0 ? <p>Uploading Percent Completed: {percent}%</p> : ''}
			<h5>Create a New Post!</h5>
			<label>
				Header Image:
				<input type='file' accept='image/*' onChange={handleImage} />
			</label>

			<label>
				Title for new post:
				<input
					type='text'
					value={title}
					onChange={(e: any) => {
						if (!e.target.value) {
							return;
						}
						setTitle(e.target.value);
					}}
				/>
			</label>
			<label>
				Set Tags (separated by ,):
				<input
					type='text'
					value={tags}
					onChange={(e: any) => {
						setTags(e.target.value);
					}}
				/>
			</label>
			<MDEditor value={body} onChange={setBody} height={550} />

			<button onClick={handleSubmit} disabled={loading}>
				Submit
			</button>
		</form>
	);
}

export default CreatePost;
