//1.해당 페이지를 어떤식으로 작업했고 어떤 이슈가 있었는지 설명

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

// 답변 - 정적인 데이터라서 굳이 fecth를 통해서 데이터를 가져오지 않고 static하게 컨텐츠를 집어넣을까 고민도 했지만 데이터기반으로 모든 화면단이 동적으로 생성되게 하고 싶어서 fetch를 통해서 데이터가 변경되더라도 자동으로 화면이 갱신되도록 작업을 했다.
