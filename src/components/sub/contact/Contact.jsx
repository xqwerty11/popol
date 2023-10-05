import Layout from '../../common/layout/Layout';
import './Contact.scss';
import { useRef, useEffect } from 'react';

export default function Contact() {
	const map = useRef(null);
	const instance = useRef(null);

	const { kakao } = window;
	//첫번째 지도를 출력하기 위한 객체정보
	const info = {
		latlng: new kakao.maps.LatLng(37.58478163978524, 126.88566424098676),
		imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
	};
	//위의 정보값을 활용한 마커 객체 생성
	const marker = new kakao.maps.Marker({
		position: info.latlng,
		image: new kakao.maps.MarkerImage(info.imgSrc, info.imgSize, info.imgPos),
	});

	useEffect(() => {
		//객체 정보를 활용한 지도 객체 생성
		instance.current = new kakao.maps.Map(map.current, {
			center: info.latlng,
			level: 1,
		});
		//마커 객체에 지도 객체 연결
		marker.setMap(instance.current);
	}, []);

	return (
		<Layout title={'Contact'}>
			<button onClick={() => instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>
				주변 교통정보 보기
			</button>
			<button onClick={() => instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>
				주변 교통정보 끄기
			</button>
			<div className='map' ref={map}></div>
		</Layout>
	);
}
