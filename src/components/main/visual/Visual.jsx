import './Visual.scss';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';

function Visual() {
	const { data } = useSelector((store) => store.youtube);
	const [Index, setIndex] = useState(0);
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
						{data.map((tit, idx) => {
							if (idx >= 5) return null;
							return (
								<li key={idx} className={idx === Index ? 'on' : ''}>
									<h3>{tit.snippet.title}</h3>

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
					{data.map((vid, idx) => {
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
