import { useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';

export default function Community() {
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요');
		}

		//기존 Posts 배열값을 Deep copy해서 가져온뒤, 그 뒤에 추가로 방금 입력한 객체를 추가로 방금 입력한 객체를 배열에 추가
		setPosts([{ title: refInput.current.value, content: refTextarea.current.value }, ...Posts]);
		resetForm();
	};

	const deletePost = (delIndex) => {
		//기존 Posts배열에 반복 돌면서 인수로 전달된 삭제 순법값과 현재 반복되는 배열의 순법값이 같지 않은 것만 리턴
		setPosts(Posts.filter((_, idx) => delIndex !== idx));
	};

	//해당 글을 수정모드로 변경시키는 함수
	const enableUpdate = (editIndex) => {
		setPosts(
			//Posts 배열값을 반복돌면서 인수로 전달된 수정할 포스트의 순번값과 현재 반복도는 배열의 포스트 순번값이 일치하면
			//해당 글을 수정처리해야되므로 해당 객체에 enableUpdate=true값을 추가
			Posts.map((post, idx) => {
				if (editIndex === idx) {
					post.enableUpdate = true;
				}
				return post;
			})
		);
	};

	return (
		<Layout title={'Community'}>
			<div className='inputBox'>
				<input ref={refInput} type='text' placeholder='제목을 입력하세요' />
				<br />
				<textarea ref={refTextarea} cols='30' rows='3' placeholder='본문을 입력하세요'></textarea>

				<nav className='btnSet'>
					<button onClick={resetForm}>cancle</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					if (post.enableUpdate) {
						//수정모드 렌더링
						return (
							<article key={idx}>
								<div className='txt'>
									<input
										type='text'
										value={post.title}
										onChange={(e) => {
											console.log(e.target.value);
										}}
									/>
									<br />
									<textarea
										//react에서 value속성을 적용하려면 무조건 onChange이벤트 연결 필수
										//onChange이벤트 연결하지 않을때에는 value가닌 defaultValue속성 적용
										value={post.content}
										onChange={(e) => {
											console.log(e.target.value);
										}}
									></textarea>
								</div>
								<nav className='btnSet'>
									<button>Cancel</button>
									<button>Update</button>
								</nav>
							</article>
						);
					} else {
						//출력모드 렌더링
						return (
							<article key={idx}>
								<div className='txt'>
									<h2>{post.title}</h2>
									<p>{post.content}</p>
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
		</Layout>
	);
}

/*
Create : 게시글 저장
Read : 게시글 보기
Updata : 게시글 수정
Delete : 게시글 삭제

localStirage : 모든 브라우저가 가지고 있는 경량의 저장소
*/
