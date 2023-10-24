import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { useYoutubeQuery } from '../../../hooks/useYoutube';

function Visual() {
	const [Index, setIndex] = useState(0);
	const { data, isSuccess } = useYoutubeQuery();

	/*
		data:react-query가 반환하는데이터
		isError:데이터 응답 실패시 true
		isSuccess:데이터 응답 성공시 true
		isLoading: 데이터요청 pending상태일때 true
		isRefecthing: true 동일한데이터라도 다시 refetching 처리유무 (기본값 false)
	*/
	return (
		<>
			<article className='visualBox'>
				<figure>
					<img src='img/figure.jpg' alt='' />
				</figure>
				<p>Luxurious</p>
			</article>

			<section className='visual'>
				<div className='titBox'>
					<ul>
						{isSuccess &&
							data.map((tit, idx) => {
								if (idx >= 5) return null;
								return (
									<li key={idx} className={idx === Index ? 'on' : ''}>
										<h3>{tit.snippet.title}</h3>
										<p>{tit.snippet.description}</p>
										<button>
											<Link to={`/detail/${tit.id}`}>View Deatil </Link>
										</button>
									</li>
								);
							})}
					</ul>
				</div>
				<Swiper
					slidesPerView={1}
					spaceBetween={0}
					centeredSlides={true}
					loop={true}
					//swiper loop 기능을 적용하는 순간 실제 연결되어 있는 패널갯수보다 동적으로 패널이 생성되면서 일반적인 방법으로는 활성화패널의 순서값을 구할 수 없기 때문에 아래와 같은 방법으로 순서값을 구함
					onSlideChange={(el) => setIndex(el.realIndex)}
					breakpoints={{
						//1000px보다 브라우저폭이 커졌을때
						1000: {
							slidesPerView: 2,
							spaceBetween: 50,
						},
						1400: {
							slidesPerView: 3,
							spaceBetween: 50,
						},
					}}
				>
					{isSuccess &&
						data.map((vid, idx) => {
							if (idx >= 5) return null;
							return (
								<SwiperSlide key={idx}>
									<div className='pic'>
										<img src={vid.snippet.thumbnails.maxres.url} alt={vid.title} />
										<img src={vid.snippet.thumbnails.maxres.url} alt={vid.title} />
									</div>
								</SwiperSlide>
							);
						})}
				</Swiper>
			</section>
		</>
	);
}

export default Visual;
