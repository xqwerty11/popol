import Anime from '../../../asset/anime';
import './Btns.scss';
import { useEffect, useRef } from 'react';

function Btns() {
	//ul요소를 담을 참조객체 생성
	const refBtns = useRef(null);
	//세로위치값이 배열로 담길 참조객체 생성
	let pos = useRef([]);
	//컴포넌트 마운트시 myScroll클래스의 모든 섹션의 세로위치값을 배열에 저장하는 함수
	const getPos = () => {
		pos.current = [];
		const secs = document.body.querySelectorAll('.myScroll');
		for (let sec of secs) pos.current.push(sec.offsetTop);
	};

	//브라우저 스크롤시 버튼을 반복돌면서 스크롤리 특정 섹션영역을 넘어가면 해당 순번에 버튼 활성화 함수
	const activation = () => {
		const btns = refBtns.current.querySelectorAll('li');
		const scroll = window.scrollY;

		pos.current.forEach((el, idx) => {
			if (scroll >= el) {
				for (let btn of btns) btn.classList.remove('on');
				btns[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('scroll', activation);
			window.removeEventListener('resize', getPos);
		};
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
