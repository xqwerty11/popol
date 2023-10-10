import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-component';

//메서니 옵션 추가
const masonryOptions = {
	transitionDuration: 0,
};

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchData = async () => {
		const api_key = 'bbf48601ef45cb60f5bcfdb652b8bfa4';
		const method_interest = 'flickr.interestingness.getList';
		const num = 50;
		const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;

		//만약 특정함수가 promise를 반환한다면 warpping함수로 묶어준뒤 async 지정
		//각각의 promise 반환 함수 앞쪽에 await을 붙이기만 하면 해당 코드는 동기화됨
		//지저분하게 depth를 들여쓰기 해가면서 then구문을 호출할 필요가 없음
		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='picFrame'>
				{/* 반복 도는 article요소를 Masonry로 wrapping후 세팅 */}
				<Masonry
					elementType={'div'} //Manonry컴포넌트가 변환될 태그명 지정
					options={{ transitionDuration: '0.5s' }} //박스모션시 transition 시간 설정
					disableImagesLoaded={false} //true 이미지 로딩처리 안함
					updateOnEachImageLoad={false} //true 각 이미지 로딩처리 안함
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img
										className='pic'
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>

									<h2>{data.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
											alt=''
										/>
										<span>{data.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
