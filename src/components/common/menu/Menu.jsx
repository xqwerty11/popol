import './Menu.scss';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalData } from '../../../hooks/useGlobalContext';
import { useEffect } from 'react';
function Menu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	useEffect(() => {
		//브라우저가 1000px이상 폭이 될때 setMeunuOpen(false) 로 메뉴를 닫는 핸들러 함수 정의
		const closeMenu = () => {
			const wid = window.innerWidth;
			if (wid >= 1000) setMenuOpen(false);
		};

		//윈도우 전역 객체에 resize 이벤트 핸들러 연결
		window.addEventListener('resize', closeMenu);
		//해당 컴포넌트 언마운트시 이벤트 핸들러 제거
		return () => window.removeEventListener('resize', closeMenu);
	}, [setMenuOpen]);
	return (
		<AnimatePresence>
			{MenuOpen && (
				<motion.aside
					className='menu'
					initial={{ x: '--100%' }}
					animate={{ x: '0%' }}
					exit={{ x: '-100%' }}
					transition={{ duration: 0.5 }}
					onClick={() => setMenuOpen(false)}
				>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>

					<ul>
						<li>
							<NavLink to='/department' activeClassName='active'>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeClassName='active'>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeClassName='active'>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeClassName='active'>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeClassName='active'>
								Members
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeClassName='active'>
								Contact
							</NavLink>
						</li>
					</ul>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}

export default Menu;
