import Layout from '../../common/layout/Layout';
import emailjs from '@emailjs/browser';
import './Contact.scss';
import { useRef, useEffect, useState } from 'react';

export default function Contact() {
	const map = useRef(null);
	const view = useRef(null);
	const instance = useRef(null);
	const form = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);
	const [IsMap, setIsMap] = useState(true);

	const { kakao } = window;

	const info = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	const marker = new kakao.maps.Marker({
		position: info.current[Index].latlng,
		image: new kakao.maps.MarkerImage(
			info.current[Index].imgSrc,
			info.current[Index].imgSize,
			info.current[Index].imgPos
		),
	});

	const setCenter = () => {
		instance.current.setCenter(info.current[Index].latlng);
	};

	useEffect(() => {
		map.current.innerHTML = '';

		instance.current = new kakao.maps.Map(map.current, {
			center: info.current[Index].latlng,
			level: 1,
		});

		marker.setMap(instance.current);

		const mapTypeControl = new kakao.maps.MapTypeControl();
		instance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMLEFT);

		window.addEventListener('resize', setCenter);

		new kakao.maps.RoadviewClient().getNearestPanoId(info.current[Index].latlng, 50, (panoId) => {
			new kakao.maps.Roadview(view.current).setPanoId(panoId, info.current[Index].latlng);
		});

		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		Traffic
			? instance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: instance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	const resetForm = () => {
		const nameForm = form.current.querySelector('.nameEl');
		const mailForm = form.current.querySelector('.emailEl');
		const msgForm = form.current.querySelector('.msgEl');
		nameForm.value = '';
		mailForm.value = '';
		msgForm.value = '';
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const nameForm = form.current.querySelector('.nameEl');
		const mailForm = form.current.querySelector('.emailEl');
		const msgForm = form.current.querySelector('.msgEl');

		if (!nameForm.value || !mailForm.value || !msgForm.value)
			return alert('사용자이름,이메일주소,문의내용은 필수 입력사항입니다');

		emailjs
			.sendForm(
				`${process.env.REACT_APP_SERVICE_ID}`,
				`${process.env.REACT_APP_TEMPLATE_ID}`,
				form.current,
				`${process.env.REACT_APP_PUBLIC_KEY}`
			)
			.then(
				(result) => {
					alert('문의내용이 메일로 발송되었습니다.');
					console.log(result);
					resetForm();
				},
				(error) => {
					alert('문의내용 전송에 실패했습니다.');
					console.log(error);
					resetForm();
				}
			);
	};

	return (
		<Layout title={'Contact'}>
			<div className='conBox'>
				<h2>Lorem, ipsum.</h2>
				<p>lorem</p>
				<span>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, quasi reprehenderit.
					Sapiente non mollitia aut nisi, sit ducimus. In placeat, eos porro omnis corrupti quam
					molestias odio consequuntur doloremque, natus quod quis accusamus dicta dignissimos quae
					ullam, beatae sit. Maiores vero nulla quibusdam placeat dicta, eum enim consequatur
					soluta, id velit praesentium illo odit rem suscipit veritatis laborum sunt? Eos dolor
					omnis id rem et provident reiciendis ab voluptas aliquid maxime similique libero magnam
					quo veniam ipsum ex, inventore dignissimos harum quam asperiores eligendi. Neque optio
					aspernatur delectus vero error eius consectetur nam voluptas ad nihil itaque, veniam quis
					aliquam.
				</span>
			</div>

			<div className='sun'></div>

			<div id='mapBox'>
				<article id='Box'>
					<section className='butBox'>
						<button onClick={() => setTraffic(!Traffic)}>
							{Traffic ? '교통정보 끄기' : '교통정보 키기'}
						</button>

						<button onClick={setCenter}>지도 위치 초기화</button>

						<button onClick={() => setIsMap(!IsMap)}> {IsMap ? '로드뷰보기' : '지도보기'}</button>
					</section>

					<ul>
						{info.current.map((el, idx) => (
							<li
								className={Index === idx ? 'on' : ''}
								key={idx}
								onClick={() => {
									setIndex(idx);
									setIsMap(true);
								}}
							>
								{el.title}
							</li>
						))}
					</ul>
				</article>

				<div className='container'>
					<div className={`view ${IsMap ? '' : 'on'}`} ref={view}></div>
					<div className={`map ${IsMap ? 'on' : ''}`} ref={map}></div>
				</div>
			</div>

			<div id='mailbox'>
				<form ref={form} onSubmit={sendEmail}>
					<div className='texBox'>
						<h2>SUBSCRIBE TO NEWSLETTER</h2>
					</div>

					<div className='upper'>
						<label>Name</label>
						<input type='text' name='user_name' className='nameEl' />

						<label>Email</label>
						<input type='email' name='user_email' className='emailEl' />
					</div>

					<div className='lower'>
						<label>Message</label>
						<textarea name='message' className='msgEl' />
					</div>

					<div className='btnSet'>
						<input type='reset' value='Cancel' />
						<input type='submit' value='Send' />
					</div>
				</form>
			</div>
		</Layout>
	);
}

/*
	해당 페이지의 이슈사항은 
	- kakao map api가 리액트버전의 사용구문이 없었기 일반 cdn방식으로 불러온 api를 리액트에 맞게 변환하는 작업이 힘들었다.
	- cdn으로 받아서 kakao생성자함수를 컴포넌트 안쪽에서 불러와지지 않는 문제가 있어서 window객체로부터 직접 비구조화할당으로 뽑아와서 활용했다.

	kakao생성자를 통해서 만들어진 지도 인스턴스값을 state에 담아서 각각의 이벤트에 연결했다.
	작업을 하다보니 아무래도 리액트로 작업하는 프로젝트는 지점이 많은 대형프로젝트일것 같아서 지점 버튼 클릭시 다른 지도를 출력하도록 구현했는데 너무 코드가 지저분해져서 지도 정보값을 배열형태로 묶어서 추후 배열데이터가 변경이되면
	데이터 기반으로 자동으로 새로운 지도 인스턴스 생성과 이벤트 연결까지 한번에 처리되도록 자동화시키는데 중점을 뒀다

	이슈사항 - 브라우저가 리사이즈시 마커가 가운데 가지 않아서 브라우저 리사이즈 이벤트 발생할때마다 마커가 가운데 위치하는 함수를 재호출했다.

	- window객체에 이벤트 연결하다보니 리사이즈 이벤트가 발생할 필요가 없는 다른 컴포넌트에서도 핸들러함수가 호출되는 문제점이 있어서 컴포넌트 언마운트시 윈도우객체에 이벤트핸들러 제거 
*/
