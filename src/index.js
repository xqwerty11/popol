import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import flickrReducer from './redux/flickrSlice';

//youtubeReducer반환한 데이터를 youtube property담아서 객체형태로 store에 등록
//store에는 하나의 객체만 등록가능하기 때문에 여러개의 데이터 카테고리는 reducer로 통합해서 등록
const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		flickr: flickrReducer,
	},
});

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	redux (redux-saga, redux-toolkit)
	- context api를 활용한 전역 state관리 라이브러리
	- redux로 전역관리를 해야 되는 이유
	--- 여러 컴포넌트에 자주써야되는 데이터값을 매번 컴포넌트에 호출하는 것이 초기에 불러온 데이터를 한번 전역 공간에 저장
	-- 장점1. 위와 같이 자주쓰는 값들을 전역 state에 저장해놓으면 저장되어 있는 값을 불러오기만 하면 되기 때문에 유지보수가 편해짐
	-- 장점2. 특정데이터를 특정 컴포넌트에 종속시켜놓으면 해당 데이터를 수정해야 될때 일일이 해당 파일을 찾아서 수정해야되는 번거로움, 전역데이터 관리는 컴포넌트 외부에서 독립적으로 데이터를 관리할 수 있기 때문에 유지보수가 수월함
	-- 장점3. 리액트는 단방향 데이터 바인딩이기 때문에 하위 뎁스의 컴포넌트 데이터를 상위 컴포넌트나 또다른 컴포넌트에 전달하기 위해서는 엄청나게 많은 중간단계 컴포넌트 거쳐야되기 때문에 개발구조가 상당히 복잡해짐. 하지만 전역 상태관리를 활용하면 바로 해당 데이터에 접근해서 수정가능


*/
