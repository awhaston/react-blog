import MDEditor from '@uiw/react-md-editor';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { usePosts } from '../../contexts/PostContext';
import { db, storage } from '../../firebase';
import './CreatePost.css';

function CreatePost() {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState<any>();
	const [file, setFile] = useState<any>('');
	const [message, setMessage] = useState('');
	const [percent, setPercent] = useState(0);
	const [tags, setTags] = useState<string>('');
	const [loading, setLoading] = useState(false);

	//Uploads header image before calling post
	const handleSubmit = (e: any) => {
		setLoading(true);
		e.preventDefault();
		if (!file) {
			setLoading(false);
			return setMessage('Please Enter a header image!');
		}
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
					console.log(url);
					createPost(url);
				});
			}
		);
	};

	// Uploading post to db after getting image url
	const createPost = (url: string) => {
		const { data }: any = usePosts();
		const id = data.length - 1;
		try {
			const tagArray = tags.replace(/\s/g, '').split(',');
			addDoc(collection(db, 'posts'), {
				id: id,
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
