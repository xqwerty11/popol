import { useDebounce } from '../../../hooks/useDebounce';
import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useEffect, useState, useRef } from 'react';

//해당 컴포넌트에 메모리 누수 콘솔오류가 뜨는 이유 (emmory leak)
//Errs스테이트에 값이 담기는 시점이 useDebounce에 의해서 0.5초 이후인데
//Members 컴포넌트 접속하자마자 0.5초안에 다른 페이지로 넘어가면
//아직 state에 값이 담기지 않았는데 unmount된 경우리므로 뜨는 오류
//컴포넌트 unmount시 값을 Mounted값을 false로 변경해주고 해당 값이 true일때에만 state변경처리
export default function Members() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: '',
		interests: [],
		edu: '',
		comments: '',
	};
	const refCheckGroup = useRef(null);
	const refRadioGroup = useRef(null);
	const refSelGroup = useRef(null);
	const [Val, setVal] = useState(initVal);
	const [Errs, setErrs] = useState({});
	const [Mounted, setMounted] = useState(false);

	const DebouncedVal = useDebounce(Val);

	const resetForm = (e) => {
		e.preventDefault();
		setVal(initVal);

		// const checks = refCheckGroup.current.querySelectorAll('input');
		// const radios = refRadioGroup.current.querySelectorAll('input');
		// checks.forEach((input) => (input.checked = false));
		// radios.forEach((input) => (input.checked = false));

		[refCheckGroup, refRadioGroup].forEach((el) =>
			el.current.querySelectorAll('input').forEach((input) => (input.checked = false))
		);
		refSelGroup.current.value = '';
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		//현재 onChange이벤트가 발생하고있는 form요소의 name값을 객체안에서 변수로 가져오고 value값도 가져온뒤 기존의 state값을 deep copy한뒤 내가 입력하고 있는 input의 property값만 덮어쓰기
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let checkArr = [];
		const inputs = e.target.parentElement.querySelectorAll('input');
		//checkbox요소를 반복돌면서 해당 요소에 체크되어 있다면 해당 value값을 배열에 담아주고
		//배열을 state에 담아줌
		inputs.forEach((input) => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = (value) => {
		const num = /[0-9]/; //0~9까지의 모든 값을 정규표현식으로 범위지정
		const txt = /[a-zA-Z]/; // 대소문자 구분없이 모든 문자 범위지정
		const spc = /[~!@#$%^&*()_]/; //모든 특수문자 지정
		const errs = {};

		//아이디 인증
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

		//비밀번호 2차인증
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '2개의 비밀번호를 같게 입력하세요';
		}

		//이메일인증
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

		//성별인증
		if (!value.gender) {
			errs.gender = '성별은 필수 체크항목입니다.';
		}

		//관심사인증
		if (value.interests.length === 0) {
			errs.interests = '관심사를 하나이상 체크해주세요';
		}
		//학력인증
		if (!value.edu) {
			errs.edu = '학력을 선택하세요';
		}

		//남기는말 인증
		if (value.comments.length < 10) {
			errs.comments = '남기는말은 10글자 이상 입력하세요.';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (Object.keys(check(Val)).length === 0) {
			alert('인증통과');
		} else {
			setErrs(check(Val));
		}
	};

	//의존성 배열에 Debouncing이 적용된 state값을 등록해서
	//함수의 핸들러함수 호출의 빈도를 줄여줌
	//useDebounce는 state의 변경횟수 자체를 줄이는게 아니라.
	//해당 state에 따라 호출되는 함수의 빈도를 줄임
	// useEffect(() => {
	// 	const showCheck = () => {
	// 		console.log('suowcheck');
	// 		Mounted && setErrs(check(DebouncedVal));
	// 	};
	// 	//console.log('Val state값 변경에 의해서 showCheck함수 호출');
	// 	showCheck();
	// }, [DebouncedVal, Mounted]);

	// useEffect(() => {
	// 	return () => setMounted(false);
	// }, []);

	useEffect(() => {
		const showCheck = () => {
			setErrs(check(DebouncedVal));
		};
		showCheck();
	}, [DebouncedVal, Mounted]);

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return (
		<Layout title={'SayHello'}>
			<section className='conBox'>
				<h2>Lorem, ipsum dolor.</h2>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis dolorum.</p>

				<div>
					{' '}
					<img src='img/img3.jpg' alt='' />
				</div>
			</section>

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
										value={Val.userid}
										onChange={handleChange}
										placeholder='아이디를 입력하세요'
									/>
									{Errs.userid && <p>{Errs.userid}</p>}
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
										placeholder='비밀번호를 입력하세요'
									/>
									{Errs.pwd1 && <p>{Errs.pwd1}</p>}
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
										placeholder='비밀번호를 재입력하세요'
									/>
									{Errs.pwd2 && <p>{Errs.pwd2}</p>}
								</td>
							</tr>
							{/* email */}
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
										placeholder='이메일주소를 입력하세요'
									/>
									{Errs.email && <p>{Errs.email}</p>}
								</td>
							</tr>
							{/* gender */}
							<tr>
								<th>gender</th>
								<td ref={refRadioGroup}>
									<label htmlFor='female'>female</label>
									<input
										type='radio'
										name='gender'
										id='female'
										onChange={handleChange}
										defaultValue='female'
									/>

									<label htmlFor='male'>male</label>
									<input
										type='radio'
										name='gender'
										id='male'
										onChange={handleChange}
										defaultValue='male'
									/>

									{Errs.gender && <p>{Errs.gender}</p>}
								</td>
							</tr>
							{/* interests */}
							<tr>
								<th>interests</th>
								<td ref={refCheckGroup}>
									<label htmlFor='sports'>sports</label>
									<input
										type='checkbox'
										id='sports'
										name='interests'
										onChange={handleCheck}
										defaultValue='sporth'
									/>

									<label htmlFor='game'>game</label>
									<input
										type='checkbox'
										id='game'
										name='interests'
										onChange={handleCheck}
										defaultValue='game'
									/>

									<label htmlFor='music'>music</label>
									<input
										type='checkbox'
										id='music'
										name='interests'
										onChange={handleCheck}
										defaultValue='music'
									/>
									{Errs.interests && <p>{Errs.interests}</p>}
								</td>
							</tr>
							{/* education */}
							<tr>
								<th>
									<label htmlFor='edu'>Education</label>
								</th>

								<td>
									<select name='edu' id='edu' onChange={handleChange} ref={refSelGroup}>
										<option value=''>최종학력 선택하세요</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									{Errs.edu && <p>{Errs.edu}</p>}
								</td>
							</tr>

							{/* comments */}
							<tr>
								<th>
									<label htmlFor='comments'>comments</label>
								</th>
								<td>
									<textarea
										name='comments'
										id=''
										cols='30'
										rows='3'
										value={Val.comments}
										onChange={handleChange}
										placeholder='남기는 말을 입력하세요'
									></textarea>
									{Errs.comments && <p>{Errs.comments}</p>}
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='cancel' onClick={resetForm} />
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

/*
  react-hook-form을 쓰지 않고 직접 기능을 만들었냐?
  -- 라이브러리는 언제든지 연결할 수 있는건데, 아직 배우는 입장이기 때문에 부족하나마 
	어떤 인증로직이 처리되는지 직접 만들어 보고 싶었다. 

	그래서 checkbox,radio,selector,textarea같이 필수입력사항이 아닌 요소도 직접 인증구현을 해봤다.
	인증처리 하면서 제일 힘들었던 부분은 비밀번호, 이메일 인증 구현이 힘들었다

	구글링을 해보니 정규표현식의 예시코드가 많이 있었지만 아직 정규표현식을 제대로 공부한것이 아니라 
	모르는 상태에서 붙여넣기 식으로 구현하기는 싫어서
	내가 알고 있는 문자열 관련 메서드를 최대한 활용해서 구현해봤다
*/
