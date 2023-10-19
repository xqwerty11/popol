import './News.scss';
import { useState, useEffect } from 'react';

function News() {
	const dummyDate = [
		{ title: 'title', content: 'Here comes content description in detail1.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detail1.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detail1.', data: new Date() },
		{ title: 'title', content: 'Here comes content description in detail1.', data: new Date() },
	];
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyDate;
	};
	const [Post, setPost] = useState(getLocalData());

	useEffect(() => {
		setPost(getLocalData());
	}, []);
	return (
		<section className='news myScroll'>
			<h2 className='release'>News release </h2>
			<div className='postWrap'>
				{Post.map((el, idx) => {
					if (idx >= 3) return null;
					else
						return (
							<article key={idx}>
								<h2>{el.title}</h2>
								<p>{el.content}</p>
							</article>
						);
				})}
			</div>
			<div className='imgBox'>
				<img src='./img/aaa.jpg' alt='' />
			</div>
		</section>
	);
}

export default News;
