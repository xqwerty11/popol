import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';
import { useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import { fetchFlickr } from '../../../redux/flickrSlice';

export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector((store) => store.flickr.data);
	const [IsUser, setIsUser] = useState(true);
	const [ActiveURL, setActiveURL] = useState('');
	const [IsModal, setIsModal] = useState(false);

	const refInput = useRef(null);
	const refBtnSet = useRef(null);

	const my_id = '199282981@N03';

	//처음 마운트 데이터 호출 함수

	//submit이벤트 발생시 실행할 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsUser(false);

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));

		if (refInput.current.value.trim() === '') {
			return alert('검색어를 입력하세요.');
		}

		dispatch(fetchFlickr({ type: 'search', tags: refInput.current.value }));
		refInput.current.value = '';
	};

	//myGallery 클릭 이벤트 발생시 실행할 함수
	const handleClickMyGallery = (e) => {
		setIsUser(true);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));

		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'user', id: my_id }));
	};

	//Interest Gallery 클릭 이벤트 발생시 실행할 함수
	const handleClickInterest = (e) => {
		setIsUser(false);
		if (e.target.classList.contains('on')) return;

		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'interest' }));
	};

	//profile 아이디 클릭시 실행할 함수
	const handleClickProfile = (e) => {
		if (IsUser) return;

		dispatch(fetchFlickr({ type: 'user', id: e.target.innerText }));
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

			{IsModal && (
				<Modal setIsModal={setIsModal}>
					<img src={ActiveURL} alt='img' />
				</Modal>
			)}
		</>
	);
}

/*
	클릭한 버튼을 또 클릭했을때 같은 데이터를 불필요하게 또다시 fetching요청하지 않도록
	클릭한 버튼에 on이 붙어있을때 함수 호출을 강제중지

	현재 출력되는 갤러리 방식이 User type 갤러리일때 같은 사용자의 갤러리가 보이는 형태이므로
	사용자 아이디를 클릭하게되면 같은 데이터 요청을 보내게됨
	--- 사용자 타입의 갤러리를 호출할때마다 isUser state값을 true로 변경해서 
	--- 이벤트가 발생할때마다 IsUser값이 true 사용자 아이디 클릭 이벤트 핸들러 제거
*/
