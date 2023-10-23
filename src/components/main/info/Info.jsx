import './Info.scss';
import { useFlickrQuery } from '../../../hooks/useflickr';
function Info() {
	const { data, isSuccess } = useFlickrQuery({ type: 'user', id: '199282981@N03' });
	return (
		<section className='info myScroll'>
			<h2>Welcome to The Art</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. At doloremque quasi asperiores
				reiciendis non, ratione laboriosam, iste fuga dolorum eligendi culpa dignissimos delectus,
				odit beatae? Corrupti aperiam deserunt porro ipsum.
			</p>
			<div className='wrap'>
				{isSuccess &&
					data.map((pic, idx) => {
						if (idx >= 9) return null;
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
