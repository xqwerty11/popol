import Layout from '../../common/layout/Layout';
import { useParams } from 'react-router-dom';

export default function Detail() {
	//url로 전달될 parameter값을 비구조화할당으로 받을 수 있음
	const { id } = useParams();
	return (
		<Layout title={'Detail'}>
			<p>유튜브 상세페이지 {id}</p>
		</Layout>
	);
}
