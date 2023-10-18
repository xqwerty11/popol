import Layout from '../../common/layout/Layout';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Detail.scss';

export default function Detail() {
	const { id } = useParams();
	const [Data, setData] = useState(null);

	useEffect(() => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';

		fetch(`${baseURL}?key=${api_key}&id=${id}&part=snippet`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items[0].snippet);
				setData(json.items[0].snippet);
			});
	}, []);

	return (
		<Layout title={'PLAY'}>
			<div id='Box'>
				<div className='vidBox'>
					<iframe
						src={`https://www.youtube.com/embed/${Data?.resourceId.videoId}`}
						title='youtube'
					></iframe>
				</div>
				<div className='txtBox'>
					<h2>{Data?.title}</h2>
					<p>{Data?.description}</p>
					<span>{Data?.publishedAt.split('T')[0].split('-').join('.')}</span>
				</div>
			</div>
		</Layout>
	);
}
