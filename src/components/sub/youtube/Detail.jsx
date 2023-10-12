import Layout from '../../common/layout/Layout';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Detail() {
	//url로 전달될 parameter값을 비구조화할당으로 받을 수 있음
	const { id } = useParams();

	useEffect(() => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		fetch(`${baseURL}?key=${api_key}&id=${id}&part=snippat`)
			.then((data) => data.json())
			.then((json) => console.log(json));
	}, []);

	return (
		<Layout title={'Detail'}>
			<p>유튜브 상세페이지 {id}</p>
		</Layout>
	);
}
