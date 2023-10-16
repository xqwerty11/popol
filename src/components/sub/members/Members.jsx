import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState } from 'react';

export default function Members() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};

	const [Val, setVal] = useState(initVal);

	const handleChange = (e) => {
		const { name, value } = e.target;
		//현재 onChange이벤트가 발생하고있는 form요소의 name값을 객체안에서 변수로 가져오고 value값도 가져온뒤 기존의 state값을 deep copy한뒤 내가 입력하고 있는 input의 property값만 덮어쓰기
		setVal({ ...Val, [name]: value });
	};

	//인수값으로 state를 전달받아서 각 데이터별로 인증처리후
	//만약 인증에러가 발생하면 해당 name값으로 에러문구를 생성해서 반환하는 함수
	const check = (value) => {
		const num = /[0-9]/; //0~9까지의 모든 값을 정규표현식으로 범위지정
		const txt = /[a-zA-Z]/; // 대소문자 구분없이 모든 문자 범위지정
		const spc = /[~!@#$%^&*()_]/; //모든 특수문자 지정
		const errs = {};
		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요';
		}
		//비밀번호 인증 (5글자 이상 , 문자,숫자 특수문자 모두 포함)
		if (
			value.pwd1.length < 5 ||
			!num.test(value.pwd1) ||
			!txt.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자이상,문자,숫자,특수문자를 모두 포함하세요';
		}

		if (value.pwd1 !== value.pwd2) {
			errs.pwd2 = '2개의 비밀번호를 같게 입력하세요';
		}

		if (!value.email || !/@/.test(value.email)) {
			errs.email = '이메을은 무조건 @를 포함해야 합니다';
		} else {
			const [forwrad, backward] = value.email.split('@');
			if (!forwrad || !backward) {
				errs.email = '이메일에 @앞뒤로 문자값이 있어야합니다';
			} else {
				const [forwrad, backward] = value.email.split('.');
				if (!forwrad || !backward) {
					errs.email = '이메일 . 앞뒤로 문자값이 있어야합니다';
				}
			}
		}
		return errs;
	};

	//전송이벤트 발생시 state에 있는 인풋값들을 check함수에 전달해서 호출
	//만약 check함수가 에러객체를 하나도 내보내지 않으면 인증성공
	//하나라도 에러객체가 전달되면 인증실패처리하면서 name값과 매칭이 되는 input요소 아래쪽에 에러메세지 출력
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(check(Val));
	};
	return (
		<Layout title={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border='1'>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>userid</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										//onChange가 발생할때마다 실시간으로 변경되고 있는 state의 value값을 출력
										value={Val.userid}
										onChange={handleChange}
									/>
								</td>
							</tr>
							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd1'
										name='pwd1'
										value={Val.pwd1}
										onChange={handleChange}
									/>
								</td>
							</tr>
							{/* re password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>re-password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd2'
										name='pwd2'
										value={Val.pwd2}
										onChange={handleChange}
									/>
								</td>
							</tr>

							<tr>
								<th scope='row'>
									<label htmlFor='email'>email</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										value={Val.email}
										onChange={handleChange}
									/>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' />
									<input type='submit' value='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
