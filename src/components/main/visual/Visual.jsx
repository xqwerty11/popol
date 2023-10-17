import './Visual.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Visual() {
	const { data } = useSelector((store) => store.youtube);
	return (
		<section className='visual'>
			{data.map((vid, idx) => {
				if (idx >= 5) return null;
				let tit = vid.snippet.title;
				let desc = vid.snippet.description;
				let date = vid.snippet.publishedAt;
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
							<Link to={`/detail/${vid.id}`}>
								<img src={vid.snippet.thumbnails.standard.url} alt={vid.title} />
							</Link>
						</div>
					</article>
				);
			})}
		</section>
	);
}

export default Visual;
