import Modal from '../../common/modal/Modal';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import { fetchFlickr } from '../../../redux/flickrSlice';
import { open } from '../../../redux/modalSlice';
import { useFlickrQuery } from '../../../hooks/useflickr';
import { useDispatch } from 'react-redux';

export default function Gallery() {
	const dispatch = useDispatch();
	const [IsUser, setIsUser] = useState(true);
	const [ActiveURL, setActiveURL] = useState('');
	const refInput = useRef(null);
	const refBtnSet = useRef(null);
	const my_id = '199282981@N03';
	const [Opt, setOpt] = useState({ type: 'user', id: my_id });
	const { data: Pics, isSuccess } = useFlickrQuery(Opt);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsUser(false);

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));

		if (refInput.current.value.trim() === '') {
			return alert('검색어를 입력하세요.');
		}

		setOpt(fetchFlickr({ type: 'search', tags: refInput.current.value }));
		refInput.current.value = '';
	};

	const handleClickMyGallery = (e) => {
		setIsUser(true);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));

		e.target.classList.add('on');

		setOpt({ type: 'user', id: my_id });
	};

	const handleClickInterest = (e) => {
		setIsUser(false);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		setOpt({ type: 'interest' });
	};

	const handleClickProfile = (e) => {
		if (IsUser) return;

		setOpt({ type: 'user', id: e.target.innerText });
		setIsUser(true);
	};

	return (
		<>
			<Layout title={'Gallery'}>
				<div className='conBox'>
					<article className='txtBox'>
						<h2>
							Welcome to <br />
							The Art And History
							<br /> Museum Ozeum
						</h2>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. <br /> Optio ullam velit
							minima? Eligendi officia ipsumrem, <br /> voluptatum cum tempore id eum cupiditate
							facilis sed. <br /> repellendus illo natus aperiam
						</p>
						<p></p>
					</article>

					<article className='imgBox'>
						<img src='img/img1.jpg' alt='' />
					</article>
				</div>

				<section className='topBox'>
					<div className='searchBox'>
						<form onSubmit={handleSubmit}>
							<input ref={refInput} type='text' />
							<button>SEARCH</button>
						</form>
					</div>

					<div className='btnSet' ref={refBtnSet}>
						<button className='on' onClick={handleClickMyGallery}>
							My Gallery
						</button>

						<button onClick={handleClickInterest}>Interest Gallery</button>
					</div>
				</section>

				<div className='picFrame'>
					<Masonry
						elementType={'div'}
						options={{ transitionDuration: '0.5s' }}
						disableImagesLoaded={false}
						updateOnEachImageLoad={false}
					>
						{/* 해당 데이터가 어떤이유에서건 없을때 해당 객체안의 property를 호출할때 런타임 에러가 뜨는 경우이므로 배열값 자체가 없으면 렌더링을 안해서 property 오류해결 */}
						{isSuccess &&
							Pics.map((data, idx) => {
								return (
									<article key={idx}>
										<div className='inner'>
											<img
												className='pic'
												src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
												alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
												onClick={(e) => {
													setActiveURL(e.target.getAttribute('alt'));
													dispatch(open());
												}}
											/>
											<h2>{data.title}</h2>

											<div className='profile'>
												<img
													src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
													alt={data.owner}
													onError={(e) => {
														e.target.setAttribute(
															'src',
															'https://www.flickr.com/images/buddyicon.gif'
														);
													}}
												/>
												<span onClick={handleClickProfile}>{data.owner}</span>
											</div>
										</div>
									</article>
								);
							})}
					</Masonry>
				</div>
			</Layout>
			<Modal>
				<img src={ActiveURL} alt='img' />
			</Modal>
		</>
	);
}

//해당 컴포넌트에 대해 설명, 이슈사항은 ?
//메뉴 빠르게 이동시 에러가 뜨는 경우
//원인 : 특정 컴포넌트에 시간이 오래 걸리는 연산작업후 그 결과물을 state에 미처 담기도 전에 컴포넌트가 언마운트 되는 경우 (메모리 누수)
//해결 방법: 특정 state값이 true일때에만 state에 무거운 값이 담기도록 처리해주고 컴포넌트 unmount시에 해당 값을 false로 변경
//컴포넌트 언마운트 될때쯤 state에 담길 값이

/*
	Youtube컴포넌트 작업을 하면서 비동기데이터를 redux-toolkit을 이용해서 전역데이터 관리하는게 익숙해서 flickr도 시도해봤다

	이슈사항1 - flickr데이터를 가져온다음에 버튼을 클릭하거나 검색어입력등의 이벤트가 발생할때마다 실시간으로 전역 store데이터를 변경요청해야 되는게 많이 어려웠다.
	
	어려웠던 이유, : 유튜브나 구글링을해도 해당 내용이 없어서 혼자서 해결을 해야 되는 부분이 어려웠다.
	이벤트가 발생할때마다 생성된 액션객체를 계속해서 dispatch로 reducer에 데이터 변경 요청을 하도록 처리했다

	두번째 이슈 - 내 아이디 갤러리나 사용자 아이디를 클릭해서 출력하는 user 타입의 갤러리 렌더링시에는 사용자 아이디를 클릭할때마다 중복 데이터 호출이 일어나기 때문에 해당 문제점을 해결하기 위해서 user타입의 갤러리가 렌더링될때에만
	state값 변경하고 state에 따라서 사용자 아이디의 클릭 이벤트를 막음으로서 불필요한 서버 데이터 호출을 방지했다
*/
