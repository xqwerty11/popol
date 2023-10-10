import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';

const my_id = '199282981@N03';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const fetchData = async (opt) => {
		let url = '';
		const api_key = 'bbf48601ef45cb60f5bcfdb652b8bfa4';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 50;

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}

		const data = await fetch(url);
		const json = await data.json();
		if (json.photos.photo.length === 0) {
			return alert('해당 검색어의 결과값이 없습니다');
		}
		setPics(json.photos.photo);
	};
	const refInput = useRef(null);

	useEffect(() => {
		fetchData({ type: 'user', id: my_id });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<form
				onSubmit={(e) => {
					e.preventDefault();

					if (refInput.current.value.trim() === '') {
						return alert('검색어를 입력하세요.');
					}

					fetchData({ type: 'search', tags: refInput.current.value });
					refInput.current.value = '';
				}}
			>
				<input ref={refInput} type='text' placeholder='검색어를 입력하세요' />
				<button>검색</button>
			</form>
			<button onClick={() => fetchData({ type: 'user', id: my_id })}>My Gallery</button>
			<button onClick={() => fetchData({ type: 'interest' })}>Interest Gallery</button>
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
											//만약 사용자가 프로필 이미지를 올리지 않았을때 엑박이 뜨므로
											//onError이벤트를 연결해서 대체이미지 출력
											onError={(e) => {
												e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
											}}
										/>
										<span onClick={() => fetchData({ type: 'user', id: data.owner })}>
											{data.owner}
										</span>
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
