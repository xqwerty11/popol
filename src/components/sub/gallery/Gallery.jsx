import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';

const my_id = '199282981@N03';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const [Loader, setLoader] = useState(true);
	//대체이미지가 추가되었는지 아닌지를 확인하는 state
	//Fix(true): 대체이미지 추가됨, Fix(false): 대체이미지 적용안됨
	const [Fix, setFix] = useState(false);
	//현재 갤러리 타입이 User타입인지 확인하기 위한 state추가
	const [IsUser, setIsUser] = useState(true);

	const [ActiveURL, setActiveURL] = useState('');

	const [IsModal, setIsModal] = useState(false);

	const refInput = useRef(null);
	const refFrame = useRef(null);
	const refBtnSet = useRef(null);

	const fetchData = async (opt) => {
		setLoader(true);
		refFrame.current.classList.remove('on');

		let url = '';
		const api_key = 'bbf48601ef45cb60f5bcfdb652b8bfa4';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 100;

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
		//실제 데이터가 state에 담기는 순간 가상돔이 생성되는 순간
		setPics(json.photos.photo);

		let count = 0;
		const imgs = refFrame.current?.querySelectorAll('img');

		imgs.forEach((img, idx) => {
			img.onload = () => {
				++count;
				console.log('현재 로딩된 img갯수', count);
				//interest gallery에서 특정 사용자 갤러리 호출시 이미 interest화면에서 2개의 이미지 이미 캐싱처리 되어 있기 떄문에
				//전체 이미지 갯수에서 -2를 빼줘야지 무한로딩 오류 해결
				if (count === (Fix ? imgs.length / 2 - 1 : imgs.length - 2)) {
					console.log('모든 이미지 소스 렌더링 완료!');

					setLoader(false);
					refFrame.current.classList.add('on');
				}
			};
		});
	};

	useEffect(() => {
		fetchData({ type: 'user', id: my_id });
	}, []);

	return (
		<>
			<Layout title={'Gallery'}>
				<div className='searchBox'>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							//검색 갤러리 이벤트 발생시 IsUser값을 false로 변경
							setIsUser(false);

							//submit이벤트 발생시에도 기존 2개 버튼 on을 초기화해서 클릭가능하도록 변경
							const btns = refBtnSet.current.querySelectorAll('button');
							btns.forEach((btn) => btn.classList.remove('on'));
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
				</div>

				<div className='btnSet' ref={refBtnSet}>
					<button
						className='on'
						onClick={(e) => {
							//마이갤러리 버튼 클릭시 User type갤러리이기 때문에 IsUser값을 true로 변경
							setIsUser(true);
							if (e.target.classList.contains('on')) return;

							const btns = refBtnSet.current.querySelectorAll('button');
							btns.forEach((btn) => btn.classList.remove('on'));
							e.target.classList.add('on');

							fetchData({ type: 'user', id: my_id });
						}}
					>
						My Gallery
					</button>
					<button
						onClick={(e) => {
							//Interest Gallery는 User type 갤러리가 아니기 때문에
							//IsUser값을 false로 변경
							setIsUser(false);
							if (e.target.classList.contains('on')) return;

							const btns = refBtnSet.current.querySelectorAll('button');
							btns.forEach((btn) => btn.classList.remove('on'));
							e.target.classList.add('on');

							fetchData({ type: 'interest' });
						}}
					>
						Interest Gallery
					</button>
				</div>

				{Loader && (
					<img
						className='loading'
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
						alt='loading'
					/>
				)}
				<div className='picFrame' ref={refFrame}>
					<Masonry
						elementType={'div'}
						options={{ transitionDuration: '0.5s' }}
						disableImagesLoaded={false}
						updateOnEachImageLoad={false}
					>
						{Pics.map((data, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<img
											className='pic'
											src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
											alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
											onClick={(e) => {
												setActiveURL(e.target.getAttribute('alt'));
												setIsModal(true);
											}}
										/>
										<h2>{data.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
												alt={data.owner}
												onError={(e) => {
													//만약 프로필 이미지에서 에러가 발생하면 대체이미지를 추가
													//이때 대체이미지는 같은 이미지를 계속 호출하기 때문에 이미 캐싱처리 되어 있어서
													//다음번 렌더링 타이임에 count값에 포함이 안됨
													//따라서 대체이미지 추가 유무를 Fix라는 state에 담아서 구분
													setFix(true);
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span
												onClick={() => {
													//사용자 아이디 클릭시 현재 출력되는 갤러리가 User 타입 갤러리면 이벤트 호출 방지
													if (IsUser) return;

													//fetchData가 실행이 되면 다시 User type갤러리로 변경되므로 다시 IsUser값을 true로 변경
													fetchData({ type: 'user', id: data.owner });
													setIsUser(true);
												}}
											>
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

			{IsModal && (
				<Modal setIsModal={setIsModal}>
					<img src={ActiveURL} alt='img' />
				</Modal>
			)}
		</>
	);
}
