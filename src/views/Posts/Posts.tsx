import { useEffect, useState } from 'react';
import { usePosts } from '../../contexts/PostContext';
import { ResultPost } from '../../types';
import PostResult from './PostResult';
import './Posts.css';

function Posts() {
	const { data } = usePosts();

	const [uniqueTags, setUniqueTags] = useState<string[]>([]);
	const [activeTags, setActiveTags] = useState<string[]>([]);
	const [activePosts, setActivePosts] = useState<ResultPost[]>([]);

	useEffect(() => {
		if (!data[0]?.title) return;

		const tags = getTags(data);
		setUniqueTags(tags);

		const activePosts: ResultPost[] = getActivePosts(data, activeTags);
		setActivePosts(activePosts);

		console.log(activeTags);
		console.log(activePosts);
	}, [data, activeTags]);

	function getActivePosts(
		data: ResultPost[],
		activeTags: string[]
	): ResultPost[] {
		let activePosts: ResultPost[] = [];

		if (activeTags.length === 0) {
			return data;
		}

		for (let i = 0; i < data.length; i++) {
			if (activeTags.every((v) => data[i].tags.includes(v))) {
				activePosts.push(data[i]);
			}
		}

		return activePosts;
	}

	function getTags(data: ResultPost[]): string[] {
		let tags: string[] = [];

		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[i].tags.length; j++) {
				if (!tags.includes(data[i].tags[j].toLowerCase()))
					tags.push(data[i].tags[j].toLowerCase());
			}
		}
		return tags;
	}

	return (
		<div className='posts-container'>
			<div className='posts-filterbar'>
				<form className='posts-form'>
					<span>Filter posts by:</span>

					{uniqueTags?.map((tag, index) => (
						<div className='posts-input' key={index}>
							<input
								type='checkbox'
								value={tag}
								onChange={(e) => {
									let value = e.target.value;
									if (e.target.checked) {
										setActiveTags((activeTags) => [...activeTags, value]);
									} else {
										setActiveTags(activeTags.filter((tags) => tags !== value));
									}
								}}
							></input>
							<label>{tag}</label>
						</div>
					))}
				</form>
			</div>
			<PostResult props={activePosts} />
		</div>
	);
}

export default Posts;
