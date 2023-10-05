import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect } from 'react';

export default function Contact() {
	const map = useRef(null);
	//현재 kakao 객체를 cdn으로 가져오고 있기 떄문에
	//리액트 컴포넌트안쪽에서 window객체로부터 kakao객체를 비구조화할당을 이용해서 수동으로 꺼내옴
	const { kakao } = window;

	const mapOption = {
		center: new kakao.maps.LatLng(37.58478611732263, 126.88563592971315), // 지도의 중심좌표
		level: 1, // 지도의 확대 레벨
	};

	const imageSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imageSize = new kakao.maps.Size(232, 99);
	const imageOption = { offset: new kakao.maps.Point(116, 99) };
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	//마커 위치 인스턴스를 인수로 전달해서 마커 출력 인스턴스 객체를 생성
	const marker = new kakao.maps.Marker({
		position: mapOption.center,
		image: markerImage,
	});

	useEffect(() => {
		//컴포넌트 마운트 되자마자 지도인스턴스 생성
		const instance = new kakao.maps.Map(map.current, mapOption);
		//마커 출력 인스턴스에 지도 인스턴스 결합
		marker.setMap(instance);
	}, []);

	return (
		<Layout title={'Contact'}>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
