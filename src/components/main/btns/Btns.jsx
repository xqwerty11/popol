import Anime from '../../../asset/anime';
import './Btns.scss';
import { useEffect, useRef } from 'react';

function Btns() {
	const refBtns = useRef(null);
	let pos = useRef([]);
	const getPos = () => {
		const secs = document.body.querySelectorAll('.myScroll');
		for (let sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};

	useEffect(() => {
		getPos();
	}, []);
	return (
		<ul className='scroll_navi' ref={refBtns}>
			<li
				className='on'
				onClick={() => {
					new Anime(window, {
						prop: 'scroll',
						value: pos.current[0],
						duration: 500,
					});
				}}
			></li>
			<li
				onClick={() => {
					new Anime(window, {
						prop: 'scroll',
						value: pos.current[1],
						duration: 500,
					});
				}}
			></li>
			<li
				onClick={() => {
					new Anime(window, {
						prop: 'scroll',
						value: pos.current[2],
						duration: 500,
					});
				}}
			></li>
		</ul>
	);
}

export default Btns;

/*
  스크롤 모션 작업 단계
  1. 컴포넌트 마운트시 각각의 버튼 클릭시 이동해야되는 세로 섹션의 위치값들을 배열로 저장하는 함수 호출
  2. 각 세로버튼 클릭시 클릭한 버튼의 순번에 맞는 배열의 위치값을 anime를 활용해서 세로 스크롤 모션 이동

*/
