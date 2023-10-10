import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useEffect, useState } from 'react';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const api_key = 'bbf48601ef45cb60f5bcfdb652b8bfa4';
	const method_interest = 'flickr.interestingness.getList';
	const num = 50;
	const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;

	useEffect(() => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				setPics(json.photos.photo);
			});
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='picFrame'>
				{Pics.map((data, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<img
									src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
									alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
								/>

								<h2>{data.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
