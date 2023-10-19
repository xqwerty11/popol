import './Visual.scss';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Visual() {
	const { data } = useSelector((store) => store.youtube);
	return (
		<section className='visual'>
			<Swiper slidesPerView={3} spaceBetween={50} centeredSlides={true} loop={true}>
				{data.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={vid.snippet.thumbnails.maxres.url} alt={vid.title} />
								</div>
								<h2>{vid.snippet.title}</h2>
								<button>VIEW</button>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}

export default Visual;
