import Info from '../info/Info';
import News from '../news/News';
import Visual from '../visual/Visual';
import './Main.scss';

function Main() {
	return (
		<main className='mainWrap'>
			<div className='visualBox'>
				<figure>
					<img src='img/figure.jpg' alt='' />
				</figure>
				<p>Luxurious</p>
			</div>
			<Visual />
			<News />
			<Info />
		</main>
	);
}

export default Main;
