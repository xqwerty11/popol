import './News.scss';
import { useState, useEffect, useCallback, useMemo } from 'react';

function News() {
	//useMemo는 특정 함수가 리턴해주는 값만 메모이제이션 가능하므로 dummyData에 담길 값 자체를 함수가 리턴하게 처리하고 해당 함수를 useMemo의 인수로 전달한다음에 의존성 배열을 비워놓음

	//실제로는 useRef를 통해 참조객체에 담는게 더 효율적
	const dummyData = useMemo(() => {
		return [
			{ title: 'title', content: 'Here comes content description in detail1.', data: new Date() },
			{ title: 'title', content: 'Here comes content description in detail1.', data: new Date() },
			{ title: 'title', content: 'Here comes content description in detail1.', data: new Date() },
			{ title: 'title', content: 'Here comes content description in detail1.', data: new Date() },
		];
	}, []);
	const getLocalData = useCallback(() => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummyData;
	}, []);
	const [Post, setPost] = useState(getLocalData());

	useEffect(() => {
		setPost(getLocalData());
	}, [getLocalData]);
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

			<div className='conBox'>
				<article className='imgBox2'>
					<img src='./img/conBox.jpg' alt='' />
				</article>
				<article className='txtBox'>
					<h2>Lorem, ipsum dolor.</h2>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quo corrupti velit error
						officiis quasi amet delectus eaque corporis eligendi quis quod, sed possimus tenetur id
						dolor! Distinctio maxime est esse in nostrum repellat! Blanditiis delectus, placeat
						iusto iure qui veniam commodi ipsa, deleniti assumenda facilis illo libero hic incidunt.
						<br />
						<br />
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quo corrupti velit error
						officiis quasi amet delectus eaque corporis eligendi quis quod, sed possimus tenetur id
						dolor! Distinctio maxime est esse in nostrum repellat! Blanditiis delectus, placeat
						iusto iure qui veniam commodi ipsa, deleniti assumenda facilis illo libero hic incidunt.
						<br />
						<br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quo corrupti velit
						error officiis quasi amet delectus eaque corporis eligendi quis quod, sed possimus
						tenetur id dolor! Distinctio maxime est esse in nostrum repellat! Blanditiis delectus,
						placeat iusto iure qui veniam commodi ipsa, deleniti assumenda facilis illo libero hic
						incidunt.
					</p>
				</article>
			</div>

			<div className='conBox2'>
				<article className='txtBox'>
					<h2>Lorem, ipsum dolor.</h2>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quo corrupti velit error
						officiis quasi amet delectus eaque corporis eligendi quis quod, sed possimus tenetur id
						dolor! Distinctio maxime est esse in nostrum repellat! Blanditiis delectus, placeat
						iusto iure qui veniam commodi ipsa, deleniti assumenda facilis illo libero hic incidunt.
						<br />
						<br />
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quo corrupti velit error
						officiis quasi amet delectus eaque corporis eligendi quis quod, sed possimus tenetur id
						dolor! Distinctio maxime est esse in nostrum repellat! Blanditiis delectus, placeat
						iusto iure qui veniam commodi ipsa, deleniti assumenda facilis illo libero hic incidunt.
						<br />
						<br /> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quo corrupti velit
						error officiis quasi amet delectus eaque corporis eligendi quis quod, sed possimus
						tenetur id dolor! Distinctio maxime est esse in nostrum repellat! Blanditiis delectus,
						placeat iusto iure qui veniam commodi ipsa, deleniti assumenda facilis illo libero hic
						incidunt.
					</p>
				</article>
				<article className='imgBox2'>
					<img src='./img/imgBox.jpg' alt='' />
				</article>
			</div>
		</section>
	);
}

export default News;
