import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { ResultPost } from '../types';
import './PostSidebar.css';

type Props = {
	tags: string[];
};

function PostSidebar({ tags }: Props) {
	const [tag, setTag] = useState('');
	const [posts, setPosts] = useState<ResultPost[]>();
	const { data }: any = usePosts();
	const { id }: any = useParams();
	const parsedID = parseInt(id);

	useEffect(() => {
		let matchingPosts: ResultPost[] = [];
		let t = tags?.toString().split(',').join(' & ');
		setTag(t);

		if (data[0]?.title) {
			matchingPosts = findPosts(tags, data);
			matchingPosts = matchingPosts.filter(function (post: ResultPost) {
				return post.id !== undefined;
			});
		}

		setPosts(matchingPosts);
	}, [data, tags]);

	//TODO: Fix this ugly tag filter
	function findPosts(tags: string[], data: ResultPost[]): ResultPost[] {
		let resultArray: ResultPost[] = [];
		//loop for tags
		for (let i = 0; i < tags.length; i++) {
			//loop for data objects
			for (let j = 0; j < data.length; j++) {
				//loop for tags within data object
				for (let x = 0; x < data[j].tags.length; x++) {
					if (data[j].tags[x] === tags[i]) {
						//removing undefined objects
						if (data[j] === undefined) {
							break;
						}
						//Skipping active article
						if (data[j].id === parsedID) {
							break;
						}
						resultArray.push(data[j]);
						break;
					}
				}
			}
		}
		return resultArray;
	}

	//TODO: Use every Post but do not show if tags does not contain tags in related posts
	return (
		<div className='postsidebar-container'>
			<span>
				Related to <span className='index-capitalize'> {tag}</span>:
			</span>
			<div>
				{posts?.map((post, index) => {
					return (
						<Link to={'/post/' + post.id} key={index}>
							<div className='postsidebar-posts'>
								<img
									className='postsidebar-img'
									src={post.header_url}
									alt={post.title}
								/>
								<span>{post.title}</span>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default PostSidebar;
