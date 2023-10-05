import './Modal.scss';

function Modal({ children, setIsModal }) {
	return (
		<aside className='modal'>
			<div className='con'>{children}</div>
			<span onClick={() => setIsModal(false)}>close</span>
		</aside>
	);
}

export default Modal;
