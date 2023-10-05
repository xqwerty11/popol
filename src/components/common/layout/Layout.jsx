import './Layout.scss';

export default function Layout({ title, children }) {
	return (
		<section>
			<figure></figure>

			<div>
				<h1>{title}</h1>
				{children}
			</div>
		</section>
	);
}
