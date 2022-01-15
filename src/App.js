import React, { useState, useEffect } from 'react';
import "./App.css"
import axios from 'axios';
import Pagination from './components/page/Pagination';

function App() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [filteredPost, setFilteredPost] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					'https://jsonplaceholder.typicode.com/posts'
				);
				setLoading(false);
				setPosts(response.data);
				setFilteredPost(response.data);
			} catch (err) {
				setLoading(false);
				console.log(err);
				throw new Error('something went wrong');
			}
		};

		fetchPosts();
	}, []);

	const searchPost = e => {
		setCurrentPage(1);
		setFilteredPost(() =>
			posts.filter(post => post.title.indexOf(e.target.value) > -1)
		);
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<div className='header'>
				<div style={{ marginLeft: '1rem' }}>
					<h1>Posts</h1>
				</div>
				<div className='wrap'>
					<div className='search'>
						<input
							type='text'
							className='searchTerm'
							placeholder='What are you looking for?'
							onChange={searchPost}
						/>
						<button type='submit' className='searchButton'>
							<i className='fa fa-search'></i>
						</button>
					</div>
				</div>
			</div>

			<>
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					data={filteredPost}
					title='Posts'
				/>
			</>
		</>
	);
}

export default App;
