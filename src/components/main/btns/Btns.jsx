import './Btns.scss';
import { useEffect, useRef } from 'react';

function Btns() {
	const refBtns = useRef(null);

	return (
		<ul className='scroll_navi' ref={refBtns}>
			<li className='on'></li>
			<li></li>
			<li></li>
		</ul>
	);
}

export default Btns;
