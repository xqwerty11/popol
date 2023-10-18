import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';
const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Department, setDepartment] = useState([]);

	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.catch((err) => console.log(err))
			.then((json) => {
				setDepartment(json.members);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Layout title={'BRANIN'}>
			<div className='memberBox'>
				<div className='lorem'>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi illo consequatur impedit
						<br />
						incidunt atque quibusdam possimus quas omnis.
					</p>
				</div>

				<div className='subpageBox'>
					<h2>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim perspiciatis ipsa nemo
						amet cumque fuga deserunt, tempora, ratione reiciendis mollitia voluptas vel soluta
						eveniet.
					</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quas, accusamus eos maxime,
						quis, laudantium assumenda recusandae voluptatem tenetur laborum impedit inventore quos
						cumque? Autem incidunt rem iure ut quas consequuntur ratione, saepe dignissimos eius
						voluptates aspernatur dolores corrupti ipsa aliquid voluptas accusamus fugit eum libero
						minima a iste deserunt.
					</p>
				</div>

				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>

							<h2>{member.name}</h2>

							<p>{member.position}</p>
						</article>
					);
				})}
			</div>

			<section className='conBox'>
				<div className='subBox'>
					<div></div>

					<h2>Lorem, ipsum dolor.</h2>

					<p>
						Lorem ipsum dolor sit amet consectetur elit.
						<br /> Alias, id dolor laboriosam.
					</p>

					<span>2023-10-11</span>
				</div>

				<div className='subBox'>
					<div></div>
					<h2>Lorem, ipsum dolor.</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur elit.
						<br /> Alias, id dolor laboriosam.
					</p>
					<span>2023-10-11</span>
				</div>

				<div className='subBox'>
					<div></div>
					<h2>Lorem, ipsum dolor.</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur elit.
						<br /> Alias, id dolor laboriosam.
					</p>
					<span>2023-10-11</span>
				</div>
			</section>
		</Layout>
	);
}
