import Layout from '../../common/layout/Layout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Youtube.scss';

export default function Youtube() {
	const Youtube = useSelector((store) => store.youtube.data);
	return (
		<>
			<Layout title={'PLAYLIST'}>
				<div className='lorem'>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet enim nisi dolorem
						praesentium tempora illo, consequuntur inventore tenetur, a saepe quo sapiente vitae
						fuga ipsa veniam cumque, iste sit quaerat.
					</p>
				</div>

				{Youtube.map((data, idx) => {
					let tit = data.snippet.title;
					let desc = data.snippet.description;
					let date = data.snippet.publishedAt;
					return (
						<article key={idx}>
							<div className='Youtubebox'>
								{/* 제목 */}
								<h2>{tit.length > 60 ? tit.substr(0, 60) + '...' : tit}</h2>
								{/* 내용 */}
								<p>{desc.length > 120 ? desc.substr(0, 120) + '...' : desc}</p>
								{/* 날짜 */}
								<span>{date.split('T')[0].split('-').join('.')}</span>
							</div>

							{/* 썸네일 */}
							<div className='pic'>
								{/* 썸네일 링크 클릭시 특정유튜브 객체 하나의 정보값을 받기 위해서 유튜브 객체의 id값을 params로 전달 */}
								<Link to={`/detail/${data.id}`}>
									<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
								</Link>
							</div>
						</article>
					);
				})}
			</Layout>
		</>
	);
}
