import './Info.scss';
import { useSelector } from 'react-redux';
function Info() {
	const { data } = useSelector((store) => store.flickr);
	return (
		<section className='info'>
			<div className='wrap'>
				{data.map((pic, idx) => {
					if (idx >= 6) return null;
					return (
						<article key={idx}>
							<img
								src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
								alt={pic.title}
							/>
						</article>
					);
				})}
			</div>
		</section>
	);
}

export default Info;
