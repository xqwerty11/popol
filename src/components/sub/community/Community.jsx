import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useRef, useState, useEffect } from 'react';

export default function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const refEditInput = useRef(null);
	const refEditTextarea = useRef(null);

	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);
	console.log(Posts);
	const resetForm = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};
	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		//기존 Posts 배열값을 Deep copy해서 가져온뒤, 그 뒤에 추가로 방금 입력한 객체를 배열에 추가
		setPosts([
			{
				title: refInput.current.value,
				content: refTextarea.current.value,
				data: new Date(),
			},
			...Posts,
		]);
		resetForm();
	};
	const deletePost = (delIndex) => {
		if (window.confirm('정말 해당 게시글을 삭제하겠습니까?')) {
			//기존 Posts배열을 반복 돌면서 인수로 전달된 삭제 순번값과 현재 반복되는 배열의 순번값이 같지 않은 것만 리턴
			setPosts(Posts.filter((_, idx) => delIndex !== idx));
		}
	};

	const enableUpdate = (editIndex) => {
		//수정모드 함수 호출시 Allowed가 true가 아니면 return으로 함수 강제 종료
		if (!Allowed) return;
		//일단 수정모드에 진입하면 강제로 Allowed값을 false로 변경해서 다른 글 수정모드 진입금지 처리
		setAllowed(false);
		setPosts(
			//Posts 배열값을 반복돌면서 인수로 전달된 수정할 포스트의 순번값과 현재 반복도는 배열의 포스트 순번값이 일치하면
			//해당 글을 수정처리해야되므로 해당 객체에 enableUpdate=true값을 추가
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (editIndex) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = false;
				return post;
			})
		);
	};

	const updatePost = (updateIndex) => {
		//setPosts로 기존 Post배열같은 덮어쓰기해서 변경
		//리액트에서는 참조형 자료는 무조건 배열값을 Deep copy한뒤 변경
		setPosts(
			Posts.map((post, idx) => {
				if (updateIndex === idx) {
					post.title = refEditInput.current.value;
					post.content = refEditTextarea.current.value;
				}
				return post;
			})
		);
	};
	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='conBox'>
				<h2> Lorem, ipsum dolor sit amet consectetur.</h2>
			</div>

			<div className='inputBox'>
				<article>
					<h2>input</h2>
					<p>Lorem, ipsum dolor.</p>
				</article>
				<input ref={refInput} type='text' placeholder='제목을 입력하세요.' />
				<br />
				<textarea ref={refTextarea} cols='30' rows='3' placeholder='본문을 입력하세요.'></textarea>
				<nav className='btnSet'>
					<button onClick={resetForm}>cancel</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<section className='bigBox'>
				<div className='showBox'>
					{Posts.map((post, idx) => {
						const string = JSON.stringify(post.data);

						const [year, month, date] = string.split('T')[0].split('"')[1].split('-');

						let [hour, min, sec] = string.split('T')[1].split('.')[0].split(':');
						hour = parseInt(hour) + 9;
						hour >= 24 && (hour = hour - 24);
						if (post.enableUpdate) {
							return (
								<article key={idx}>
									<div className='txt'>
										<input type='text' defaultValue={post.title} ref={refEditInput} />
										<br />
										<textarea defaultValue={post.content} ref={refEditTextarea} />
									</div>
									<nav className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>Cancel</button>
										<button
											onClick={() => {
												updatePost(idx);
												disableUpdate(idx);
											}}
										>
											Update
										</button>
									</nav>
								</article>
							);
						} else {
							return (
								<article key={idx}>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
										<div className='txtto'>
											<span>{`글 작성일 : ${year}-${month}-${date}`}</span>
											<span>{`글 작성시간 : ${hour}:${min}:${sec}`}</span>
										</div>
									</div>

									<nav className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						}
					})}
				</div>
				<div className='smallBox'>
					<h2>notice board</h2>
				</div>
			</section>
		</Layout>
	);
}
