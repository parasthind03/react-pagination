import React, { useEffect } from 'react';
import './style.css';
import Post from '../post/Post';

export default function Pagination({
	data,
	RenderComponent,
	currentPage,
	setCurrentPage
}) {
	const pageLimit = 10;
	const dataLimit = 10;

	const pages = Math.round(data.length / dataLimit);

	useEffect(() => {
		window.scrollTo({
			behavior: 'smooth',
			top: 0
		});
	}, [currentPage]);

	const goToNextPage = () => {
		setCurrentPage(page => page + 1);
	};

	const goToPreviousPage = () => {
		setCurrentPage(page => page - 1);
	};

	const changePage = e => {
		const pageNumber = Number(e.target.textContent);
		setCurrentPage(pageNumber);
	};

	const getPaginatedData = () => {
		const startIndex = currentPage * dataLimit - dataLimit;
		const endIndex = startIndex + dataLimit;
		return data.slice(startIndex, endIndex);
	};

	const getPaginationGroup = () => {
		let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
		return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
	};

	return (
		<>
			<div className='dataContainer'>
				{getPaginatedData().map((d, idx) => (
					<Post key={idx} data={d} />
				))}
			</div>

			<div className='pagination'>
				<button
					onClick={goToPreviousPage}
					className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
					prev
				</button>

				{getPaginationGroup().map((item, index) => (
					<button
						key={index}
						onClick={changePage}
						className={`paginationItem ${
							currentPage === item ? 'active' : null
						}`}>
						<span>{item}</span>
					</button>
				))}

				<button
					onClick={goToNextPage}
					className={`next ${currentPage >= pages ? 'disabled' : ''}`}>
					next
				</button>
			</div>
		</>
	);
}
