import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect } from 'react';

export default function Contact() {
	const map = useRef(null);
	//현재 kakao 객체를 cdn으로 가져오고 있기 떄문에
	//리액트 컴포넌트안쪽에서 window객체로부터 kakao객체를 비구조화할당을 이용해서 수동으로 꺼내옴
	const { kakao } = window;
	const mapOption = {
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};
	useEffect(() => {
		new kakao.maps.Map(map.current, mapOption);
	}, []);
	return (
		<Layout title={'Contact'}>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
